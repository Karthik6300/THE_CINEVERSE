import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import {
  getAuth,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMZicbYVt58-m1loVuzn7u3hczihHzTM0",
  authDomain: "the-cineverse.firebaseapp.com",
  projectId: "the-cineverse",
  storageBucket: "the-cineverse.appspot.com",
  messagingSenderId: "385903573349",
  appId: "1:385903573349:web:47eb230db250f6534d498c",
  measurementId: "G-93RP49NWWF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export {
  auth,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
};
