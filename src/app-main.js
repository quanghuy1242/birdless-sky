import { LitElement, html, css, customElement, unsafeCSS, query } from 'lit-element';
import style from './app-main.scss';
import { fetchInitPosts, isSignIn } from './worker/worker.instance';
import { initRouter } from './routes/router';

import './components/MainContent/app-main-content';

@customElement('app-main')
export class AppMain extends LitElement {
  @query('.outlet') outlet;

  static get styles() {
    return [
      css`${unsafeCSS(style)}`
    ];
  }

  firstUpdated() {
    initRouter(this.outlet);
    fetchInitPosts();
    isSignIn();
  }

  render() {
    return html`
      <app-main-content>
        <div class="outlet"></div>
      </app-main-content>
    `;
  }
}