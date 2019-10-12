export const ADD_USER_PENDING = 'ADD_USER_PENDING';
export const ADD_USER_ERROR = 'ADD_USER_ERROR';
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
export const SET_AUTH_STATE = 'SET_AUTH_STATE';

export const addUserPending = () => {
  return {
    type: ADD_USER_PENDING
  };
}

export const addUserErr = error => {
  return {
    type: ADD_USER_ERROR,
    payload: error
  };
}

export const addUserSuccess = () => {
  return {
    type: ADD_USER_SUCCESS,
  };
}

export const setAuthState = state => {
  return {
    type: SET_AUTH_STATE,
    payload: state
  };
}