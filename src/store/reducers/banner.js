import { FETCH_CONFIG_SUCCESS } from '../actions/banner';

const initialState = {
  name: 'Quang Huy',
  slogan: 'Quang Huy Huy',
  image: ''
};

export function banners(state = initialState, action) {
  switch (action.type) {
    case FETCH_CONFIG_SUCCESS:
      return {
        ...state,
        name: action.payload.name,
        slogan: action.payload.slogan,
        image: action.payload.image
      }
  
    default:
      return state;
  }
}