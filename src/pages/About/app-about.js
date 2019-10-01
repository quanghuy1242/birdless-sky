import { LitElement, html, css, property, customElement } from 'lit-element';
import { updateMetadata } from 'pwa-helpers';

@customElement('app-about')
export class AppAbout extends LitElement {
  updated() {
    updateMetadata({
      title: 'About',
      description: 'About Quang Huy Blog',
      url: window.location.href
    });
  }

  render() {
    return html`
      <p>About</p>
    `;
  }
}