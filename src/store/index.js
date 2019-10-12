import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { lazyReducerEnhancer } from 'pwa-helpers';
import { banners } from './reducers/banner';
import { posts } from './reducers/post';
import { category } from './reducers/category';
import { router } from './reducers/router';
import { postDetail } from './reducers/post-detail';
import { auth } from './reducers/auth';

export const store = createStore(
  state => state,
  compose(
    lazyReducerEnhancer(combineReducers),
    applyMiddleware(thunk)
  )
);

store.addReducers({
  banner: banners,
  post: posts,
  category,
  router,
  postDetail,
  auth
});