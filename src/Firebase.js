import { initializeApp } from "firebase/app";
import {
 GoogleAuthProvider,
 getAuth,
 signInWithPopup,
} from "firebase/auth";
import {
 getFirestore,
 query,
 getDocs,
 collection,
 documentId,
 where,
 addDoc,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBQWJexhoJvZ6bc22Sm4oR3f2ITnb9WI6w",
    authDomain: "handong-sbd.firebaseapp.com",
    projectId: "handong-sbd",
    storageBucket: "handong-sbd.appspot.com",
    messagingSenderId: "219203628227",
    appId: "1:219203628227:web:1f4e512635d85233a28676",
    measurementId: "G-JHTVYJT08S"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    if (!user.email.includes("handong.ac.kr")) {
        return -1;
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export {
    auth,
    db,
    storage,
    signInWithGoogle,
};