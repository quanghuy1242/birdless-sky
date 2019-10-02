import { LitElement, html, css, property, customElement } from 'lit-element';
import { updateMetadata } from 'pwa-helpers';
import { materialIconsStyles } from '../../sharestyles';

@customElement('app-about')
export class AppAbout extends LitElement {
  static get styles() {
    return [
      materialIconsStyles
    ];
  }

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
      <i class="material-icons">face</i>
    `;
  }
}