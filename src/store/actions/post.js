import { db } from '../../firebase';
import { additionalField } from '../../utils/post.util';

export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_PENDING = 'FETCH_POSTS_PENDING';

const fetchPostsSuccess = ({ posts, lastVisible, lastCount }) => {
  return {
    type: FETCH_POSTS_SUCCESS,
    payload: {
      posts: posts,
      lastVisible: lastVisible,
      lastCount: lastCount
    }
  };
}

const fetchPostsPending = () => {
  return {
    type: FETCH_POSTS_PENDING,
  };
}

const getData = (dataRef, dispatch) => {
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
        lastVisible: dataSnapshot.docs[dataSnapshot.docs.length - 1]
      };
    })
    .then(async data => {
      const posts = await data.posts;
      dispatch(fetchPostsSuccess({
        posts,
        lastVisible: data.lastVisible,
        lastCount: posts.length
      }));
    })
}

export const fetchInitPosts = () => {
  return dispatch => {
    dispatch(fetchPostsPending());
    getData(
      db.collection('blogs')
        .orderBy('day', 'desc')
        .limit(4),
      dispatch
    );
  }
}

export const fetchNextPosts = oldLastVisible => {
  return dispatch => {
    dispatch(fetchPostsPending());
      getData(
        db.collection('blogs')
          .orderBy('day', 'desc')
          .startAfter(oldLastVisible)
          .limit(4),
        dispatch
      );
  }
}