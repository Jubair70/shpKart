import React,{ useEffect }  from "react";
import { getRedirectResult } from "firebase/auth";
import {
    auth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
const SignIn = () => {
    useEffect(()=>{
        async function fetchData() {
            // You can await here
            const response = await getRedirectResult(auth);
            console.log(response);
            if(response){
                const userDocRef = await createUserDocumentFromAuth(response.user);
            }
          }
          fetchData();
        
    },[])


  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign In with Google Pop-up</button>
      <button onClick={signInWithGoogleRedirect}>Sign In with Google Redirect</button>
    </div>
  );
};
export default SignIn;
