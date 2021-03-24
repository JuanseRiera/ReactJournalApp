import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDqD9JlIYRqJW3Fbmv84lLycWY7719GrUQ",
  authDomain: "appsreact-9c74a.firebaseapp.com",
  projectId: "appsreact-9c74a",
  storageBucket: "appsreact-9c74a.appspot.com",
  messagingSenderId: "512041971104",
  appId: "1:512041971104:web:81d575c20355bc9bce48c5",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuth = new firebase.auth.GoogleAuthProvider();

export { db, googleAuth, firebase };
