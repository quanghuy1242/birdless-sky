import { getDataFromServer } from '../api/conf.api';

export const SETBANNERDATA = 'SETBANNERDATA';

export const getData = async () => {
  const data = await getDataFromServer();
  return {
    type: SETBANNERDATA,
    payload: {
      name: data.mainTitle,
      slogan: data.slogan,
      image: data.homeImageUrl
    }
  }
}