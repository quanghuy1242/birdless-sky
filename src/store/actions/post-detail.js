export const FETCH_POST_DETAIL_SUCCESS = 'FETCH_POST_DETAIL_SUCCESS';
export const FETCH_POST_DETAIL_PENDING = 'FETCH_POST_DETAIL_PENDING';
export const FETCH_RELATED_POST = 'FETCH_RELATED_POST';

export const fetchPostDetailSuccess = post => {
  return {
    type: FETCH_POST_DETAIL_SUCCESS,
    payload: { post }
  };
}

export const fetchPostDetailPending = () => {
  return {
    type: FETCH_POST_DETAIL_PENDING
  };
}

export const fetchRelatedPost = posts => {
  return {
    type: FETCH_RELATED_POST,
    payload: { posts }
  }
}