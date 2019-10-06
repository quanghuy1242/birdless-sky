import { LitElement, html, property, customElement, css, unsafeCSS, query, queryAll } from 'lit-element';
import { connect } from 'pwa-helpers';
import { store } from '../../store';
import { fetchNextPosts } from '../../store/actions/post';
import style from './app-post-list.scss';
import { mdcButtonStyles } from '../../sharestyles';
import { MDCRipple } from '@material/ripple';

import '../../components/CardItem/app-card-item';
import '../../components/CircularProgress/app-circular-progress';

@customElement('app-post-list')
export class AppPostList extends connect(store)(LitElement) {
  @queryAll('.mdc-button') buttonMore;

  @property({ type: Array }) posts;
  @property({ type: Object }) lastVisible;
  @property({ type: Number }) lastCount;
  @property({ type: Boolean }) isPending;

  static get styles() {
    return [
      mdcButtonStyles,
      css`${unsafeCSS(style)}`,
    ];
  }

  stateChanged(state) {
    this.posts = state.post.posts;
    this.lastVisible = state.post.lastVisible;
    this.lastCount = state.post.lastCount;
    this.isPending = state.post.pending;
  }

  firstUpdated() {
    this.buttonMore.forEach(element => {
      MDCRipple.attachTo(element);
    });
  }

  handleLoadMore() {
    store.dispatch(fetchNextPosts(this.lastVisible));
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
          .tags=${post.tags}
        ></app-card-item>
      `)}
      ${this.isPending
        ? html`<app-circular-progress size="xlarge" center></app-circular-progress>`
        : this.lastCount
            ? html`
              <button
                class="mdc-button mdc-button--raised"
                @click=${this.handleLoadMore}
              >
                Load more
              </button>
            `
            : html``}
    `;
  }
}