import { FETCH_CATEG_PENDING, FETCH_CATEG_SUCCESS } from '../actions/category';

const initialState = {
  isPending: false,
  categories: []
};

export function category(state = initialState, action) {
  switch (action.type) {
    case FETCH_CATEG_PENDING:
      return {
        ...state,
        isPending: true
      };
    case FETCH_CATEG_SUCCESS:
      return {
        ...state,
        isPending: false,
        categories: action.payload
      };
    default:
      return state;
  }
}