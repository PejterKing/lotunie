import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC7jQjb9ftrkznT8Zt1Ldh--lf_DEC7Iwg",
  authDomain: "lotunie.firebaseapp.com",
  projectId: "lotunie",
  storageBucket: "lotunie.appspot.com",
  messagingSenderId: "993248831526",
  appId: "1:993248831526:web:1ad879fcf3a2bb5ed11ee7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
