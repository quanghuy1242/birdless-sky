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
        position: relative;
        padding-bottom: 56.25%;
        padding-top: 30px;
        height: 0;
        overflow: hidden;
      }

      iframe, object, embed {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 90%;
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