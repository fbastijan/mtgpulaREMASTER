// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJ7T4T1QIhsrIiDhvyqQOab1muRq5KrzI",
  authDomain: "mtgpula.firebaseapp.com",
  projectId: "mtgpula",
  storageBucket: "mtgpula.appspot.com",
  messagingSenderId: "1080749168656",
  appId: "1:1080749168656:web:167f60eef86e41492ed295",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { db, auth };
