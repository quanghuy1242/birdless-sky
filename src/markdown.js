import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';

export const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {
        console.log(__);
      }
    }
    return '';
  }
});