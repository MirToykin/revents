import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage'; // для хранения фото в будущем

const firebaseConfig = {
  apiKey: "AIzaSyAsN0HFQ-b_WaKSaKUxPRw5JgdF8mD_qbo",
  authDomain: "revents-a148c.firebaseapp.com",
  databaseURL: "https://revents-a148c.firebaseio.com",
  projectId: "revents-a148c",
  storageBucket: "revents-a148c.appspot.com",
  messagingSenderId: "272603343136",
  appId: "1:272603343136:web:651ea89fe91171d3b3cf45",
  measurementId: "G-R1XFF5T5P7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;