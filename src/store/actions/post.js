export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_PENDING = 'FETCH_POSTS_PENDING';

export const fetchPostsSuccess = ({ posts, lastVisible, lastCount }) => {
  return {
    type: FETCH_POSTS_SUCCESS,
    payload: {
      posts: posts,
      lastVisible: lastVisible,
      lastCount: lastCount
    }
  };
}

export const fetchPostsPending = () => {
  return {
    type: FETCH_POSTS_PENDING,
  };
}