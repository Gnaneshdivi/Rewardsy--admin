// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDv1bdyDivwMM0_U69DDMuqTaWP4XM9eTw",
  authDomain: "rewardsy-app.firebaseapp.com",
  projectId: "rewardsy-app",
  storageBucket: "rewardsy-app.appspot.com",
  messagingSenderId: "925031745113",
  appId: "1:925031745113:web:12dbf77edb10ea9e9ad348",
  measurementId: "G-N5ZL834QBW"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };