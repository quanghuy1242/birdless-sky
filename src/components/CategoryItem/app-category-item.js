import { LitElement, html, property, customElement, css, unsafeCSS, query } from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map';
import { MDCRipple } from '@material/ripple';
import { mdcTypographyStyles, mdcElevationStyles, mdcRippleStyles, mdcCardStyles } from '../../sharestyles';
import style from './app-category-item.scss';

@customElement('app-category-item')
export class AppCategoriesList extends LitElement {
  @query('.mdc-card__primary-action') categoryItemElement
  @property({ type: String }) name = '';
  @property({ type: String }) image = undefined;

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

  render() {
    return html`
      <a
        href="/category"
        style=${styleMap({ backgroundImage: `url(${this.image})` })}
        class="category-item-wrapper mdc-elevation--z3 mdc-card__primary-action"
      >
        <span class="mdc-typography--headline5">${this.name}</span>
      </a>
    `;
  }
}