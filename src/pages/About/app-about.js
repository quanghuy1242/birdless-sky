import { LitElement, html, customElement, css, unsafeCSS, property } from 'lit-element';
import { updateMetadata } from 'pwa-helpers';
import { mdcTypographyStyles, mdcElevationStyles } from '../../sharestyles';
import style from './app-about.scss';

import '@material/mwc-tab-bar';

@customElement('app-about')
export class AppAbout extends LitElement {

  @property({ type: Number }) seletedIndex = 0;

  static get styles() {
    return [
      mdcTypographyStyles,
      mdcElevationStyles,
      css`${unsafeCSS(style)}`
    ];
  }

  updated() {
    updateMetadata({
      title: 'About',
      description: 'About Quang Huy Blog',
      url: window.location.href
    });
  }

  getContent(index) {
    switch (index) {
      case 0:
        return html`
          Xin chào các bạn
        `;
      
      case 1:
        return html`
          Thông tin liên hệ
        `;

      case 2:
        return html`
          Comming soon
        `;
    
      default:
        return '';
    }
  }

  render() {
    return html`
      <div class="wrapper">
        <div class="image-header" style="background-image: url('https://raw.githubusercontent.com/quanghuy1242/MyLibary/master/images/cover2.jpg')">
          <img
            src="https://raw.githubusercontent.com/quanghuy1242/MyLibary/master/images/cover.jpg"
            alt="love"
            width="150"
            height="150"
            class="mdc-elevation--z3"
          >
        </div>
        <div class="header-text mdc-typography--headline5">Quang Huy</div>
        <mwc-tab-bar @MDCTabBar:activated=${e => this.seletedIndex = e.detail.index}>
          <mwc-tab label="Informations"></mwc-tab>
          <mwc-tab label="Contact"></mwc-tab>
          <mwc-tab label="Github projects"></mwc-tab>
        </mwc-tab-bar>
        <div class="tab-content mdc-typography--body2">
          ${this.getContent(this.seletedIndex)}
        </div>
      </div>
    `;
  }
}