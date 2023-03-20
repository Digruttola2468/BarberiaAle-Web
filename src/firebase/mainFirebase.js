// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";

// Add Firebase products that you want to use
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js'
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js'

// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyBMjXWgHFE5adFMIoNBuhpGQw8987Y7YS4",
  authDomain: "barberiaale-rosario.firebaseapp.com",
  projectId: "barberiaale-rosario",
  storageBucket: "barberiaale-rosario.appspot.com",
  messagingSenderId: "870808433695",
  appId: "1:870808433695:web:6b03ab5e97f69a74eb112a",
  measurementId: "G-FJWZ0TD6RG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);