import { LitElement, html, css, customElement, unsafeCSS, query } from 'lit-element';
import { MDCList } from '@material/list';
import { mdcListStyles } from '../../sharestyles';
import style from './app-side-bar.scss';

import '@material/mwc-textfield';
import '@material/mwc-icon';
import '@material/mwc-ripple';
import '../Tooltip/app-tooltip';

@customElement('app-side-bar')
export class AppSideBar extends LitElement {
  @query('.mdc-list') listElement;

  static get styles() {
    return [
      mdcListStyles,
      css`${unsafeCSS(style)}`
    ];
  }

  firstUpdated() {
    MDCList.attachTo(this.listElement)
  }

  render() {
    return html`
      <nav class="mdc-list cs-drawer">
        <mwc-textfield label="Search" outlined></mwc-textfield>
        <a class="mdc-list-item" href="/home" tabindex="0">
          <mwc-icon class="mdc-list-item__graphic">book</mwc-icon>
          <span class="mdc-list-item__text">Blog</span>
          <mwc-ripple></mwc-ripple>
        </a>
        <a class="mdc-list-item" href="/category">
          <mwc-icon class="mdc-list-item__graphic">category</mwc-icon>
          <span class="mdc-list-item__text">Category</span>
          <mwc-ripple></mwc-ripple>
        </a>
        <app-tooltip content="External Link" placement="left">
          <a class="mdc-list-item" href="http://project-showcase.netlify.com" target="_blank" rel="noreferrer">
            <mwc-icon class="mdc-list-item__graphic">collections</mwc-icon>
            <span class="mdc-list-item__text">Showcase</span>
            <mwc-ripple></mwc-ripple>
          </a>
        </app-tooltip>
        <a class="mdc-list-item" href="/about">
          <mwc-icon class="mdc-list-item__graphic">info</mwc-icon>
          <span class="mdc-list-item__text">About me</span>
          <mwc-ripple></mwc-ripple>
        </a>
      </nav>
    `;
  }
}