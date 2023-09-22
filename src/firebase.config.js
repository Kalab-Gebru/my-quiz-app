import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJmNsYbA4Gunig_7Ny-Tnp6nICagvp__s",
  authDomain: "my-quiz-app-4dec8.firebaseapp.com",
  projectId: "my-quiz-app-4dec8",
  storageBucket: "my-quiz-app-4dec8.appspot.com",
  messagingSenderId: "365043831452",
  appId: "1:365043831452:web:7c68bcdfc12cd230675359",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { db, auth, googleProvider };
