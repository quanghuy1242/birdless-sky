import { LitElement, html, customElement, property, unsafeCSS, css } from 'lit-element';
import style from './app-category.scss';

@customElement('app-category')
export class AppCategory extends LitElement {
  @property({ type: Array }) categories;

  static get styles() {
    return [
      css`${unsafeCSS(style)}`,
    ];
  }

  render() {
    return html`
      <div>Category page</div>
    `;
  }
}