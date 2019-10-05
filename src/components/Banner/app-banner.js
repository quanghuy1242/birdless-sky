import { LitElement, html, css, property, customElement, unsafeCSS, queryAll, query } from 'lit-element';
import { mdcTypographyStyles, mdcButtonStyles } from '../../sharestyles';
import style from './app-banner.scss';
import { MDCRipple } from '@material/ripple';
import { connect } from 'pwa-helpers';
import { store } from '../../store';
import { fetchConfig } from '../../store/actions/banner';

import '../Tooltip/app-tooltip';

@customElement('app-banner')
export class AppMain extends connect(store)(LitElement) {
  @queryAll('.mdc-button') buttonElements;
  @query('.banner-wrapper') bannerWrapper;
  
  @property({ type: String }) name;
  @property({ type: String }) slogan;
  @property({ type: String }) image;

  stateChanged(state) {
    this.name = state.banner.name;
    this.slogan = state.banner.slogan;
    this.image = state.banner.image;
  }

  static get styles() {
    return [
      mdcButtonStyles,
      mdcTypographyStyles,
      css`${unsafeCSS(style)}`,
    ];
  }

  firstUpdated() {
    this.buttonElements.forEach(buttonElement => {
      MDCRipple.attachTo(buttonElement);
    });

    // get data
    store.dispatch(fetchConfig());
  }

  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      if (propName === 'image') {
        this.setBackgroundImage(this.image);
      }
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
          <a href='/about' class="mdc-button mdc-button--raised btn-learn-about" role="tooltip">Learn About Me</a>
        </app-tooltip>
      </div>
    `;
  }
}