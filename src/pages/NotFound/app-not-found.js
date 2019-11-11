import { LitElement, html, css, customElement, unsafeCSS } from 'lit-element';
import { mdcTypographyStyles } from '../../sharestyles';
import style from './app-not-found.scss';
import { Router } from '@vaadin/router';
import '@material/mwc-button';

@customElement('app-not-found')
export class AppMain extends LitElement {
  static get styles() {
    return [
      mdcTypographyStyles,
      css`${unsafeCSS(style)}`
    ];
  }

  render() {
    return html`
      <div class="wrapper">
        <div class="mdc-typography--headline1">404</div>
        <div class="mdc-typography--body2">Nội dung bạn tìm kiếm không được tìm thấy</div>
        <mwc-button raised label="Homepage" @click=${() => Router.go('/home')}></mwc-button>
      </div>
    `;
  }
}