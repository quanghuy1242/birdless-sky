import { LitElement, html, css, property, customElement, query, queryAll, unsafeCSS } from 'lit-element';
import {
  mdcTopAppBarStyles,
  mdcButtonStyles,
  mdcElevationStyles,
  mdcTypographyStyles,
  mdcListStyles,
  mdcDrawerStyles,
  materialIconsStyles,
  mdcIconButtonStyles,
  mdcTextFieldStyles
} from '../../sharestyles';
import { MDCTopAppBar } from '@material/top-app-bar';
import { MDCRipple } from '@material/ripple';
import { MDCList } from '@material/list';
import { MDCDrawer } from '@material/drawer';
import { connect, installMediaQueryWatcher } from 'pwa-helpers';
import { classMap } from 'lit-html/directives/class-map';
import { store } from '../../store';
import style from './app-main-content.scss';

import '../Banner/app-banner';
import '../Tooltip/app-tooltip';
import { MDCTextField } from '@material/textfield';

@customElement('app-main-content')
export class AppNavTop extends connect(store)(LitElement) {
  @query('.mdc-top-app-bar') topAppBarElement;
  @queryAll('.mdc-button') buttonElements;
  @query('.mdc-list') listElement;
  @query('.mdc-drawer') drawerElement;
  @queryAll('.mdc-list-item') listItems;
  @query('.drawer-frame-root') contentElement;
  @query('app-banner') bannerElement;
  @query('.mdc-text-field') textFieldElement;

  @property({ type: String }) pathname = window.location.pathname;
  @property({ type: Boolean }) isMobile;

  static get styles() {
    return [
      mdcTopAppBarStyles,
      mdcButtonStyles,
      mdcElevationStyles,
      mdcTypographyStyles,
      mdcListStyles,
      mdcDrawerStyles,
      materialIconsStyles,
      mdcIconButtonStyles,
      mdcTextFieldStyles,
      css`${unsafeCSS(style)}`,
    ];
  }

  constructor() {
    super();
    this.excuteQueryMatchers();
    window.addEventListener('resize', this.excuteQueryMatchers);
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

    if (this.isMobile) {
      this.drawer = MDCDrawer.attachTo(this.drawerElement);
    } else {
      delete this.drawer;
    }
  }

  firstUpdated() {
    this.topAppBar = new MDCTopAppBar(this.topAppBarElement);

    this.list = MDCList.attachTo(this.listElement);

    // Attact Ripple
    [...this.buttonElements, ...this.listItems].forEach(buttonElement => {
      MDCRipple.attachTo(buttonElement);
    });

    new MDCTextField(this.textFieldElement);
  }

  handleToggleMenu() {
    this.drawer.open = !this.drawer.open;
  }

  excuteQueryMatchers() {
    installMediaQueryWatcher(`(max-width: 600px)`, isMobile => {
      this.isMobile = isMobile;
    });
  }

  getDrawerTemplate() {
    return html`
      <aside
        class=${classMap({
          "mdc-drawer--modal": this.isMobile,
          "mdc-drawer--modal__mobile": this.isMobile,
          "mdc-drawer": true
        })}
      >
        <div class="mdc-drawer__content">
          <nav class="mdc-list">
            <div class="mdc-text-field-wrapper">
              <div class="mdc-text-field mdc-text-field--outlined">
                <input class="mdc-text-field__input" id="text-field-hero-input">
                <div class="mdc-notched-outline">
                  <div class="mdc-notched-outline__leading"></div>
                  <div class="mdc-notched-outline__notch">
                    <label for="text-field-hero-input" class="mdc-floating-label">Search</label>
                  </div>
                  <div class="mdc-notched-outline__trailing"></div>
                </div>
              </div>
            </div>
            <a class="mdc-list-item" href="/home" tabindex="0">
              <i class="material-icons mdc-list-item__graphic">book</i>
              <span class="mdc-list-item__text">Blog</span>
            </a>
            <a class="mdc-list-item ${classMap({ "mdc-list-item--activated": this.isMobile })}" href="/category">
              <i class="material-icons mdc-list-item__graphic">category</i>
              <span class="mdc-list-item__text">Category</span>
            </a>
            <a class="mdc-list-item" href="http://project-showcase.netlify.com" target="_blank" rel="noreferrer">
              <i class="material-icons mdc-list-item__graphic">collections</i>
              <span class="mdc-list-item__text">Showcase</span>
            </a>
            <a class="mdc-list-item" href="/about">
              <i class="material-icons mdc-list-item__graphic">info</i>
              <span class="mdc-list-item__text">About me</span>
            </a>
          </nav>
        </div>
      </aside>
      <div class="mdc-drawer-scrim"></div>
    `;
  }

  getToggleMenu() {
    return this.isMobile
      ? html`
        <button
          class="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button"
          @click=${this.handleToggleMenu}
        >menu</button>
      `
      : html``
  }

  render() {
    const buttonClass =
      !this.isMobile 
        ? "mdc-button mdc-button--unelevated mdc-typography--body2"
        : "mdc-icon-button material-icons";

    return html`
      <header class="mdc-top-app-bar app-bar mdc-elevation--z4">
        <div class="mdc-top-app-bar__row">
          <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
            ${this.getToggleMenu()}
            <a href="/home" class="mdc-button mdc-button--unelevated header-text mdc-typography--body2">Birdless Sky</a>
          </section>
          <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end top-bar-sub-item" role="toolbar">
            <a href="/login" class="${buttonClass}">${!this.isMobile ? "Sign in" : "face"}</a>
            <a href="/register" class="${buttonClass}">${!this.isMobile ? "Register" : "exit_to_app"}</a>
          </section>
        </div>
      </header>
      ${this.isMobile ? this.getDrawerTemplate() : ''}
      <div
        class=${classMap({
          "mdc-drawer-app-content__mobile": this.isMobile,
          "mdc-drawer-app-content": true,
          "mdc-top-app-bar--fixed-adjust": true
        })}
      >
        ${this.pathname === '/home'
          ? html`<app-banner></app-banner>`
          : html``}
        <div class="drawer-frame-root">
          ${!this.isMobile ? this.getDrawerTemplate() : ''}
          <main
            class=${classMap({
              "main-content__mobile": this.isMobile,
              "main-content": true
            })}
          >
            <slot></slot>
          </main>
        </div>
      </div>
    `;
  }
}