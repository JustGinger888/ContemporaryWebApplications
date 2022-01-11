// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
import firebase from "firebase/app";
import "firebase/functions";
import "firebase/storage";
import {
  getAuth,
  signOut,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { getFirestore, updateDoc } from "firebase/firestore";
import { async } from "@firebase/util";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  onSnapshot,
  Timestamp,
  addDoc
} from "firebase/firestore";



import { doc, getDoc, setDoc } from "firebase/firestore";

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
  measurementId: "G-XB7TC9H3Q2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export const auth = getAuth();
export const firestore = getFirestore();
//export const storage = firebase.storage();

export const googleAuthProvider = new GoogleAuthProvider();
export const githubAuthProvider = new GithubAuthProvider();

export async function getEstablishments(params) {
  const q = query(
    collection(firestore, "establishment"),
    where("uni", "==", "Solent")
  );

  let array = [];

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    //console.log(doc.id, " => ", doc.data());
    array.push(doc.data());
  });
  return array;
}

export async function getEstablishment(id) {
  const docRef = doc(firestore, "establishment", id);

  const docSnap = await getDoc(docRef);

  let array = [];

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    array.push(docSnap.data());
  }
  return array;
}

export async function getMenu(id) {
  const q = query(collection(firestore, "establishment", id, "menu"));

  let array = [];

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    //console.log(doc.id, " => ", doc.data());
    array.push(doc.data());
  });
  return array;
}

export async function getUserById(user) {
  const docRef = doc(firestore, "users", user.uid);

  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    await setDoc(doc(firestore, "users", user.uid), {
      name: user.displayName,
      email: user.email,
      number: user.phoneNumber,
      url: user.photoURL,
    });
  }
}

export async function getUserByUid(uid) {
  const docRef = doc(firestore, "users", uid);

  const docSnap = await getDoc(docRef);

  let array = [];

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    array = docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }

  return array;
}

export async function getUserOrders(uid) {
  const orders = [];

  const q = query(
    collection(firestore, "users", uid, "orders"),
    orderBy("_created")
  );
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const cities = [];
    querySnapshot.forEach((doc) => {
        cities.push(doc.data().name);
    });
    console.log("Current cities in CA: ", cities.join(", "));
  });

  return unsubscribe;
}

export async function setUserCart(uid, items, total, session) {
  const docRef = doc(firestore, "users", uid);

  const colRef = collection(docRef, 'orders')

  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());

    await addDoc(colRef, {
      _created: Timestamp.now(),
      name: 'order',
      status: 'Attempted',
      total: total,
      items: items,
      session: session
    });
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}

export async function updateUserDoc(uid, name, number) {
  const docRef = doc(firestore, "users", uid);



  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    await updateDoc(docRef, {
      name: name,
      number: number,
    });
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}

