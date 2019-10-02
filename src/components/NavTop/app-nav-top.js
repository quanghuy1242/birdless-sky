import { LitElement, html, css, property, customElement, query, queryAll } from 'lit-element';
import { mdcTopAppBarStyles, mdcButtonStyles } from '../../sharestyles';
import { MDCTopAppBar } from '@material/top-app-bar';
import { MDCRipple } from '@material/ripple';

@customElement('app-nav-top')
export class AppNavTop extends LitElement {
  @query('.mdc-top-app-bar') topAppBarElement;
  @queryAll('.mdc-button') buttonElements;

  static get styles() {
    return [
      mdcTopAppBarStyles,
      mdcButtonStyles
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
      <header class="mdc-top-app-bar">
        <div class="mdc-top-app-bar__row">
          <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
            <button class="mdc-button mdc-button--unelevated">Birdless Sky</button>
          </section>
          <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar">
            <button class="mdc-button mdc-button--unelevated">Find me</button>
            <button class="mdc-button mdc-button--unelevated">Sign in</button>
            <button class="mdc-button mdc-button--unelevated">Register</button>
          </section>
        </div>
      </header>
    `;
  }
}