import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore';

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

export const db = getFirestore();

export const createUserDocumentFromAuth = async(userAuth)=>{
  const userDocRef = doc(db,'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  
  //if user data does not exist
  if(!userSnapshot.exists()){
    const {displayName,email} = userAuth;
    const createdAt = new Date();
    
    try {
      await setDoc(userDocRef,{
        displayName,email,createdAt
      })
    } catch (error) {
      console.log("error creating user ",error.message);
    }
  }
  return userDocRef;
}