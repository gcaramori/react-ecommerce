import { async } from '@firebase/util';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDMMXvyTu0APSqw68GgS5LpCdLQTNzi4bQ",
    authDomain: "crwn-db-b0d1b.firebaseapp.com",
    databaseURL: "https://crwn-db-b0d1b-default-rtdb.firebaseio.com",
    projectId: "crwn-db-b0d1b",
    storageBucket: "crwn-db-b0d1b.appspot.com",
    messagingSenderId: "1048429563765",
    appId: "1:1048429563765:web:f0c5908f453b711c9acd3c",
    measurementId: "G-58FZYV2YKK"
  };

  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
      prompt: 'select_account'
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
  
  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
      const userDocRef = doc(db, 'users', userAuth.uid);

      console.log(userDocRef);

      const userSnapshot = await getDoc(userDocRef);
      console.log(userSnapshot);
      console.log(userSnapshot.exists());
  }