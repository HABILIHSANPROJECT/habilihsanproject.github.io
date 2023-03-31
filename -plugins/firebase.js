
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js"
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-analytics.js"
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js"
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
  appId: "1:479562057640:web:432df6f60898cef2297f9d",
  measurementId: "G-LM5DS0C4KS"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const database = getDatabase(app)
localStorage.setItem(data, database)