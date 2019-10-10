import { LitElement, html, css, property, customElement, unsafeCSS, query } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import { updateMetadata, connect } from 'pwa-helpers';
import { store } from '../../store';
import style from './app-post.scss';
import { mdcTypographyStyles, mdcIconButtonStyles, materialIconsStyles, githubMarkdownStyles } from '../../sharestyles';
import { fetchPostById } from '../../worker/worker.instance';
import { getDate } from '../../utils/post.util';
import { md } from '../../markdown';

import '../../components/CircularProgress/app-circular-progress';

@customElement('app-post')
export class AppMain extends connect(store)(LitElement) {
  @query('.post-detail__body__content') markdownContent;

  @property({ type: String }) id;
  @property({ type: String }) title;
  @property({ type: String }) titleId;
  @property({ type: Object }) date;
  @property({ type: String }) content;
  @property({ type: Array }) tags;
  @property({ type: Object }) category;
  @property({ type: Boolean }) isPending;

  static get styles() {
    return [
      materialIconsStyles,
      mdcTypographyStyles,
      mdcIconButtonStyles,
      githubMarkdownStyles,
      css`${unsafeCSS(style)}`
    ];
  }

  stateChanged(state) {
    this.id = state.router.params.id;
    this.titleId = state.router.params.titleId;
    this.title = state.postDetail.title;
    this.date = state.postDetail.day;
    this.content = state.postDetail.content || '';
    this.tags = state.postDetail.tags || [];
    this.isPending = state.postDetail.isPending;
  }

  firstUpdated() {
    fetchPostById(this.id);
  }

  updated() {
    updateMetadata({
      title: `${this.title ? this.title + ' - Quang Huy' : ''}`,
      description: `Bài viết số ${this.id}`,
      url: window.location.href
    });
  }

  render() {
    return html`
      <div class="post-detail">
        ${!this.isPending
          ? html`
            <div class="post-detail__header">
              <div class="post-detail__header__text">
                <div class="post-detail__header__text__title mdc-typography--headline5">${this.title}</div>
                <div class="post-detail__header__text__subtitle mdc-typography--body2">
                  ${getDate(this.date).toLocaleDateString()}
                </div>
              </div>
              <div class="post-detail__header--action">
                <button class="mdc-icon-button material-icons">more_vert</button>
              </div>
            </div>
            <div class="post-detail__body">
              <div class="post-detail__body__content markdown-body">
                ${unsafeHTML(md.render(this.content))}
              </div>
              <div class="post-detail__body__author mdc-typography--subtitle2">
                <b><i>Quang Huy</i></b>
              </div>
            </div>
          `
          : html`<app-circular-progress size="xlarge" center></app-circular-progress>`}
      </div>
    `;
  }
}