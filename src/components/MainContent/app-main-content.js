import { LitElement, html, css, property, customElement, query, queryAll, unsafeCSS } from 'lit-element';
import {
  mdcTopAppBarStyles,
  mdcElevationStyles,
  mdcTypographyStyles,
  mdcListStyles,
  mdcDrawerStyles,
} from '../../sharestyles';
import { MDCTopAppBar } from '@material/top-app-bar';
import { MDCRipple } from '@material/ripple';
import { MDCList } from '@material/list';
import { MDCDrawer } from '@material/drawer';
import { connect, installMediaQueryWatcher } from 'pwa-helpers';
import { classMap } from 'lit-html/directives/class-map';
import { store } from '../../store';
import style from './app-main-content.scss';
import { Router } from '@vaadin/router';

import '../Banner/app-banner';
import '../Tooltip/app-tooltip';
import { signOut } from '../../worker/worker.instance';
import '@material/mwc-icon';
import '@material/mwc-textfield';
import '@material/mwc-icon-button';
import '@material/mwc-ripple';

@customElement('app-main-content')
export class AppNavTop extends connect(store)(LitElement) {
  @query('.mdc-top-app-bar') topAppBarElement;
  @query('.mdc-list') listElement;
  @query('.mdc-drawer') drawerElement;
  @queryAll('.mdc-list-item') listItems;
  @query('.drawer-frame-root') contentElement;
  @query('app-banner') bannerElement;

  @property({ type: String }) name;
  @property({ type: String }) pathname = window.location.pathname;
  @property({ type: Boolean }) isMobile;
  @property({ type: Boolean }) isAuth;
  @property({ type: Boolean }) isPending;

  static get styles() {
    return [
      mdcTopAppBarStyles,
      mdcElevationStyles,
      mdcTypographyStyles,
      mdcListStyles,
      mdcDrawerStyles,
      css`${unsafeCSS(style)}`,
    ];
  }

  constructor() {
    super();
    this.excuteQueryMatchers();
    window.addEventListener('resize', this.excuteQueryMatchers);
  }

  stateChanged(state) {
    this.name = state.banner.name;
    this.pathname = state.router.activeRoute;
    this.isAuth = state.auth.isAuth || undefined;
    this.isPending = state.auth.isPending;
  }

  updated() {
    // Calculate min-height of content to fit screen
    setTimeout(() => {
      this.contentElement.style.minHeight 
        = `calc(100% - ${this.bannerElement ? this.bannerElement.offsetHeight : 0}px)`;
    }, 0);

    if (this.checkIfMenuShoudRender()) {
      if (this.isMobile) {
        this.drawer = MDCDrawer.attachTo(this.drawerElement);
      }
    } else {
      delete this.drawer;
    }

    // Attact Ripple
    [...this.listItems].forEach(buttonElement => {
      MDCRipple.attachTo(buttonElement);
    });

    this.shadowRoot.querySelectorAll('mwc-ripple').forEach(rippleElement => {
      rippleElement.shadowRoot.querySelector('.mdc-ripple-surface').style.borderRadius = '4px';
    })
  }

  firstUpdated() {
    this.topAppBar = new MDCTopAppBar(this.topAppBarElement);

    this.list = MDCList.attachTo(this.listElement);
    this.list.listen('MDCList:action', () => {
      if (this.drawer) { this.drawer.open = false; }
    })
  }

  handleToggleMenu() {
    this.drawer.open = !this.drawer.open;
  }

  excuteQueryMatchers() {
    installMediaQueryWatcher(`(max-width: 600px)`, isMobile => {
      this.isMobile = isMobile;
    });
  }

  checkIfMenuShoudRender() {
    if (this.pathname === '/login' || this.pathname === '/register') {
      if (this.isMobile) { return true; }
      else { return false; }
    }
    return true;
  }

  getDrawerTemplate() {
    if (this.checkIfMenuShoudRender()) {
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
                <mwc-textfield label="Search" outlined></mwc-textfield>
              </div>
              <a class="mdc-list-item" href="/home" tabindex="0">
                <mwc-icon class="mdc-list-item__graphic">book</mwc-icon>
                <span class="mdc-list-item__text">Blog</span>
              </a>
              <a class="mdc-list-item ${classMap({ "mdc-list-item--activated": this.isMobile })}" href="/category">
                <mwc-icon class="mdc-list-item__graphic">category</mwc-icon>
                <span class="mdc-list-item__text">Category</span>
              </a>
              <app-tooltip content="External Link" placement="left">
                <a class="mdc-list-item" href="http://project-showcase.netlify.com" target="_blank" rel="noreferrer">
                  <mwc-icon class="mdc-list-item__graphic">collections</mwc-icon>
                  <span class="mdc-list-item__text">Showcase</span>
                </a>
              </app-tooltip>
              <a class="mdc-list-item" href="/about">
              <mwc-icon class="mdc-list-item__graphic">info</mwc-icon>
                <span class="mdc-list-item__text">About me</span>
              </a>
            </nav>
          </div>
        </aside>
        ${this.isMobile ? html`<div class="mdc-drawer-scrim"></div>` : ''}
    `;
    }
  }

  getToggleMenu() {
    return this.isMobile
      ? html`
        <mwc-icon-button
          icon="menu"
          @click=${this.handleToggleMenu}
        ></mwc-icon-button>
      `
      : html``
  }

  handleSignOut() {
    signOut();
  }

  render() {
    return html`
      <header class="mdc-top-app-bar app-bar mdc-elevation--z4">
        <div class="mdc-top-app-bar__row">
          <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
            ${this.getToggleMenu()}
            <a href="/home" class="header-text mdc-typography--body2">
              Birdless Sky
              <mwc-ripple></mwc-ripple>
            </a>
          </section>
          <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end top-bar-sub-item" role="toolbar">
            ${!this.isPending
              ? html`
                ${!this.isAuth
                  ? html`
                    ${!this.isMobile
                      ? html`
                        <a href="/login" class="button-text mdc-typography--button">
                          Sign in
                          <mwc-ripple></mwc-ripple>
                        </a>
                        <a href="/register" class="button-text mdc-typography--button">
                        Register
                          <mwc-ripple></mwc-ripple>
                        </a>
                      `
                      : html`
                        <mwc-icon-button icon="face" @click=${() => Router.go('/login')}></mwc-icon-button>
                        <mwc-icon-button icon="exit_to_app" @click=${() => Router.go('/register')}></mwc-icon-button>
                      `}
                  `
                  : html`
                      ${!this.isMobile
                        ? html`
                          <a class="button-text mdc-typography--button">
                            Đã đăng nhập
                            <mwc-ripple></mwc-ripple>
                          </a>
                          <a class="button-text mdc-typography--button" @click=${this.handleSignOut}>
                            Sign out
                            <mwc-ripple></mwc-ripple>
                          </a>
                        `
                        : html`
                          <mwc-icon-button icon="favorite"></mwc-icon-button>
                          <mwc-icon-button icon="exit_to_app" @click=${this.handleSignOut}></mwc-icon-button>
                        `}
                  `}
              `
              : ''}
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
        <app-banner></app-banner>
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