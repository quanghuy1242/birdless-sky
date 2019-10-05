import { getConfigFromServer } from '../api/conf.api';

export const SETBANNERDATA = 'SETBANNERDATA';

export const getConfig = async () => {
  const data = await getConfigFromServer();
  return {
    type: SETBANNERDATA,
    payload: {
      name: data.mainTitle,
      slogan: data.slogan,
      image: data.homeImageUrl
    }
  }
}