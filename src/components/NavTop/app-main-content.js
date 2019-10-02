import { LitElement, html, css, property, customElement, query, queryAll, unsafeCSS } from 'lit-element';
import { mdcTopAppBarStyles, mdcButtonStyles, mdcElevationStyles, mdcTypographyStyles } from '../../sharestyles';
import { MDCTopAppBar } from '@material/top-app-bar';
import { MDCRipple } from '@material/ripple';
import style from './app-main-content.scss';

@customElement('app-main-content')
export class AppNavTop extends LitElement {
  @query('.mdc-top-app-bar') topAppBarElement;
  @queryAll('.mdc-button') buttonElements;

  static get styles() {
    return [
      css`${unsafeCSS(style)}`,
      mdcTopAppBarStyles,
      mdcButtonStyles,
      mdcElevationStyles,
      mdcTypographyStyles
    ];
  }

  firstUpdated() {
    this.topAppBar = new MDCTopAppBar(this.topAppBarElement);

    this.buttonElements.forEach(buttonElement => {
      MDCRipple.attachTo(buttonElement);
    });
  }

  render() {
    return html`
      <header class="mdc-top-app-bar app-bar mdc-elevation--z4">
        <div class="mdc-top-app-bar__row">
          <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
            <a href="/home" class="mdc-button mdc-button--unelevated header-text">Birdless Sky</a>
          </section>
          <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end top-bar-sub-item" role="toolbar">
            <button href="/about" class="mdc-button mdc-button--unelevated mdc-typography--body2">Find me</button>
            <a href="/login" class="mdc-button mdc-button--unelevated mdc-typography--body2">Sign in</a>
            <a href="/register" class="mdc-button mdc-button--unelevated mdc-typography--body2">Register</a>
          </section>
        </div>
      </header>
      <div class="mdc-drawer-app-content mdc-top-app-bar--fixed-adjust">
        <main class="main-content" id="main-content">
          <slot></slot>
        </main>
      </div>
    `;
  }
}