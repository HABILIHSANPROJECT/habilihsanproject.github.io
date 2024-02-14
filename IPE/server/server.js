
// Chart
import axios from "axios"
import { initializeApp } from "firebase/app"

const firebaseConfig = {
  apiKey: "AIzaSyCihh4EWt7zm3cBRqUd5q12qaNa0gk2Gwc",
  authDomain: "ipe2024.firebaseapp.com",
  projectId: "ipe2024",
  storageBucket: "ipe2024.appspot.com",
  messagingSenderId: "408874586451",
  appId: "1:408874586451:web:a5dc883a3aee02298751a6",
  measurementId: "G-85DPGE1T0D"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
axios.get("https://kawalpemilu.org/h").then((res) => {
    const pemilu = res.data

    const parser = new DOMParser()
    const html = parser.parseFromString(pemilu, "text/html")
    const suara01 = html.querySelectorAll("span")[252].innerText
    const suara02 = html.querySelectorAll("span")[254].innerText
    const suara03 = html.querySelectorAll("span")[256].innerText

    const data = app.firestore().collection("IPE2024").doc("quick-count")
    data.update({ paslon01 : suara01 }, { paslon02 : suara02 }, { paslon03 : suara03 })
    .then(() => {
                console.log("JALAN")
            })
    })
