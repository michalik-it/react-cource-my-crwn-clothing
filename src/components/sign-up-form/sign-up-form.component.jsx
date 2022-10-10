import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-up-form.styles.scss'
import Button from "../button/button.component";

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormFields({ ...formFields, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert('passwords do not match')
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(displayName, email, password)
      await createUserDocumentFromAuth(user, {displayName});
      resetFormFields();
    } catch (e) {
      alert(e.code);
    }
  }

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  return (<div className="sign-up-container">
    <h2>Don't have an acount ?</h2>
    <span>Sign up with your email and password</span>
    <form onSubmit={handleSubmit}>
      <FormInput type="text" required label="Display name"
             onChange={handleChange} name="displayName" value={displayName}/>

      <FormInput type="email" required label="Email"
             onChange={handleChange} name="email" value={email}/>

      <FormInput type="password" required label="Password"
             onChange={handleChange} name="password" value={password}/>

      <FormInput type="password" required label="Confirm password"
             onChange={handleChange} name="confirmPassword" value={confirmPassword}/>

      <Button type='button'>Sign Up</Button>
    </form>
  </div>)
}

export default SignUpForm
