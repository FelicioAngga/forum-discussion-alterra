import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDrFwWd_VsMfh1d3d20D91p1GEUVRk23w0",
  authDomain: "forum-discussion-alterra.firebaseapp.com",
  projectId: "forum-discussion-alterra",
  storageBucket: "forum-discussion-alterra.appspot.com",
  messagingSenderId: "347285579048",
  appId: "1:347285579048:web:01150ce76eaf6dad021c1d",
  measurementId: "G-FVCRVS8BCF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();

export default { app, db, auth, provider, storage }