// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDi27cqnX35zDzo7_134NVrPm6Zn7nZG1M",
  authDomain: "bettertwitter-5e352.firebaseapp.com",
  databaseURL:
    "https://bettertwitter-5e352-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "bettertwitter-5e352",
  storageBucket: "bettertwitter-5e352.appspot.com",
  messagingSenderId: "400240054554",
  appId: "1:400240054554:web:86b51d2da17b9ced209ca3",
  databaseURL:
    "https://bettertwitter-5e352-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
const database = getDatabase(app);
