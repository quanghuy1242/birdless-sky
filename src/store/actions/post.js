import { db } from '../../firebase';
import { additionalField } from '../../utils/post.util';

export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_PENDING = 'FETCH_POSTS_PENDING';

const fetchPostsSuccess = posts => {
  return {
    type: FETCH_POSTS_SUCCESS,
    payload: posts
  };
}

const fetchPostsPending = () => {
  return {
    type: FETCH_POSTS_SUCCESS,
  };
}

export const fetchAllPosts = () => {
  return dispatch => {
    dispatch(fetchPostsPending());
    db.collection('blogs')
      .limit(4)
      .orderBy('day', 'desc')
      .get()
      .then(dataSnapshot => {
        const posts = dataSnapshot.docs.map(doc => (
          {
            id: doc.id,
            ...doc.data(),
            ...additionalField(doc.data())
          }
        ));
        dispatch(fetchPostsSuccess(posts));
      })
  }
}