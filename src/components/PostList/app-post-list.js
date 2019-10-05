import { LitElement, html, property, customElement, css, unsafeCSS } from 'lit-element';
import { connect } from 'pwa-helpers';
import { store } from '../../store';
import { fetchAllPosts } from '../../store/actions/post';
import style from './app-post-list.scss';

import '../../components/CardItem/app-card-item';

@customElement('app-post-list')
export class AppPostList extends connect(store)(LitElement) {
  @property({ type: Array }) posts;

  static get styles() {
    return [
      css`${unsafeCSS(style)}`,
    ];
  }

  stateChanged(state) {
    this.posts = state.post.posts;
  }

  firstUpdated() {
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
    `;
  }
}