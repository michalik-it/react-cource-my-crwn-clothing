// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword
} from 'firebase/auth'

import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrb0BYOK7dP_qV8cTnfkuxmVzFPrrbf2s",
  authDomain: "react-course-crwn-db-b6f3a.firebaseapp.com",
  projectId: "react-course-crwn-db-b6f3a",
  storageBucket: "react-course-crwn-db-b6f3a.appspot.com",
  messagingSenderId: "397854688840",
  appId: "1:397854688840:web:0f7975a864ec26ce053a7d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  const { displayName, email } = userAuth;
  const createdAt = new Date();
  const lastLoginAt = new Date();

  if (!userSnapshot.exists()) {
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        lastLoginAt,
        ...additionalInformation
      })
    } catch (e) {
      console.log('error creating user', e.message)
    }
  }

  return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (displayName, email, password) => {
  if (!email || !password) return;
  return createUserWithEmailAndPassword(auth, email, password)
}
