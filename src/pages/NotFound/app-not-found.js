import { LitElement, html, css, customElement, unsafeCSS } from 'lit-element';
import { mdcTypographyStyles, mdcButtonStyles } from '../../sharestyles';
import style from './app-not-found.scss';

@customElement('app-not-found')
export class AppMain extends LitElement {
  static get styles() {
    return [
      mdcTypographyStyles,
      mdcButtonStyles,
      css`${unsafeCSS(style)}`
    ];
  }

  render() {
    return html`
      <div class="wrapper">
        <div class="mdc-typography--headline1">404</div>
        <div class="mdc-typography--body2">Nội dung bạn tìm kiếm không được tìm thấy</div>
        <a class="mdc-button mdc-button--raised" href="/home">Homepage</a>
      </div>
    `;
  }
}