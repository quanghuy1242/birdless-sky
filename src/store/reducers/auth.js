import { ADD_USER_PENDING, ADD_USER_ERROR, ADD_USER_SUCCESS, SET_AUTH_STATE } from '../actions/auth';

const initialState = {
  isPending: false,
  error: '',
  isAuth: false 
};

export function auth(state = initialState, action) {
  switch (action.type) {
    case ADD_USER_PENDING:
      return {
        ...state,
        isPending: true
      }

    case ADD_USER_ERROR:
      return {
        ...state,
        isPending: false,
        error: action.payload
      }

    case ADD_USER_SUCCESS:
      return {
        ...state,
        isPending: false
      }
    
    case SET_AUTH_STATE:
        return {
          ...state,
          isPending: false,
          isAuth: action.payload
        }
  
    default:
      return state;
  }
}