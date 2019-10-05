import { LitElement, html, css, property, customElement, unsafeCSS } from 'lit-element';
import { updateMetadata, connect } from 'pwa-helpers';
import { store } from '../../store';
import style from './app-home.scss';

import '../../components/CircularProgress/app-circular-progress';
import '../../components/CardItem/app-card-item';
import '../../components/PostList/app-post-list';
import '../../components/CategoriesList/app-categories-list';

@customElement('app-home')
export class AppMain extends connect(store)(LitElement) {
  @property({ type: Boolean }) isPending;
  static get styles() {
    return [
      css`${unsafeCSS(style)}`
    ];
  }

  stateChanged(state) {
    this.isPending = state.post.pending;
  }

  updated() {
    updateMetadata({
      title: 'Home',
      description: 'Quang Huy Blog',
      url: window.location.href
    });
  }

  render() {
    return html`
      <div class="home-wrapper">
        <div class="list-post-panel">
          <div class="list-post-wrapper">
            ${this.isPending
              ? html`<app-circular-progress size="xlarge" center></app-circular-progress>`
              : html`<app-post-list></app-post-list>`}
          </div>
        </div>
        <div class="right-panel">
          <app-categories-list></app-categories-list>
        </div>
      </div>
    `;
  }
}