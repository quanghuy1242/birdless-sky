import { LitElement, html, css, property, customElement, unsafeCSS } from 'lit-element';
import { updateMetadata } from 'pwa-helpers';
import style from './app-home.scss';

import '../../components/CircularProgress/app-circular-progress';
import '../../components/CardItem/app-card-item';

@customElement('app-home')
export class AppMain extends LitElement {
  static get styles() {
    return [
      css`${unsafeCSS(style)}`
    ];
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
          <app-card-item></app-card-item>
        </div>
        <div class="right-panel">
          
        </div>
        <!-- <app-circular-progress size="xlarge" center></app-circular-progress> -->
      </div>
    `;
  }
}