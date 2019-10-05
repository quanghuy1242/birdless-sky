import { db } from '../../firebase';

export const getConfigFromServer = async () => {
  const dataSnapshot = await db.collection('conf').get();
  return dataSnapshot.docs.map(doc => doc.data())[0];
}