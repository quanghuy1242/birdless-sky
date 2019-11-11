import { LitElement, html, property, customElement, css, unsafeCSS } from 'lit-element';
import { connect } from 'pwa-helpers';
import { store } from '../../store';
import style from './app-post-list.scss';
import { fetchNextPosts } from '../../worker/worker.instance';

import '../../components/CardItem/app-card-item';
import '../../components/CircularProgress/app-circular-progress';
import '@material/mwc-button';

@customElement('app-post-list')
export class AppPostList extends connect(store)(LitElement) {
  @property({ type: Array }) posts;
  @property({ type: Object }) lastVisible;
  @property({ type: Number }) lastCount;
  @property({ type: Boolean }) isPending;

  static get styles() {
    return [
      css`${unsafeCSS(style)}`,
    ];
  }

  stateChanged(state) {
    this.posts = state.post.posts;
    this.lastVisible = state.post.lastVisible;
    this.lastCount = state.post.lastCount;
    this.isPending = state.post.isPending;
  }

  handleLoadMore() {
    fetchNextPosts(this.lastVisible);
  }

  render() {
    return html`
      ${this.posts?.map(post => html`
        <app-card-item
          postId=${post.id}
          title=${post.title}
          titleId=${post.titleId}
          .date=${post.day}
          .image=${post.image}
          description=${post.preview}
          .tags=${post.tags}
          .category=${post.category}
        ></app-card-item>
      `)}
      ${this.isPending
        ? html`<app-circular-progress size="xlarge" center></app-circular-progress>`
        : this.lastCount
            ? html`<mwc-button label="Load more" raised @click=${this.handleLoadMore}></mwc-button>`
            : ''}
    `;
  }
}