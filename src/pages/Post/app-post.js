import { LitElement, html, css, property, customElement, unsafeCSS, queryAll } from 'lit-element';
import { updateMetadata, connect } from 'pwa-helpers';
import { store } from '../../store';
import { mdcTypographyStyles, mdcChipsStyles } from '../../sharestyles';
import { fetchPostById } from '../../worker/worker.instance';
import { getDate } from '../../utils/post.util';
import { MDCChipSet } from '@material/chips';
import { classMap } from 'lit-html/directives/class-map';
import style from './app-post.scss';
import { Router } from '@vaadin/router';

import '../../components/CircularProgress/app-circular-progress';
import '../../components/Tooltip/app-tooltip';
import '../../components/MarkdownContent/app-markdown';
import '@material/mwc-icon-button';
import '@material/mwc-icon';
import '@material/mwc-button';
import '@material/mwc-ripple';
import '@material/mwc-textarea';

@customElement('app-post')
export class AppMain extends connect(store)(LitElement) {
  @queryAll('.mdc-chip-set') chipsetElements;

  @property({ type: String }) id;
  @property({ type: String }) title;
  @property({ type: String }) titleId;
  @property() date;
  @property({ type: String }) content;
  @property({ type: Array }) tags;
  @property({ type: Object }) category;
  @property({ type: Boolean }) isPending;
  @property({ type: Array }) related;
  @property({ type: Boolean }) isPanelOpen = false;

  static get styles() {
    return [
      mdcTypographyStyles,
      mdcChipsStyles,
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
    this.related = state.postDetail.related;
  }

  firstUpdated() {
    fetchPostById(this.id);
  }

  updated() {
    // Chip
    this.chipsetElements.forEach(element => {
      new MDCChipSet(element)
    });

    updateMetadata({
      title: `${this.title ? this.title + ' - Quang Huy' : ''}`,
      description: `Bài viết số ${this.id}`,
      url: window.location.href
    });
  }

  handleTogglePanel() {
    this.isPanelOpen = !this.isPanelOpen;
  }

  renderAuthor() {
    return html`
      <div class="post-detail__body__author mdc-typography--subtitle2">
        <b><i>Quang Huy</i></b>
      </div>
    `;
  }

  renderNextPreviousButton(isNext, title, link) {
    this.shadowRoot.querySelectorAll('mwc-ripple').forEach(rippleElement => {
      rippleElement.shadowRoot.querySelector('.mdc-ripple-surface').style.borderRadius = '4px';
    });
    
    return html`
      <div class="prev-button mdc-typography--button ${isNext ? 'reverse' : ''}" @click=${() => Router.go(link)}>
        <mwc-icon>${isNext ? 'arrow_forward_ios' : 'arrow_back_ios'}</mwc-icon>
        <div class="np_text">
          <div class="np_header">${isNext ? 'Sau' : 'Trước'}</div>
          <div>${title}</div>
        </div>
        <mwc-ripple primary></mwc-ripple>
      </div>
    `;
  }

  render() {
    return html`
      <div class="post-detail">
        ${!this.isPending
          ? html`
              <div
                class=${classMap({
                  "wrapper": true,
                  "panel-open": this.isPanelOpen
                })}
              >
                <div class="post-detail__header">
                  <div class="post-detail__header__text">
                    <div class="post-detail__header__text__title mdc-typography--headline5">
                      ${this.title}
                    </div>
                    <div class="post-detail__header__text__subtitle mdc-typography--body2">
                      ${getDate(this.date).toLocaleDateString()}
                    </div>
                  </div>
                  <div class="post-detail__header__action">
                    <app-tooltip content="Detail" placement="left">
                      <mwc-icon-button
                        icon=${this.isPanelOpen ? 'menu_open' : 'menu'}
                        @click=${this.handleTogglePanel}
                      ></mwc-icon-button>
                    </app-tooltip>
                  </div>
                </div>
                <div class="post-detail__body">
                  <app-markdown
                    .content=${this.content}
                    class="post-detail__body__content">
                  </app-markdown>
                  ${this.renderAuthor()}
                </div>
                <div class="next-previous-panel">
                  ${this.related[1]?.id
                    ? html`
                      ${this.renderNextPreviousButton(
                        false,
                        this.related[1]?.title,
                        `/post/${this.related[1]?.titleId}/${this.related[1]?.id}`
                      )}
                    ` : ''}
                  ${this.related[0]?.id
                    ? html`
                      ${this.renderNextPreviousButton(
                        true,
                        this.related[0]?.title,
                        `/post/${this.related[0]?.titleId}/${this.related[0]?.id}`
                      )}
                    ` : ''}
                </div>
              </div>
              <div class="additional-information ${this.isPanelOpen ? 'open' : ''}">
                <mwc-icon-button icon="close" @click=${this.handleTogglePanel}></mwc-icon-button>
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
                      <mwc-button raised label="Facebook"></mwc-button>
                      <mwc-button raised label="Twitter"></mwc-button>
                    </div>
                  </div>
                  <div class="comments">
                    <div class="mdc-typography--caption header">Bình luận</div>
                    <div class="mdc-textfield-wrapper">
                      <mwc-textarea
                        outlined
                        label="Bình luận"
                      ></mwc-textarea>
                      <mwc-button raised label="Comment"></mwc-button>
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