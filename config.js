// Import the functions you need from the SDKs you need
import * as firebase from "firebase"
require("@firebase/firestore")
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0LCaFX_eI-n8EAhx6i7DN3K5XeEJeY_w",
  authDomain: "wily1-de143.firebaseapp.com",
  projectId: "wily1-de143",
  storageBucket: "wily1-de143.appspot.com",
  messagingSenderId: "48760965791",
  appId: "1:48760965791:web:0676875bef78d43ab7f0aa"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
export default firebase.firestore()