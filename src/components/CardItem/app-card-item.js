import { LitElement, html, css, property, customElement, unsafeCSS, query } from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map';
import style from './app-card-item.scss';
import {
  mdcButtonStyles,
  mdcCardStyles,
  materialIconsStyles,
  mdcTypographyStyles,
  mdcIconButtonStyles,
  mdcElevationStyles,
  mdcChipsStyles
} from '../../sharestyles';
import { MDCRipple } from '@material/ripple';
import { MDCChipSet } from '@material/chips';

import '../Tooltip/app-tooltip';

@customElement('app-card-item')
export class AppCardItem extends LitElement {
  @query('.mdc-card__media') backgroundImage;
  @query('.mdc-chip-set') chipsetElement;

  @property({ type: String }) postId = null;
  @property({ type: String }) title = 'Bài viết số 1';
  @property({ type: Object }) date = null;
  @property({ type: String }) image = undefined;
  @property({ type: String }) description = 'Preview';

  static get styles() {
    return [
      mdcTypographyStyles,
      mdcButtonStyles,
      mdcCardStyles,
      materialIconsStyles,
      mdcIconButtonStyles,
      mdcElevationStyles,
      mdcChipsStyles,
      css`${unsafeCSS(style)}`,
    ];
  }

  firstUpdated() {
    const rippleElemnents
      = this.shadowRoot.querySelectorAll('.mdc-button, .mdc-icon-button, .mdc-card__primary-action')
    rippleElemnents.forEach(element => MDCRipple.attachTo(element));

    // Chip
    this.chipSet = new MDCChipSet(this.chipsetElement);
  }

  render() {
    return html`
      <div class="mdc-card card-with-header mdc-elevation--z3">
        <div class="card__primary" style=${styleMap({ paddingBottom: this.image ? '1rem' : '0.5rem' })}>
          <h2 class="card__title mdc-typography mdc-typography--headline6">${this.title}</h2>
          <div class="mdc-chip-set">
            <a class="mdc-chip mdc-chip--primary">
              <span class="mdc-chip__text">Category</span>
            </a>
            <a class="mdc-chip mdc-chip-outline">
              <span class="mdc-chip__text">Tag 1</span>
            </a>
          </div>
          ${this.date
            ? html`
              <h3 class="card__subtitle mdc-typography mdc-typography--subtitle2">
                ${this.date.toDate().toLocaleDateString()}
              </h3>
            `
            : html``}
        </div>
        <div class="mdc-card__primary-action card__primary-action" tabindex="0">
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
        </div>
        <div class="mdc-card__actions">
          <div class="mdc-card__action-buttons">
            <button class="mdc-button mdc-card__action mdc-card__action--button">Read</button>
            <button class="mdc-button mdc-card__action mdc-card__action--button">Comment</button>
          </div>
          <div class="mdc-card__action-icons">
            <app-tooltip content="Shares">
              <button
                class="mdc-icon-button material-icons mdc-card__action mdc-card__action--icon--unbounded"
                data-mdc-ripple-is-unbounded="true"
              >
                share
              </button>
            </app-tooltip>
            <button
              class="mdc-icon-button material-icons mdc-card__action mdc-card__action--icon--unbounded"
              data-mdc-ripple-is-unbounded="true"
            >
              more_vert
            </button>
          </div>
        </div>
      </div>
    `;
  }
}