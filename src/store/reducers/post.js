import { FETCH_POSTS_SUCCESS, FETCH_POSTS_PENDING } from '../actions/post';

const initialState = {
  pending: false,
  posts: [],
  lastVisible: {},
  lastCount: 0
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
        ...action.payload && {
          posts: state.posts.concat(action.payload.posts),
          lastVisible: action.payload.lastVisible,
          lastCount: action.payload.lastCount
        }
      };
    default:
      return state;
  }
}