import { LitElement, html, css, customElement, unsafeCSS } from 'lit-element';
import { connectRouter, navigate } from 'lit-redux-router';
import { store } from './store/index';
import style from './app-main.scss';
import { fetchInitPosts } from './worker/worker.instance';

import './components/NavTop/app-main-content';
import './pages/Home/app-home';
import './pages/About/app-about';
import './pages/NotFound/app-not-found';
import './pages/Post/app-post';

@customElement('app-main')
export class AppMain extends LitElement {
  static get styles() {
    return [
      css`${unsafeCSS(style)}`
    ];
  }
  
  constructor() {
    super();
    connectRouter(store);
  }

  firstUpdated() {
    fetchInitPosts();
  }

  render() {
    return html`
      <app-main-content>
        <div class="outlet">
          <lit-route
            path="/"
            .resolve=${() => store.dispatch(navigate('/home'))}
          ></lit-route>
          <lit-route
            path="/home"
            component="app-home"
          ></lit-route>
          <lit-route
            path="/post/:id"
            component="app-post"
          ></lit-route>
          <lit-route
            path="/category/:id"
            component="app-post"
          ></lit-route>
          <lit-route
            path="/about"
            component="app-about"
          ></lit-route>
          <lit-route
            component="app-not-found"
          ></lit-route>
        </div>
      </app-main-content>
    `;
  }
}