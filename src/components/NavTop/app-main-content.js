import { LitElement, html, css, property, customElement, query, queryAll, unsafeCSS } from 'lit-element';
import {
  mdcTopAppBarStyles,
  mdcButtonStyles,
  mdcElevationStyles,
  mdcTypographyStyles,
  mdcListStyles,
  mdcDrawerStyles,
  materialIconsStyles
} from '../../sharestyles';
import { MDCTopAppBar } from '@material/top-app-bar';
import { MDCRipple } from '@material/ripple';
import { MDCList } from '@material/list';
// import { MDCDrawer } from '@material/drawer';
import { connect } from 'pwa-helpers';
import { store } from '../../store';
import style from './app-main-content.scss';

import '../../components/Banner/app-banner';
import '../Tooltip/app-tooltip';
import tooltipAnimations from '../Tooltip/app-tooltip-animation.scss';

@customElement('app-main-content')
export class AppNavTop extends connect(store)(LitElement) {
  @query('.mdc-top-app-bar') topAppBarElement;
  @queryAll('.mdc-button') buttonElements;
  @query('.mdc-list') listElement;
  @query('.mdc-drawer') drawerElement;
  @queryAll('.mdc-list-item') listItems;
  @query('.drawer-frame-root') contentElement;
  @query('app-banner') bannerElement;

  @property({ type: String }) pathname = window.location.pathname;

  static get styles() {
    return [
      mdcTopAppBarStyles,
      mdcButtonStyles,
      mdcElevationStyles,
      mdcTypographyStyles,
      mdcListStyles,
      mdcDrawerStyles,
      materialIconsStyles,
      css`${unsafeCSS(tooltipAnimations)}`,
      css`${unsafeCSS(style)}`,
    ];
  }

  stateChanged(state) {
    this.pathname = state.router.activeRoute;
  }

  updated() {
    // Calculate min-height of content to fit screen
    setTimeout(() => {
      this.contentElement.style.minHeight 
        = `calc(100% - ${this.bannerElement ? this.bannerElement.offsetHeight : 0}px)`;
    }, 0);
  }

  firstUpdated() {
    this.topAppBar = new MDCTopAppBar(this.topAppBarElement);

    this.list = MDCList.attachTo(this.listElement);
    // this.drawer = MDCDrawer.attachTo(this.drawerElement);
    // this.drawer.open = true;

    // Attact Ripple
    [...this.buttonElements, ...this.listItems].forEach(buttonElement => {
      MDCRipple.attachTo(buttonElement);
    });
  }

  render() {
    return html`
      <header class="mdc-top-app-bar app-bar mdc-elevation--z4">
        <div class="mdc-top-app-bar__row">
          <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
            <a href="/home" class="mdc-button mdc-button--unelevated header-text mdc-typography--body2">Birdless Sky</a>
          </section>
          <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end top-bar-sub-item" role="toolbar">
            <app-tooltip content="Find me on the internet">
              <button href="/about" class="mdc-button mdc-button--unelevated mdc-typography--body2">Find me</button>
            </app-tooltip>
            <a href="/login" class="mdc-button mdc-button--unelevated mdc-typography--body2">Sign in</a>
            <a href="/register" class="mdc-button mdc-button--unelevated mdc-typography--body2">Register</a>
          </section>
        </div>
      </header>
      <div class="mdc-drawer-app-content mdc-top-app-bar--fixed-adjust">
        ${this.pathname === '/home'
          ? html`<app-banner></app-banner>`
          : html``}
        <div class="drawer-frame-root">
          <aside class="mdc-drawer">
            <div class="mdc-drawer__content">
              <div class="mdc-list">
                <a class="mdc-list-item" href="/home">
                  <i class="material-icons mdc-list-item__graphic">book</i>
                  <span class="mdc-list-item__text">Blog</span>
                </a>
                <a class="mdc-list-item" href="/category">
                  <i class="material-icons mdc-list-item__graphic">category</i>
                  <span class="mdc-list-item__text">Category</span>
                </a>
                <a class="mdc-list-item" href="http://project-showcase.netlify.com" target="_blank">
                  <i class="material-icons mdc-list-item__graphic">collections</i>
                  <span class="mdc-list-item__text">Showcase</span>
                </a>
                <a class="mdc-list-item" href="/about">
                  <i class="material-icons mdc-list-item__graphic">info</i>
                  <span class="mdc-list-item__text">About me</span>
                </a>
              </div>
            </div>
          </aside>
          <main class="main-content" id="main-content">
            <slot></slot>
          </main>
        </div>
      </div>
    `;
  }
}