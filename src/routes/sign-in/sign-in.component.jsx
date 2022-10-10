import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils'
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import Button from "../../components/button/button.component";

const SignIn = () => {
  const logGoogleUserPopup = async () => {
    const signInResponse = await signInWithGooglePopup();
    console.log('signInResponse:', signInResponse);
    const userDocRef = await createUserDocumentFromAuth(signInResponse.user);
    console.log('created userDocRef:', userDocRef);
  }

  return (
    <div>
      <h1>Sign-in page</h1>
      <Button onClick={logGoogleUserPopup} buttonType='google'>
        Sign in with Google
      </Button>
      <SignUpForm />
    </div>
  )
}

export default SignIn;
