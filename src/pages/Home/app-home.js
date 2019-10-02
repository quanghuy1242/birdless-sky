import { LitElement, html, css, property, customElement } from 'lit-element';
import { updateMetadata } from 'pwa-helpers';

import '../../components/Banner/app-banner';

@customElement('app-home')
export class AppMain extends LitElement {
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
        <app-banner></app-banner>
      </div>
    `;
  }
}