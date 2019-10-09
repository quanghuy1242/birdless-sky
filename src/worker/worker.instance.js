import { store } from "../store";
import { fetchCategoriesPending, fetchCategoriesSuccess } from "../store/actions/category";
import { fetchConfigSuccess } from "../store/actions/banner";
import { fetchPostsPending, fetchPostsSuccess } from "../store/actions/post";
import {
  GET_CATEGORIES,
  GET_INIT_POSTS,
  GET_CONF,
  GET_NEXT_POSTS,
  GET_POST_DETAIL
} from './worker.type';
import { fetchPostDetailSuccess, fetchPostDetailPending } from "../store/actions/post-detail";

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