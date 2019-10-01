import { LitElement, html, css, property, customElement } from 'lit-element';
import { updateMetadata } from 'pwa-helpers';

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
      <p>Home</p>
    `;
  }
}