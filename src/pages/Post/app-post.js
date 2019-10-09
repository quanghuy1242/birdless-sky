import { LitElement, html, css, property, customElement, unsafeCSS } from 'lit-element';
import { updateMetadata, connect } from 'pwa-helpers';
import { store } from '../../store';
import style from './app-post.scss';
import { mdcTypographyStyles, mdcIconButtonStyles, materialIconsStyles } from '../../sharestyles';

@customElement('app-post')
export class AppMain extends connect(store)(LitElement) {
  @property({ type: String }) id;
  @property({ type: String }) titleId;

  static get styles() {
    return [
      materialIconsStyles,
      mdcTypographyStyles,
      mdcIconButtonStyles,
      css`${unsafeCSS(style)}`
    ];
  }

  stateChanged(state) {
    this.id = state.router.params.id;
    this.titleId = state.router.params.titleId;
  }

  updated() {
    updateMetadata({
      title: `Bài viết số ${this.id}`,
      description: `Bài viết số ${this.id}`,
      url: window.location.href
    });
  }

  render() {
    return html`
      <div class="post-detail">
        <div class="post-detail__header">
          <div class="post-detail__header__text">
            <div class="post-detail__header__text__title mdc-typography--headline5">${this.titleId}</div>
            <div class="post-detail__header__text__subtitle mdc-typography--body2">${this.id}</div>
          </div>
          <div class="post-detail__header--action">
            <button class="mdc-icon-button material-icons">more_vert</button>
          </div>
        </div>
      </div>
    `;
  }
}