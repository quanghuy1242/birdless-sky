import { LitElement, html, css, customElement, property, unsafeCSS } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import { md } from '../../markdown';
import { githubMarkdownStyles } from '../../sharestyles';
import highlightStyles from 'highlight.js/scss/vs.scss';

import '../Video/app-video';

@customElement('app-markdown')
export class AppMarkdown extends LitElement {
  @property({ type: String }) content = '';

  static get styles() {
    return [
      githubMarkdownStyles,
      css`${unsafeCSS(highlightStyles)}`,
    ];
  }

  render() {
    return html`
      <div class="markdown-body">
        ${unsafeHTML(md.render(this.content))}
      </div>
    `;
  }
}