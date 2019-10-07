import { LitElement, html, css, customElement, unsafeCSS, query } from 'lit-element';
import style from './app-main.scss';
import { fetchInitPosts } from './worker/worker.instance';
import { initRouter } from './routes/router';

import './components/NavTop/app-main-content';

@customElement('app-main')
export class AppMain extends LitElement {
  @query('.outlet') outlet;

  static get styles() {
    return [
      css`${unsafeCSS(style)}`
    ];
  }
  
  constructor() {
    super();
  }

  firstUpdated() {
    initRouter(this.outlet);
    fetchInitPosts();
  }

  render() {
    return html`
      <app-main-content>
        <div class="outlet"></div>
      </app-main-content>
    `;
  }
}