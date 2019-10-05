import { db } from '../../firebase';

export const getDataFromServer = async () => {
  const dataSnapshot = await db.collection('conf').get();
  return dataSnapshot.docs.map(doc => doc.data())[0];
}