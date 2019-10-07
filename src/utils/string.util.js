// Xoá dấu tiếng việt
export const removeAccents = str => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// nối thành chuỗi url giống như id
export const toURIString = str => {
  return [
    ...new Set(
      removeAccents(str)
        .replace(/\s/g, '-')
        .replace(/[^a-zA-Z0-9-]/g, '')
        .split('-')
    )
  ]
    .filter(word => word !== '')
    .join('-')
    .toLowerCase();
};