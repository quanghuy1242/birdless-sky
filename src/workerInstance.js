import { store } from "./store";
import { fetchCategoriesPending, fetchCategoriesSuccess } from "./store/actions/category";
import { fetchConfigSuccess } from "./store/actions/banner";
import { fetchPostsPending, fetchPostsSuccess } from "./store/actions/post";

export const worker = new Worker('./worker.js', { type: 'module' });

worker.onmessage = e => {
  let data = e.data;
  switch (e.data.cmd) {
    case 'getConf':
      store.dispatch(fetchConfigSuccess(e.data.config));
      break;

    case 'getCategories':
      store.dispatch(fetchCategoriesSuccess(e.data.categories));
      break;

    case 'getInitPosts':
      data = data.data;
      store.dispatch(fetchPostsSuccess({
        posts: data.posts,
        lastVisible: data.lastVisible,
        lastCount: data.lastCount
      }));
      break;

    case 'getNextPosts':
      data = data.data;
      store.dispatch(fetchPostsSuccess({
        posts: data.posts,
        lastVisible: data.lastVisible,
        lastCount: data.lastCount
      }));
      break;

    default:
      break;
  }
}

export const fetchConfig = () => {
  worker.postMessage({ cmd: 'getConf' });
}

export const fetchAllCategories = () => {
  store.dispatch(fetchCategoriesPending());
  worker.postMessage({ cmd: 'getCategories' });
}

export const fetchInitPosts = () => {
  store.dispatch(fetchPostsPending());
  worker.postMessage({ cmd: 'getInitPosts' });
}

export const fetchNextPosts = oldLastVisible => {
  store.dispatch(fetchPostsPending());
  worker.postMessage({ cmd: 'getNextPosts', oldLastVisible });
}