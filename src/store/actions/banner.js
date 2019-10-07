export const FETCH_CONFIG_SUCCESS = 'SETBANNERDATA';

export const fetchConfigSuccess = config => {
  return {
    type: FETCH_CONFIG_SUCCESS,
    payload: { ...config }
  };
}