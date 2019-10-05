import { createStore, combineReducers } from 'redux';
import { lazyReducerEnhancer } from 'pwa-helpers';
import { banners } from './reducers/banner';

export const store = createStore(
  state => state,
  lazyReducerEnhancer(combineReducers)
);

store.addReducers({ banner: banners });