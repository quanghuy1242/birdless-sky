import { db } from '../../firebase';

export const getAllPostsFromServer = async () => {
  const dataSnapshot = await db.collection('blogs').get();
  console.log('1');
  return dataSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}