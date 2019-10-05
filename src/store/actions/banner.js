import { db } from '../../firebase';

export const FETCH_CONFIG_SUCCESS = 'SETBANNERDATA';

const fetchConfigSuccess = config => {
  return {
    type: FETCH_CONFIG_SUCCESS,
    payload: { ...config }
  };
}

export const fetchConfig = () => {
  return dispatch => {
    db.collection('conf')
      .get()
      .then(dataSnapshot => {
        const rawData = dataSnapshot.docs.map(doc => doc.data())[0];
        const config = {
          name: rawData.mainTitle,
          slogan: rawData.slogan,
          image: rawData.homeImageUrl
        }
        dispatch(fetchConfigSuccess(config));
      })
  }
}