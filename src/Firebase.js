import { initializeApp } from "firebase/app";
import {
 GoogleAuthProvider,
 getAuth,
 signInWithPopup,
 signInWithEmailAndPassword,
 createUserWithEmailAndPassword,
 sendPasswordResetEmail,
 signOut,
} from "firebase/auth";
import {
 getFirestore,
 query,
 getDocs,
 collection,
 where,
 addDoc,
} from "firebase/firestore";

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
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        nickname: null,

      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export {
    auth,
    db,
    signInWithGoogle,
};