import { LitElement, html, property, customElement, css, unsafeCSS, query } from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map';
import { MDCRipple } from '@material/ripple';
import { mdcTypographyStyles, mdcElevationStyles, mdcRippleStyles, mdcCardStyles } from '../../sharestyles';
import style from './app-category-item.scss';

@customElement('app-category-item')
export class AppCategoriesList extends LitElement {
  @query('.mdc-card__primary-action') categoryItemElement;
  @query('.main-text') mainText;
  @query('.subtitle') subtitle;

  @property({ type: String }) name = '';
  @property({ type: String }) image = undefined;
  @property({ type: String }) description = 'Simple and Clean';

  static get styles() {
    return [
      mdcTypographyStyles,
      mdcElevationStyles,
      mdcRippleStyles,
      mdcCardStyles,
      css`${unsafeCSS(style)}`,
    ];
  }

  firstUpdated() {
    MDCRipple.attachTo(this.categoryItemElement);
  }

  handleHover() {
    this.mainText.classList.add('hover');
    this.subtitle.classList.add('show');
  }

  handleLeft() {
    this.mainText.classList.remove('hover');
    this.subtitle.classList.remove('show');
  }

  render() {
    return html`
      <a
        href="/category"
        style=${styleMap({ backgroundImage: `url(${this.image})` })}
        class="category-item-wrapper mdc-elevation--z3 mdc-card__primary-action"
        @mouseover=${this.handleHover}
        @mouseleave=${this.handleLeft}
      >
        <span class="main-text mdc-typography--headline5">${this.name}</span>
        <span class="subtitle mdc-typography--caption">${this.description.slice(0, 35) + '...'}</span>
      </a>
    `;
  }
}