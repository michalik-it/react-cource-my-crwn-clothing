import { BaseButton, GoogleSignInButton, InvertedButton } from "./button.styles";

export const BUTTON_TYPE_CLASSES = {
  base: 'base',
  google: 'google-sign-in',
  inverted: 'inverted'
}

const getButtonType = (buttonType = BUTTON_TYPE_CLASSES.base) => (
  {
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
  }[buttonType]);


const Button = ({ children, buttonType, ...otherOptions }) => {
  const CustomButton = getButtonType(buttonType);
  return (
    <CustomButton {...otherOptions}>
      {children}
    </CustomButton>
  )
}

export default Button;
