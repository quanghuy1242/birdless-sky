export const FETCH_CATEG_SUCCESS = 'FETCH_CATEG_SUCCESS';
export const FETCH_CATEG_PENDING = 'FETCH_POSTS_PENDING';

export const fetchCategoriesSuccess = categ => {
  return {
    type: FETCH_CATEG_SUCCESS,
    payload: categ
  };
}

export const fetchCategoriesPending = () => {
  return {
    type: FETCH_CATEG_SUCCESS 
  };
}