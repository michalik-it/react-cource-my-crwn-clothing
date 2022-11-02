import { Outlet } from "react-router-dom";
import { Fragment, useContext } from "react";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CardIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../contexts/cart.context";
import { LogoContainer, NavigationContainer, NavLink, NavLinks } from './navigation.styles'

const Navigation = () => {
  const { currentUser } = useContext(UserContext)
  const { isCartOpen } = useContext(CartContext)

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/" >
          <CrwnLogo/>
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">
            SHOP
          </NavLink>
          {currentUser
            ? (<NavLink as="span" onClick={signOutUser}>
              SIGN OUT
            </NavLink>)
            : (<NavLink to="/auth">
              SIGN IN
            </NavLink>)}
          <CardIcon/>
        </NavLinks>
        {
          isCartOpen && <CartDropdown/>
        }
      </NavigationContainer>
      <Outlet/>
    </Fragment>
  )
}

export default Navigation
