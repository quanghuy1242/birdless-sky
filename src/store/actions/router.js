export const ON_ROUTE_CHANGE = 'ON_ROUTE_CHANGE';
export const SET_HOME_POSITION = 'SET_HOME_POSITION';

export const changeRouteDetail = datail => {
  return {
    type: ON_ROUTE_CHANGE,
    payload: datail
  };
}

export const setHomePosition = scrollPosition => {
  return {
    type: SET_HOME_POSITION,
    payload: scrollPosition
  };
}