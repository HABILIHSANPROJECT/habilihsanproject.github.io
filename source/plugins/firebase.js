
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js"
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-analytics.js"
import { getDatabase, ref, child, get } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSDIWEIdJuA2Z3tVC8fIS8eFvRG8HkXwQ",
  authDomain: "habilihsanproject13.firebaseapp.com",
  databaseURL: "https://habilihsanproject13.firebaseio.com",
  projectId: "habilihsanproject13",
  storageBucket: "habilihsanproject13.appspot.com",
  messagingSenderId: "479562057640",
  appId: "1:479562057640:web:a54a0e0d98ac0cd4297f9d",
  measurementId: "G-JMGPWZ8REQ"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const analytics = getAnalytics(app)
export const database = getDatabase(app)
