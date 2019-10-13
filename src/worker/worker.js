import { db, auth } from '../firebase';
import { additionalField } from '../utils/post.util';
import {
  GET_CATEGORIES,
  GET_INIT_POSTS,
  GET_CONF,
  GET_NEXT_POSTS,
  GET_POST_DETAIL,
  ADD_NEW_USER,
  SIGN_IN,
  IS_SIGN_IN,
  SIGN_OUT
} from './worker.type';

addEventListener('message', e => {
  switch (e.data.cmd) {
    case GET_CONF:
      db.collection('conf')
        .get()
        .then(dataSnapshot => {
          const rawData = dataSnapshot.docs.map(doc => doc.data())[0];
          const config = {
            name: rawData.mainTitle,
            slogan: rawData.slogan,
            image: rawData.homeImageUrl
          }
          postMessage({ cmd: e.data.cmd, config: config });
        })
      break;
    
    case GET_CATEGORIES:
      db.collection('categories')
        .orderBy('name', 'desc')
        .get()
        .then(dataSnapshot => {
          const categories = dataSnapshot.docs.map(doc => (
            { id: doc.id, ...doc.data() }
          ));
          postMessage({ cmd: e.data.cmd, categories: categories });
        })
      break;

    case GET_INIT_POSTS:
      getPosts(
        db.collection('blogs')
          .orderBy('day', 'desc')
          .limit(4),
        e.data.cmd
      );
      break;

    case GET_NEXT_POSTS:
      db.doc(`blogs/${e.data.oldLastVisible}`).get().then(lastVisibleSnapshot => {
        getPosts(
          db.collection('blogs')
            .orderBy('day', 'desc')
            .startAfter(lastVisibleSnapshot)
            .limit(4),
          e.data.cmd
        );
      });
      break;

    case GET_POST_DETAIL:
      db.doc(`blogs/${e.data.postId}`)
        .get()
        .then(docSnapshot => {
          const post = { id: docSnapshot.id, ...docSnapshot.data() };
          postMessage({ cmd: e.data.cmd, post })
        });
      break;

    case ADD_NEW_USER: {
      const { email, password, username } = e.data;
      db.collection('users').where('username', '==', username).get()
        .then(docSnapshot => {
          if (docSnapshot.docs.length) {
            postMessage({
              cmd: e.data.cmd,
              msg: 'An Error Happened',
              err: { message: 'Username does exist' }
            })
          } else {
            auth.createUserWithEmailAndPassword(email, password)
              .then(credential => {
                db.collection('users').doc(credential.user.uid).set({
                  username
                }).then(() => {
                  postMessage({ cmd: e.data.cmd, msg: 'Success!' })
                });
              })
              .catch(err => {
                postMessage({ cmd: e.data.cmd, msg: 'An Error Happened', err })
              })
          }
        })
      break;
    }

    case SIGN_IN: {
      const { email, password } = e.data;
      auth.signInWithEmailAndPassword(email, password)
        .then(credential => {
          postMessage({ cmd: e.data.cmd, msg: 'Success!', user: JSON.stringify(credential.user) });
        })
        .catch(error => {
          console.log(error);
          postMessage({ cmd: e.data.cmd, msg: 'An Error Happened', error })
        })
      break;
    }

    case IS_SIGN_IN: {
      auth.onAuthStateChanged(user => {
        if (user) {
          postMessage({ cmd: e.data.cmd, isAuth: true });
        } else {
          postMessage({ cmd: e.data.cmd, isAuth: false });
        }
      })
      break;
    }

    case SIGN_OUT: {
      auth.signOut();
      postMessage({ cmd: e.data.cmd });
      break;
    }
  
    default:
      break;
  }
});

const getPosts = (dataRef, cmd) => {
  return dataRef.get()
    .then(dataSnapshot => {
      return {
        posts: Promise.all(
          dataSnapshot.docs.map(async doc => {
            const docSnapshot = await db.doc(`categories/${doc.data().category}`).get();
            return {
              id: doc.id,
              ...doc.data(),
              ...additionalField(doc.data()),
              category: {
                id: docSnapshot.id,
                ...docSnapshot.data()
              }
            };
          })
        ),
        lastVisible: (() => {
          const lastVisible = dataSnapshot.docs[dataSnapshot.docs.length - 1];
          return lastVisible ? lastVisible.id : undefined
        })()
      };
    })
    .then(async data => {
      const posts = await data.posts;
      postMessage({ cmd, data: { posts, lastVisible: data.lastVisible, lastCount: posts.length } });
    })
}