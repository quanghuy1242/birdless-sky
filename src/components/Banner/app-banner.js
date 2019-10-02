import { LitElement, html, css, property, customElement, unsafeCSS, queryAll } from 'lit-element';
import { mdcTypographyStyles, mdcButtonStyles } from '../../sharestyles';
import style from './app-banner.scss';
import { MDCRipple } from '@material/ripple';

@customElement('app-banner')
export class AppMain extends LitElement {
  @queryAll('.mdc-button') buttonElements;
  
  @property({ type: String }) name = 'Quang Huy';
  @property({ type: String }) slogan = 'Quang Huy';

  static get styles() {
    return [
      mdcButtonStyles,
      mdcTypographyStyles,
      css`${unsafeCSS(style)}`
    ];
  }

  firstUpdated() {
    this.buttonElements.forEach(buttonElement => {
      MDCRipple.attachTo(buttonElement);
    });
  }

  render() {
    return html`
      <div class="banner-wrapper">
        <h1 class="mdc-typography--headline2">${this.name}</h1>
        <div class="mdc-button mdc-button--unelevated mdc-typography--body1 slogan">${this.slogan}</div>
        <a href='/about' class="mdc-button mdc-button--unelevated btn-learn-about">Learn About Me</a>
      </div>
    `;
  }
}