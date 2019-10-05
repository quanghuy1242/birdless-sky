import { db } from '../../firebase';

export const FETCH_CATEG_SUCCESS = 'FETCH_CATEG_SUCCESS';
export const FETCH_CATEG_PENDING = 'FETCH_POSTS_PENDING';

const fetchCategoriesSuccess = categ => {
  return {
    type: FETCH_CATEG_SUCCESS,
    payload: categ
  };
}

const fetchCategoriesPending = () => {
  return {
    type: FETCH_CATEG_SUCCESS 
  };
}

export const fetchAllCategories = () => {
  return dispatch => {
    dispatch(fetchCategoriesPending());
    db.collection('categories')
      .orderBy('name', 'desc')
      .get()
      .then(dataSnapshot => {
        const categories = dataSnapshot.docs.map(doc => (
          { id: doc.id, ...doc.data() }
        ));
        dispatch(fetchCategoriesSuccess(categories));
      })
  }
}