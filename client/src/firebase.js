import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// import firebase from "firebase/app";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDJRlVks_MrnkTFjI8tREvZxiCtPsu4FxM",
  authDomain: "social-media-fcc95.firebaseapp.com",
  projectId: "social-media-fcc95",
  storageBucket: "social-media-fcc95.appspot.com",
  messagingSenderId: "591011191931",
  appId: "1:591011191931:web:d4e1a0c55c50db6dbf96de",
  measurementId: "G-6BVE0TFYJ6",
};

firebase.initializeApp(firebaseConfig);
// const storage = firebase.storage();
const storage = firebase.storage();
export default storage;
