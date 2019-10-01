import { LitElement, html, css, property, customElement } from 'lit-element';

@customElement('app-not-found')
export class AppMain extends LitElement {
  render() {
    return html`
      <p>404</p>
    `;
  }
}