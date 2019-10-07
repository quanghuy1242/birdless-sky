import { db } from './firebase';
import { additionalField } from './utils/post.util';

addEventListener('message', e => {
  switch (e.data.cmd) {
    case 'getConf':
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
    
    case 'getCategories':
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

    case 'getInitPosts':
      getData(
        db.collection('blogs')
          .orderBy('day', 'desc')
          .limit(4),
        e.data.cmd
      );
      break;

    case 'getNextPosts':
      getData(
        db.collection('blogs')
          .orderBy('day', 'desc')
          .startAfter(e.data.oldLastVisible)
          .limit(4),
        e.data.cmd
      );
      break;
  
    default:
      break;
  }
});

const getData = (dataRef, cmd) => {
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
        lastVisible: dataSnapshot.docs[dataSnapshot.docs.length - 1].id
      };
    })
    .then(async data => {
      const posts = await data.posts;
      const dataaa = {
        posts: posts,
        lastVisible: data.lastVisible,
        lastCount: posts.length
      }
      // const a = new ArrayBuffer([dataaa]);
      postMessage({ cmd, data: { posts, lastVisible: data.lastVisible, lastCount: posts.length } });
    })
}