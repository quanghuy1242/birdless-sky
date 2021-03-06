import { LitElement, html, css, property, customElement, unsafeCSS, query } from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map';
import style from './app-card-item.scss';
import {
  mdcCardStyles,
  mdcTypographyStyles,
  mdcElevationStyles,
  mdcChipsStyles
} from '../../sharestyles';
import { MDCChipSet } from '@material/chips';
import { getDate } from '../../utils/post.util';
import { Router } from '@vaadin/router';

import '../Tooltip/app-tooltip';
import '@material/mwc-icon-button';
import '@material/mwc-button';
import '@material/mwc-ripple';

@customElement('app-card-item')
export class AppCardItem extends LitElement {
  @query('.mdc-chip-set') chipsetElement;

  @property({ type: String }) postId = null;
  @property({ type: String }) title = 'Bài viết số 1';
  @property({ type: String }) titleId = 'bai-viet-so-1';
  @property({ type: Object }) date = null;
  @property({ type: String }) image = undefined;
  @property({ type: String }) description = 'Preview';
  @property({ type: Array }) tags = [];
  @property({ type: Object }) category = {};

  static get styles() {
    return [
      mdcTypographyStyles,
      mdcCardStyles,
      mdcElevationStyles,
      mdcChipsStyles,
      css`${unsafeCSS(style)}`,
    ];
  }

  firstUpdated() {
    // const rippleElemnents = this.shadowRoot.querySelectorAll('.mdc-card__primary-action')
    // rippleElemnents.forEach(element => MDCRipple.attachTo(element));

    // Chip
    this.chipSet = new MDCChipSet(this.chipsetElement);
  }

  getChipTemplate() {
    return html`
      <a class="mdc-chip mdc-chip--primary">
        <span class="mdc-chip__text">${this.category.name}</span>
      </a>
      ${this.tags
        ? html`
          ${this.tags.slice(0, 3).map(tag => html`
            <a class="mdc-chip mdc-chip-outline">
              <span class="mdc-chip__text">${tag}</span>
            </a>
          `)}
          ${this.tags.length > 3
            ? html`
                <a class="mdc-chip mdc-chip-outline">
                  <span class="mdc-chip__text">+${this.tags.slice(3).length}</span>
                </a>
              `
            : ''}
          ${this.tags.length === 0
            ? html`
                <a class="mdc-chip mdc-chip-outline">
                  <span class="mdc-chip__text">No tag</span>
                </a>
              `
            : ''}
        `
        : html`
          <a class="mdc-chip mdc-chip-outline">
            <span class="mdc-chip__text">No tag</span>
          </a>
        `}
    `;
  }

  render() {
    return html`
      <div class="mdc-card card-with-header mdc-elevation--z3">
        <div class="card__primary" style=${styleMap({ paddingBottom: this.image ? '1rem' : '0.5rem' })}>
          <a
            href="/post/${this.titleId}/${this.postId}"
            class="card__title mdc-typography mdc-typography--headline6"
          >
            ${this.title}
          </a>
          <div class="mdc-chip-set">${this.getChipTemplate()}</div>
          ${this.date
            ? html`
              <h3 class="card__subtitle mdc-typography mdc-typography--subtitle2">
                ${getDate(this.date).toLocaleDateString()}
              </h3>
            `
            : html``}
        </div>
        <div
          class="mdc-card__primary-action card__primary-action"
          tabindex="0" 
        >
          ${this.image
            ? html`
              <div
                class="mdc-card__media mdc-card__media--16-9 card__media"
                style="background-image: url(&quot;${this.image}&quot;);"
              ></div>
            `
            : html``}
          <div
            class="card__secondary mdc-typography mdc-typography--body2"
            style=${styleMap({ paddingTop: this.image ? '1rem' : '0.5rem' })}
          >${this.description}</div>
          <mwc-ripple></mwc-ripple>
        </div>
        <div class="mdc-card__actions">
          <div class="mdc-card__action-buttons">
            <app-tooltip content="Read full content of this post">
              <mwc-button label="Read" @click=${() => Router.go(`/post/${this.titleId}/${this.postId}`)}></mwc-button>
            </app-tooltip>
            <app-tooltip content="Comment">
              <mwc-button label="Comment" @click=${() => Router.go(`/post/${this.titleId}/${this.postId}`)}></mwc-button>
            </app-tooltip>
          </div>
          <div class="mdc-card__action-icons">
            <app-tooltip content="Shares">
              <mwc-icon-button icon="share"></mwc-icon-button>
            </app-tooltip>
          </div>
        </div>
      </div>
    `;
  }
}