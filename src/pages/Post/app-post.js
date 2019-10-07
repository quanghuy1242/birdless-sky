import { LitElement, html, css, property, customElement } from 'lit-element';
import { updateMetadata, connect } from 'pwa-helpers';
import { store } from '../../store';

@customElement('app-post')
export class AppMain extends connect(store)(LitElement) {
  @property({ type: String }) id;
  @property({ type: String }) titleId;

  stateChanged(state) {
    this.id = state.router.params.id;
    this.titleId = state.router.params.titleId;
  }

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
      <p>Post title id: ${this.titleId}</p>
    `;
  }
}