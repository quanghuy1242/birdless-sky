import { LitElement, html, css, property, customElement, query, unsafeCSS } from 'lit-element';
import { connect } from 'pwa-helpers';
import { connectRouter, navigate } from 'lit-redux-router';
import { store } from './store/index';
import style from './app-main.scss';

import './Pages/Home/app-home';
import './Pages/Post/app-post';
import './Pages/NotFound/app-not-found';
import './Pages/About/app-about';

import './components/NavTop/app-main-content';

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

  render() {
    return html`
      <app-main-content>
        <div class="outlet">
          <lit-route path="/" .resolve=${() => store.dispatch(navigate('/home'))}></lit-route>
          <lit-route path="/home" component="app-home"></lit-route>
          <lit-route path="/post/:id" component="app-post"></lit-route>
          <lit-route path="/category/:id" component="app-post"></lit-route>
          <lit-route path="/about" component="app-about"></lit-route>
          <lit-route component="app-not-found"></lit-route>
        </div>
      </app-main-content>
    `;
  }
}