import { LitElement, html, css, property, customElement, unsafeCSS, query } from 'lit-element';
import { mdcTypographyStyles } from '../../sharestyles';
import style from './app-banner.scss';
import { connect } from 'pwa-helpers';
import { store } from '../../store';
import { fetchConfig } from '../../worker/worker.instance';
import { Router } from '@vaadin/router';

import '@material/mwc-button';
import '@material/mwc-ripple';
import '../Tooltip/app-tooltip';

@customElement('app-banner')
export class AppMain extends connect(store)(LitElement) {
  @query('.banner-wrapper') bannerWrapper;
  
  @property({ type: String }) name;
  @property({ type: String }) slogan;
  @property({ type: String }) image;
  @property({ type: String }) pathname = window.location.pathname;

  stateChanged(state) {
    this.name = state.banner.name;
    this.slogan = state.banner.slogan;
    this.image = state.banner.image;
    this.pathname = state.router.activeRoute;
  }

  static get styles() {
    return [
      mdcTypographyStyles,
      css`${unsafeCSS(style)}`,
    ];
  }

  firstUpdated() {
    fetchConfig(); // get data
  }

  updated() {
    if (this.pathname === '/home') {
      this.setBackgroundImage(this.image);
    }
  }

  setBackgroundImage(image) {
    if (image && this.bannerWrapper) {
      this.bannerWrapper.style.backgroundImage = `url(${image})`
    }
  }

  render() {
    return html`
      ${this.pathname === '/home'
        ? html`
          <div class="banner-wrapper">
            <h1 class="mdc-typography--headline2">${this.name}</h1>
            <mwc-button class="cs-slogan">${this.slogan}</mwc-button>
            <app-tooltip content="Information of something special" style="margin-top: 40px">
              <mwc-button raised label="Learn About Me" class="btn-learn-about" @click=${() => Router.go('/about')} ></mwc-button>
            </app-tooltip>
          </div>
        `
        : ''}
    `;
  }
}