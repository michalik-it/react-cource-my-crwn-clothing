import Button from "../button/button.component";
import { signInWithEmailPassword, signInWithGooglePopup } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import { useState } from "react";
import './sign-up-form.styles.scss'

const defaultSignInFormFields = {
  email: '',
  password: ''
}
const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultSignInFormFields);
  const { email, password } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    await logViaEmailPassword(email, password);
  }

  return (
    <div className="sign-in-container">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput type='text' required
                   label='Email'
                   autofocus="true"
                   onChange={handleChange}
                   name='email'
                   value={email}/>
        <FormInput type='password' required
                   label='Password'
                   onChange={handleChange}
                   name='password'
                   value={password}/>
        <div className="buttons-container">
          <Button type='submit'>
            Sign in
          </Button>
          <Button type="button" onClick={logViaGooglePopup} buttonType='google'>
            Google Sign in
          </Button>
        </div>
      </form>
    </div>
  )
}

const logViaGooglePopup = async () => {
  const signInResponse = await signInWithGooglePopup();
  console.log('Google sign in response:', signInResponse);
}

const logViaEmailPassword = async (email, password) => {
  const signInResponse = await signInWithEmailPassword(email, password);
  console.log('Google sign in response:', signInResponse)
};

export default SignInForm;
