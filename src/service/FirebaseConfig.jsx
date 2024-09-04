// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDzuuD5pBvnswu0SWYGfk_-PJM-J4gXCM",
  authDomain: "ai-trip-planner-15d93.firebaseapp.com",
  projectId: "ai-trip-planner-15d93",
  storageBucket: "ai-trip-planner-15d93.appspot.com",
  messagingSenderId: "553526186206",
  appId: "1:553526186206:web:ae81684a79fcd1b06db24f",
  measurementId: "G-32GYFEFGXB"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore()