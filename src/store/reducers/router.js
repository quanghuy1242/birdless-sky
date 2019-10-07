import { ON_ROUTE_CHANGE } from '../actions/router';

const initialState = {
  activeRoute: '/',
  params: {}
};

export function router(state = initialState, action) {
  switch (action.type) {
    case ON_ROUTE_CHANGE:
      return {
        ...state,
        activeRoute: action.payload.activeRoute,
        params: action.payload.params
      };
    default:
      return state;
  }
}