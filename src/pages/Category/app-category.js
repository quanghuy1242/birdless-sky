import { LitElement, html, customElement, property, unsafeCSS, css } from 'lit-element';
import { connect, updateMetadata } from 'pwa-helpers';
import { mdcTypographyStyles } from '../../sharestyles';
import style from './app-category.scss';
import { store } from '../../store';
import { fetchAllCategories } from '../../worker/worker.instance';

import '../../components/CategoryItem/app-category-item';
import '../../components/CircularProgress/app-circular-progress';

@customElement('app-category')
export class AppCategory extends connect(store)(LitElement) {
  @property({ type: Array }) categories;
  @property({ type: Boolean }) isPending = false;

  static get styles() {
    return [
      mdcTypographyStyles,
      css`${unsafeCSS(style)}`,
    ];
  }

  stateChanged(state) {
    this.categories = state.category.categories;
    this.isPending = state.category.isPending;
  }

  firstUpdated() {
    fetchAllCategories();
  }

  updated() {
    updateMetadata({
      title: 'Categories',
      description: `Các thể loại`,
      url: window.location.href
    });
  }

  render() {
    return html`
      <div class="wrapper">
        <div class="banner">
          <div class="mdc-typography--headline2">Categories</div>
        </div>
        <div class="category-list">
          ${!this.isPending
            ? html`
              ${this.categories?.map(category => html`
                <app-category-item
                  .name=${category.name}
                  .image=${category.imgUrl}
                  .description=${category.description}
                ></app-category-item>
              `)}
            `
            : html`
              <app-circular-progress size="xlarge" center style="margin: 2rem 0"></app-circular-progress>
            `}
        </div>
      </div>
    `;
  }
}