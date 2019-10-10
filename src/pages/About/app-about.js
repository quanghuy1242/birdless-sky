import { LitElement, html, customElement, css, unsafeCSS, query } from 'lit-element';
import { updateMetadata } from 'pwa-helpers';
import { materialIconsStyles, mdcTabBarStyles, mdcTypographyStyles, mdcElevationStyles } from '../../sharestyles';
import style from './app-about.scss';
import { MDCTabBar } from '@material/tab-bar';

@customElement('app-about')
export class AppAbout extends LitElement {
  @query('.mdc-tab-bar') tabBarElement;

  static get styles() {
    return [
      materialIconsStyles,
      mdcTabBarStyles,
      mdcTypographyStyles,
      mdcElevationStyles,
      css`${unsafeCSS(style)}`
    ];
  }

  firstUpdated() {
    this.tabBar = new MDCTabBar(this.tabBarElement);
  }

  updated() {
    updateMetadata({
      title: 'About',
      description: 'About Quang Huy Blog',
      url: window.location.href
    });
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
        <div class="mdc-tab-bar" role="tablist">
          <div class="mdc-tab-scroller">
            <div class="mdc-tab-scroller__scroll-area">
              <div class="mdc-tab-scroller__scroll-content">
                <button class="mdc-tab mdc-tab--active" role="tab" aria-selected="true" tabindex="0">
                  <span class="mdc-tab__content">
                    <span class="mdc-tab__text-label">Informations</span>
                  </span>
                  <span class="mdc-tab-indicator mdc-tab-indicator--active">
                    <span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
                  </span>
                  <span class="mdc-tab__ripple"></span>
                </button>
                <button class="mdc-tab" role="tab" aria-selected="false" tabindex="-1">
                  <span class="mdc-tab__content">
                    <span class="mdc-tab__text-label">Contact</span>
                  </span>
                  <span class="mdc-tab-indicator">
                    <span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
                  </span>
                  <span class="mdc-tab__ripple"></span>
                </button>
                <button class="mdc-tab" role="tab" aria-selected="false" tabindex="-1">
                  <span class="mdc-tab__content">
                    <span class="mdc-tab__text-label">Github projects</span>
                  </span>
                  <span class="mdc-tab-indicator">
                    <span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
                  </span>
                  <span class="mdc-tab__ripple"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}