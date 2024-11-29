// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFw_c2Aq0sxcmAyrXmde3EEnmeRFDK5uk",
  authDomain: "salamualaikum-a0b9b.firebaseapp.com",
  projectId: "salamualaikum-a0b9b",
  storageBucket: "salamualaikum-a0b9b.firebasestorage.app",
  messagingSenderId: "327016023871",
  appId: "1:327016023871:web:02b61271137785c233b58a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;