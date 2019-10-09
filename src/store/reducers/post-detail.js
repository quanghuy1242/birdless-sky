import { FETCH_POST_DETAIL_PENDING, FETCH_POST_DETAIL_SUCCESS } from '../actions/post-detail';

const initialState = {
  isPending: false
};

export function postDetail(state = initialState, action) {
  switch (action.type) {
    case FETCH_POST_DETAIL_PENDING:
      return {
        ...state,
        isPending: true
      };
    case FETCH_POST_DETAIL_SUCCESS:
      return {
        ...state,
        isPending: false,
        ...action.payload && {
          ...action.payload.post
        }
      };
    default:
      return state;
  }
}