export const ON_ROUTE_CHANGE = 'ON_ROUTE_CHANGE';

export const changeActiveRoute = route => {
  return {
    type: ON_ROUTE_CHANGE,
    payload: route
  };
}