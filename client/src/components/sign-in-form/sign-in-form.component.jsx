import React, { useState } from "react";
import { signInWithGooglePopup,
 createUserDocumentFromAuth,signInAuthUserWithEmailandPassword } from "../../utils/firebase/firebase.utils";
import './sign-in-form.styles.scss';
import FormInput from "../form-input/form-input.component";
import Button from '../button/button.component'

const defaultFormFields = {
  
  email: "",
  password: "",
  
};
const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const {  email, password, } = formFields;

  console.log(formFields);

  const resetFormFields = () =>{
    setFormFields(defaultFormFields);
  }

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();



    try{
       const response = await signInAuthUserWithEmailandPassword(email,password);
       console.log(response)
       resetFormFields();
    }
    catch(error){
      switch(error.code){
        case 'auth/wrong-password':
          alert('Incorrect password for email')
          break;
        case 'auth/user-not-found':
          alert('no user asscoiated with this email');
          break;
        default:
          console.log(error);
      }
 
       console.log(error);
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account</h2>
      <span>Sign Up with your email and password</span>
      <form onSubmit={handleSubmit}>
        
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

       
        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
       <div className="buttons-container">
       <Button type="submit">Sign In</Button>
        <Button type='button' buttonType='google' onClick= {signInWithGoogle}>Google sign In</Button>
       </div>
        
      </form>
    </div>
  );
};

export default SignInForm;
