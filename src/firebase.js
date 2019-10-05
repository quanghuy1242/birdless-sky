import firebase from 'firebase/app';
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyBHb0GaJ-TEgHZ3iwJrMLQ0_wwXPzX_2g4",
  authDomain: "blog-1f85f.firebaseapp.com",
  databaseURL: "https://blog-1f85f.firebaseio.com",
  projectId: "blog-1f85f",
  storageBucket: "blog-1f85f.appspot.com",
  messagingSenderId: "498507894826",
  appId: "1:498507894826:web:7ca618f2172b0997f2b353"
});

export const db = firebase.firestore();