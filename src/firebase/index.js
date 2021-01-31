import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { collections, documents } from "../constants/db";

const firebaseConfig = {
  apiKey: "AIzaSyBG6IL73nhqjkyfZYVMHcFTbHTDXbbD61M",
  authDomain: "robill.firebaseapp.com",
  databaseURL: "https://robill-default-rtdb.firebaseio.com",
  projectId: "robill",
  storageBucket: "robill.appspot.com",
  messagingSenderId: "555651743759",
  appId: "1:555651743759:web:eb06ca395fe328b3c9637a",
  measurementId: "G-X47QVW8FJ1",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};
export const addEntry = async (user, x, y) => {
  console.log(user);
  try {
    await firestore.collection(collections.ENTRIES).add({
      user,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      x,
      y,
    });
    let currentCount = await getNumberOfClicks();
    await firestore
      .collection(collections.COUNT)
      .doc(documents.COUNT_ID)
      .update({ numberOfClicks: currentCount.numberOfClicks + 1 });
  } catch (error) {
    console.log(error.message);
  }
};
export const getNumberOfClicks = async () => {
  try {
    let currentCount = await firestore
      .collection(collections.COUNT)
      .doc(documents.COUNT_ID)
      .get();
    currentCount = currentCount.data();
    return currentCount;
  } catch (err) {
    console.log(err.message);
  }
};
export const login = async (email, password) => {
  try {
    await addEntry(email, 0, 0);
    await auth.signInWithEmailAndPassword(email, password);
  } catch (error) {
    return error.message;
  }
};

export const firestore = firebase.firestore();
