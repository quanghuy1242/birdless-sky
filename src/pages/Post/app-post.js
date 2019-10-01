import { LitElement, html, css, property, customElement } from 'lit-element';
import { updateMetadata } from 'pwa-helpers';

@customElement('app-post')
export class AppMain extends LitElement {
  @property({ type: String }) id;

  updated() {
    updateMetadata({
      title: `Bài viết số ${this.id}`,
      description: `Bài viết số ${this.id}`,
      url: window.location.href
    });
  }

  render() {
    return html`
      <p>Post id: ${this.id}</p>
    `;
  }
}