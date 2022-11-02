// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";

import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth'

import { collection, doc, getDoc, getDocs, getFirestore, query, setDoc } from "firebase/firestore";

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
initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();

export const signInWithGooglePopup = async () => {
  const signInResponse = await signInWithPopup(auth, provider);
  await createdUserDocumentIfDoesNotExist(signInResponse.user)
  return signInResponse;
}

export const signInWithEmailPassword = async (email, password) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    alert(e.code);
  }
}

export const signOutUser = async () => signOut(auth)

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)

export const db = getFirestore()

/* One time load data */
/*export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);
  objectsToAdd.forEach(object => {
    // batch.set(object)
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  })
  await batch.commit();
}*/

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);
  const querySnapshots = await getDocs(q);
  const categoryMapWithTitleAsKey = querySnapshots.docs.reduce((acc, docSnapshot) => {
    const {title, items} = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});
  return categoryMapWithTitleAsKey;
}

export const createAuthUserWithEmailAndPassword = async (displayName, email, password) => {
  if (!email || !password) return;
  const signUpResponse = await createUserWithEmailAndPassword(auth, email, password);
  await createdUserDocumentIfDoesNotExist(signUpResponse.user, { displayName })
  return signUpResponse;
}

export const createdUserDocumentIfDoesNotExist = async (userAuth, additionalInformation = {}) => {
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
