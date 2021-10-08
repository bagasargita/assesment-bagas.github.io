import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDt-wIIAK1aqm8fC9SnyIeGssA3kBEipYk",
  authDomain: "assestment-patigeni.firebaseapp.com",
  projectId: "assestment-patigeni",
  storageBucket: "assestment-patigeni.appspot.com",
  messagingSenderId: "948831086206",
  appId: "1:948831086206:web:f084f86545cc66ca415a2f",
  measurementId: "G-V75ZT53FGJ",
};

const init = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(init);


