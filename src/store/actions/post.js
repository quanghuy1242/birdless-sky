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

export const fetchInitPosts = () => {
  return dispatch => {
    dispatch(fetchPostsPending());
    db.collection('blogs')
      .orderBy('day', 'desc')
      .limit(4)
      .get()
      .then(dataSnapshot => {
        const posts = dataSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          ...additionalField(doc.data())
        }));
        const lastVisible = dataSnapshot.docs[posts.length - 1];
        dispatch(fetchPostsSuccess({ posts, lastVisible, lastCount: posts.length }));
      })
  }
}

export const fetchNextPosts = oldLastVisible => {
  return dispatch => {
    dispatch(fetchPostsPending());
    db.collection('blogs')
      .orderBy('day', 'desc')
      .startAfter(oldLastVisible)
      .limit(4)
      .get()
      .then(dataSnapshot => {
        const posts = dataSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          ...additionalField(doc.data())
        }));
        const lastVisible = dataSnapshot.docs[dataSnapshot.docs.length - 1];
        dispatch(fetchPostsSuccess({ posts, lastVisible, lastCount: posts.length }));
      })
  }
}