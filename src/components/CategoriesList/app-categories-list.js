import { LitElement, html, property, customElement, css, unsafeCSS } from 'lit-element';
import { connect } from 'pwa-helpers';
import { store } from '../../store';
import { fetchAllCategories } from '../../store/actions/category';
import style from './app-categories-list.scss';

import '../../components/CategoryItem/app-category-item';

@customElement('app-categories-list')
export class AppCategoriesList extends connect(store)(LitElement) {
  @property({ type: Array }) categories;

  static get styles() {
    return [
      css`${unsafeCSS(style)}`,
    ];
  }

  stateChanged(state) {
    this.categories = state.category.categories;
  }

  async firstUpdated() {
    store.dispatch(fetchAllCategories());
  }

  render() {
    return html`
      ${this.categories.map(category => html`
        <div>${category.name}</div>
      `)}
    `;
  }
}