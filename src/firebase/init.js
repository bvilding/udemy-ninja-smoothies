import firebase from 'firebase';
import firestore from 'firebase/firestore';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCNLQeIYCWV_2b3AzBc7vlEbjXCQDPaU2Y",
  authDomain: "udemy-ninja-smoothies-44352.firebaseapp.com",
  databaseURL: "https://udemy-ninja-smoothies-44352.firebaseio.com",
  projectId: "udemy-ninja-smoothies-44352",
  storageBucket: "udemy-ninja-smoothies-44352.appspot.com",
  messagingSenderId: "416698153007"
};
const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({
  timestampsInSnapshots: true
});

//Export Firestore Database
export default firebaseApp.firestore();
