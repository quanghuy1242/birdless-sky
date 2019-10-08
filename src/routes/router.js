import { Router } from '@vaadin/router';
import { store } from '../store';
import { changeRouteDetail } from '../store/actions/router';

export const initRouter = outlet => {
  const router = new Router(outlet);
  router.setRoutes([
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: 'app-home',
      action: () => {
        import(/* webpackChunkName: "home" */ '../pages/Home/app-home');
      }
    },
    {
      path: '/post/:titleId/:id',
      component: 'app-post',
      action: () => {
        import(/* webpackChunkName: "post-detail" */ '../pages/Post/app-post');
      }
    },
    {
      path: '/category/:id',
      component: 'app-post',
      action: () => {
        import(/* webpackChunkName: "post-detail" */ '../pages/Post/app-post');
      }
    },
    {
      path: '/about',
      component: 'app-about',
      action: () => {
        import(/* webpackChunkName: "about" */ '../pages/About/app-about');
      }
    },
    {
      path: '(.*)+',
      component: 'app-not-found',
      action: () => {
        import(/* webpackChunkName: "not-found" */ '../pages/NotFound/app-not-found');
      }
    }
  ]);

  window.addEventListener('vaadin-router-location-changed', (event) => {
    store.dispatch(changeRouteDetail({
      activeRoute: event.detail.location.pathname,
      params: router.location.params
    }));
  });

  store.subscribe(() => {
    const activeRoute = store.getState().router.activeRoute;
    if (activeRoute === '/home') {
      const position = store.getState().router.homePosition;
      document
        .querySelector('app-main').shadowRoot
        .querySelector('app-main-content').shadowRoot
        .querySelector('.mdc-drawer-app-content')
        .scrollTo({ top: position });
    };
  })
}