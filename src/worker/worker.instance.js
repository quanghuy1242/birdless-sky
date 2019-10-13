import { store } from "../store";
import { fetchCategoriesPending, fetchCategoriesSuccess } from "../store/actions/category";
import { fetchConfigSuccess } from "../store/actions/banner";
import { fetchPostsPending, fetchPostsSuccess } from "../store/actions/post";
import {
  GET_CATEGORIES,
  GET_INIT_POSTS,
  GET_CONF,
  GET_NEXT_POSTS,
  GET_POST_DETAIL,
  ADD_NEW_USER,
  SIGN_IN,
  IS_SIGN_IN
} from './worker.type';
import { fetchPostDetailSuccess, fetchPostDetailPending } from "../store/actions/post-detail";
import { Router } from '@vaadin/router';
import { addUserPending, addUserErr, setAuthState } from "../store/actions/auth";

export const worker = new Worker('./worker.js', { type: 'module' });

worker.onmessage = e => {
  let data = e.data;
  switch (e.data.cmd) {
    case GET_CONF:
      store.dispatch(fetchConfigSuccess(e.data.config));
      break;

    case GET_CATEGORIES:
      store.dispatch(fetchCategoriesSuccess(e.data.categories));
      break;

    case GET_INIT_POSTS:
      data = data.data;
      store.dispatch(fetchPostsSuccess({
        posts: data.posts,
        lastVisible: data.lastVisible,
        lastCount: data.lastCount
      }));
      break;

    case GET_NEXT_POSTS:
      data = data.data;
      store.dispatch(fetchPostsSuccess({
        posts: data.posts,
        lastVisible: data.lastVisible,
        lastCount: data.lastCount
      }));
      break;

    case GET_POST_DETAIL:
      store.dispatch(fetchPostDetailSuccess(e.data.post));
      break;

    case ADD_NEW_USER: {
      if (e.data.err) {
        store.dispatch(addUserErr(e.data.err.message));
      } else {
        Router.go('/login');
      }
      break;
    }

    case SIGN_IN: {
      if (e.data.err) {
        store.dispatch(addUserErr(e.data.err.message));
      } else {
        localStorage.setItem('user', e.data.user);
        Router.go('/');
      }
      break;
    }

    case IS_SIGN_IN: {
      console.log(e.data.isAuth);
      store.dispatch(setAuthState(e.data.isAuth));
      break;
    }

    default:
      break;
  }
}

export const fetchConfig = () => {
  worker.postMessage({ cmd: GET_CONF });
}

export const fetchAllCategories = () => {
  store.dispatch(fetchCategoriesPending());
  worker.postMessage({ cmd: GET_CATEGORIES });
}

export const fetchInitPosts = () => {
  store.dispatch(fetchPostsPending());
  worker.postMessage({ cmd: GET_INIT_POSTS });
}

export const fetchNextPosts = oldLastVisible => {
  store.dispatch(fetchPostsPending());
  worker.postMessage({ cmd: GET_NEXT_POSTS, oldLastVisible });
}

export const fetchPostById = postId => {
  store.dispatch(fetchPostDetailPending());
  worker.postMessage({ cmd: GET_POST_DETAIL, postId });
}

export const addNewUser = ({ username, email, password }) => {
  store.dispatch(addUserPending());
  worker.postMessage({ cmd: ADD_NEW_USER, email, password, username });
}

export const signIn = ({ email, password }) => {
  store.dispatch(addUserPending());
  worker.postMessage({ cmd: SIGN_IN, email, password });
}

export const subscribeAuthState = () => {
  store.dispatch(addUserPending());
  worker.postMessage({ cmd: IS_SIGN_IN });
}