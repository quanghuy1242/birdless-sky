import { ON_ROUTE_CHANGE } from '../actions/router';

const initialState = {
  activeRoute: '/'
};

export function router(state = initialState, action) {
  switch (action.type) {
    case ON_ROUTE_CHANGE:
      return {
        ...state,
        activeRoute: action.payload
      };
    default:
      return state;
  }
}