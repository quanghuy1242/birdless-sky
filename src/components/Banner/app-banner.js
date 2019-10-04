import { LitElement, html, css, property, customElement, unsafeCSS, queryAll, query } from 'lit-element';
import { mdcTypographyStyles, mdcButtonStyles } from '../../sharestyles';
import style from './app-banner.scss';
import tooltipAnimations from '../Tooltip/app-tooltip-animation.scss';
import { MDCRipple } from '@material/ripple';

import '../Tooltip/app-tooltip';

@customElement('app-banner')
export class AppMain extends LitElement {
  @queryAll('.mdc-button') buttonElements;
  @query('.banner-wrapper') bannerWrapper;
  
  @property({ type: String }) name = 'Quang Huy';
  @property({ type: String }) slogan = 'Quang Huy';
  @property({ type: String }) image = '';

  static get styles() {
    return [
      mdcButtonStyles,
      mdcTypographyStyles,
      css`${unsafeCSS(style)}`,
      css`${unsafeCSS(tooltipAnimations)}`
    ];
  }

  firstUpdated() {
    this.setBackgroundImage(this.image);
    this.buttonElements.forEach(buttonElement => {
      MDCRipple.attachTo(buttonElement);
    });
  }

  setBackgroundImage(image) {
    if (image) {
      this.bannerWrapper.style.backgroundImage = `url(${image})`
    }
  }

  render() {
    return html`
      <div class="banner-wrapper">
        <h1 class="mdc-typography--headline2">${this.name}</h1>
        <div class="mdc-button mdc-button--unelevated mdc-typography--body1 slogan">${this.slogan}</div>
        <app-tooltip content="Information of something special" style="margin-top: 40px">
          <a href='/about' class="mdc-button mdc-button--raised btn-learn-about">Learn About Me</a>
        </app-tooltip>
      </div>
    `;
  }
}