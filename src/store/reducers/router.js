import { ON_ROUTE_CHANGE, SET_HOME_POSITION } from '../actions/router';

const initialState = {
  activeRoute: '/',
  params: {},
  homePosition: 0
};

export function router(state = initialState, action) {
  switch (action.type) {
    case ON_ROUTE_CHANGE:
      return {
        ...state,
        activeRoute: action.payload.activeRoute,
        params: action.payload.params,
      };
      case SET_HOME_POSITION:
        return {
          ...state,
          homePosition: action.payload,
        };
    default:
      return state;
  }
}