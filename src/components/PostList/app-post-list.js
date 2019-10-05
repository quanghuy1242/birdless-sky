import { LitElement, html, property, customElement, css, unsafeCSS, query, queryAll } from 'lit-element';
import { connect } from 'pwa-helpers';
import { store } from '../../store';
import { fetchAllPosts } from '../../store/actions/post';
import style from './app-post-list.scss';
import { mdcButtonStyles } from '../../sharestyles';

import '../../components/CardItem/app-card-item';
import { MDCRipple } from '@material/ripple';

@customElement('app-post-list')
export class AppPostList extends connect(store)(LitElement) {
  @queryAll('.mdc-button') buttonMore;

  @property({ type: Array }) posts;

  static get styles() {
    return [
      mdcButtonStyles,
      css`${unsafeCSS(style)}`,
    ];
  }

  stateChanged(state) {
    this.posts = state.post.posts;
  }

  firstUpdated() {
    this.buttonMore.forEach(element => {
      MDCRipple.attachTo(element);
    });
    store.dispatch(fetchAllPosts());
  }

  render() {
    return html`
      ${this.posts.map(post => html`
        <app-card-item
          postId=${post.id}
          title=${post.title}
          .date=${post.day}
          .image=${post.image}
          description=${post.preview}
        ></app-card-item>
      `)}
      <button class="mdc-button mdc-button--raised">Load more</button>
    `;
  }
}