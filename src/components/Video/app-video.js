import { LitElement, html, property, customElement, css } from 'lit-element';

@customElement('app-video')
export class AppVideo extends LitElement {
  @property({ type: String }) id;
  @property({ type: Number }) width = 560;
  @property({ type: Number }) height = 315;
  @property({ type: String }) center;

  static get styles() {
    return css`
      :host {
        display: block;
      }

      :host([center]) {
        text-align: center;
      }
    `;
  }

  render() {
    return html`
      <iframe
        width=${this.width}
        height=${this.height}
        src="https://www.youtube.com/embed/${this.id}"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    `;
  }
}