import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCgXcZRCuc7mpbnWCvqnDqsdaABYj31Zi8",
  authDomain: "quora-718e0.firebaseapp.com",
  projectId: "quora-718e0",
  storageBucket: "quora-718e0.appspot.com",
  messagingSenderId: "918088771769",
  appId: "1:918088771769:web:ae627076aaae101e869368"
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
const db = getFirestore(firebaseApp);

export  { auth, provider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword };
export default db;
