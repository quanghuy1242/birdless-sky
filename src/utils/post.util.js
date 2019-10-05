import removeMd from 'remove-markdown';

export const additionalField = data => {
  const rs =
    /!\[.*?\]\((.*?)\)/.exec(data.content) ||
    /<img[^>]+src=['"]([^">]+)['"]/gim.exec(data.content);
  return {
    preview: removeMd(data.content.split('\n')[0].split(' ').slice(0, 60).join(' ')) + '...',
    image: rs ? rs[1] : undefined
  };
}