import { createStore, combineReducers } from 'redux';
import { lazyReducerEnhancer } from 'pwa-helpers';
import { reducer } from './reducer';

export const store = createStore(
  reducer,
  lazyReducerEnhancer(combineReducers)
);