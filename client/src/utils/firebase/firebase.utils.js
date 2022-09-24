import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBZ9RzsC_6kyUW2mnbYu_uxrnQBgFB2Nz0",
  authDomain: "shpkart-db.firebaseapp.com",
  projectId: "shpkart-db",
  storageBucket: "shpkart-db.appspot.com",
  messagingSenderId: "1084670132258",
  appId: "1:1084670132258:web:d97dabadda618f8e65ca7b",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth,provider)