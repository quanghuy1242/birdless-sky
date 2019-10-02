import { LitElement, html, css, property, customElement, query } from 'lit-element';
import { connect } from 'pwa-helpers';
import { connectRouter, navigate } from 'lit-redux-router';
import { store } from './store/index';

import './Pages/Home/app-home';
import './Pages/Post/app-post';
import './Pages/NotFound/app-not-found';
import './Pages/About/app-about';

import './components/NavTop/app-nav-top';

@customElement('app-main')
export class AppMain extends LitElement {
  constructor() {
    super();
    connectRouter(store);
  }

  render() {
    return html`
      <app-nav-top></app-nav-top>
      <nav>
        <a href="/">Home</a>
        <a href="/post/1">Blog số 1</a>
        <a href="/about">About</a>
      </nav>
      <div class="outlet">
        <lit-route path="/" component="app-home"></lit-route>
        <lit-route path="/post/:id" component="app-post"></lit-route>
        <lit-route path="/about" component="app-about"></lit-route>
        <lit-route component="app-not-found"></lit-route>
      </div>
    `;
  }
}