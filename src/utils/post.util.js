import removeMd from 'remove-markdown';
import { toURIString } from '../utils/string.util';

export const additionalField = data => {
  const rs =
    /!\[.*?\]\((.*?)\)/.exec(data.content) ||
    /<img[^>]+src=['"]([^">]+)['"]/gim.exec(data.content);
  return {
    preview: removeMd(data.content.split('\n')[0].split(' ').slice(0, 60).join(' ')) + '...',
    image: rs ? rs[1] : undefined,
    titleId: toURIString(data.title)
  };
}

export const getDate = timestamp => {
  return new Date(timestamp?.seconds * 1000);
}