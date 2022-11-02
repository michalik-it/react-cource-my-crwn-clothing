import './cart-dropdown.styles.jsx'
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import { useNavigate } from "react-router-dom";
import { CartDropdownContainer } from "./cart-dropdown.styles";

const CartDropdown = ({ ...props }) => {
  const { cartItems, setIsCartOpen } = useContext(CartContext);

  const hideCart = () => {
    setIsCartOpen(false);
  };

  const navigate = useNavigate();

  const navigateToCheckout = async () => {
    hideCart();
    navigate('/checkout');
  }

  return (
    <CartDropdownContainer {...props}>
      <div className='cart-items'>
        {
          cartItems.length
            ? cartItems.map(item => <CartItem key={item.id} cartItem={item}/>)
            : <span className="empty-message">The cart is empty</span>
        }
      </div>
      <Button onClick={navigateToCheckout}>GO TO CHECKOUT</Button>
    </CartDropdownContainer>
  )
}

export default CartDropdown;
