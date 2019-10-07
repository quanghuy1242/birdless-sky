export const ON_ROUTE_CHANGE = 'ON_ROUTE_CHANGE';

export const changeRouteDetail = datail => {
  return {
    type: ON_ROUTE_CHANGE,
    payload: datail
  };
}