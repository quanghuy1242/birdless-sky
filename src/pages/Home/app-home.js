import { LitElement, html, css, property, customElement, unsafeCSS } from 'lit-element';
import { updateMetadata } from 'pwa-helpers';
import style from './app-home.scss';
import { store } from '../../store';
import { setHomePosition } from '../../store/actions/router';

import '../../components/CircularProgress/app-circular-progress';
import '../../components/CardItem/app-card-item';
import '../../components/PostList/app-post-list';
import '../../components/CategoriesList/app-categories-list';

@customElement('app-home')
export class AppMain extends LitElement {
  @property({ type: Object }) scrollElement = null;
  
  static get styles() {
    return [
      css`${unsafeCSS(style)}`
    ];
  }

  firstUpdated() {
    this.scrollElement = document
      .querySelector('app-main').shadowRoot
      .querySelector('app-main-content').shadowRoot
      .querySelector('.mdc-drawer-app-content');
  }
  
  onBeforeLeave() {
    store.dispatch(setHomePosition(this.scrollElement.scrollTop));
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
            <app-post-list></app-post-list>
          </div>
        </div>
        <div class="right-panel">
          <app-categories-list></app-categories-list>
        </div>
      </div>
    `;
  }
}