import { FETCH_POSTS_SUCCESS, FETCH_POSTS_PENDING } from '../actions/post';

const initialState = {
  pending: false,
  posts: []
};

export function posts(state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS_PENDING:
      return {
        ...state,
        pending: true
      };
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        pending: false,
        posts: action.payload
      };
    default:
      return state;
  }
}