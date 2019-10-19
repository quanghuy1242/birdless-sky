import { LitElement, html, css, property, customElement, unsafeCSS, query, queryAll } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import { updateMetadata, connect } from 'pwa-helpers';
import { store } from '../../store';
import style from './app-post.scss';
import { mdcTypographyStyles, mdcIconButtonStyles, materialIconsStyles, githubMarkdownStyles, mdcChipsStyles, mdcTextFieldStyles, mdcButtonStyles } from '../../sharestyles';
import { fetchPostById } from '../../worker/worker.instance';
import { getDate } from '../../utils/post.util';
import { md } from '../../markdown';
import { MDCChipSet } from '@material/chips';

import '../../components/CircularProgress/app-circular-progress';
import { MDCTextField } from '@material/textfield';
import { MDCRipple } from '@material/ripple/component';

@customElement('app-post')
export class AppMain extends connect(store)(LitElement) {
  @query('.post-detail__body__content') markdownContent;
  @queryAll('.mdc-chip-set') chipsetElements;
  @queryAll('.mdc-button') buttonElements;
  @queryAll('.mdc-text-field') textFieldElements;

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
      mdcChipsStyles,
      mdcTextFieldStyles,
      mdcButtonStyles,
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
    this.category = state.postDetail.category;
  }

  firstUpdated() {
    fetchPostById(this.id);
  }

  updated() {
    // Chip
    this.chipsetElements.forEach(element => {
      new MDCChipSet(element)
    });

    this.textFieldElements.forEach(element => {
      new MDCTextField(element);
    });
    
    this.buttonElements.forEach(button => MDCRipple.attachTo(button));

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
              <div class="wrapper">
                <div class="post-detail__header">
                  <div class="post-detail__header__text">
                    <div
                      class="post-detail__header__text__title mdc-typography--headline5"
                    >
                      ${this.title}
                    </div>
                    <div
                      class="post-detail__header__text__subtitle mdc-typography--body2"
                    >
                      ${getDate(this.date).toLocaleDateString()}
                    </div>
                  </div>
                  <div class="post-detail__header__action">
                    <button class="mdc-icon-button material-icons">
                      more_vert
                    </button>
                  </div>
                </div>
                <div class="post-detail__body">
                  <div class="post-detail__body__content markdown-body">
                    ${unsafeHTML(md.render(this.content))}
                  </div>
                  <div
                    class="post-detail__body__author mdc-typography--subtitle2"
                  >
                    <b><i>Quang Huy</i></b>
                  </div>
                </div>
              </div>
              <div class="additional-information">
                <div class="additional-information-inner">
                  <div class="category">
                    <div class="mdc-typography--caption header">Thể loại</div>
                    <div class="mdc-chip-set">
                      <a class="mdc-chip mdc-chip--primary">
                        <span class="mdc-chip__text">${this.category?.name}</span>
                      </a>
                    </div>
                  </div>
                  <div class="tags">
                    <div class="mdc-typography--caption header">Nhãn</div>
                    <div class="mdc-chip-set">
                      ${this.tags.length === 0
                        ? html`
                            <a class="mdc-chip">
                              <span class="mdc-chip__text">No tag</span>
                            </a>
                          `
                        : this.tags?.map(
                            tag => html`
                              <a class="mdc-chip">
                                <span class="mdc-chip__text">${tag}</span>
                              </a>
                            `
                          )}
                    </div>
                  </div>
                  <div class="social">
                    <div class="mdc-typography--caption header">Chia sẻ</div>
                    <div class="action-button">
                      <button class="mdc-button mdc-button--raised">Facebook</button>
                      <button class="mdc-button mdc-button--raised">Twitter</button>
                    </div>
                  </div>
                  <div class="comments">
                    <div class="mdc-typography--caption header">Bình luận</div>
                    <div class="mdc-textfield-wrapper">
                      <div class="mdc-text-field mdc-text-field--textarea comment-box">
                        <textarea id="textarea" class="mdc-text-field__input"></textarea>
                        <div class="mdc-notched-outline">
                          <div class="mdc-notched-outline__leading"></div>
                          <div class="mdc-notched-outline__notch">
                            <label for="textarea" class="mdc-floating-label">Comment</label>
                          </div>
                          <div class="mdc-notched-outline__trailing"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            `
          : html`
              <app-circular-progress
                size="xlarge"
                center
                style="margin: 2rem 0; flex-grow: 1"
              ></app-circular-progress>
            `}
      </div>
    `;
  }
}