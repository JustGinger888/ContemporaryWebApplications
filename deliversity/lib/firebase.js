// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";
import { getAuth, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";


// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgrYjk0b0BCjSN8uAjf_BYcpZTZwoXihU",
  authDomain: "deliversity-b5dc6.firebaseapp.com",
  projectId: "deliversity-b5dc6",
  storageBucket: "deliversity-b5dc6.appspot.com",
  messagingSenderId: "189296796620",
  appId: "1:189296796620:web:4e7ddc97b2f40c2e327369",
  measurementId: "G-XB7TC9H3Q2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
//export const firestore = firebase.firestore();
//export const storage = firebase.storage();

export const googleAuthProvider = new GoogleAuthProvider();
