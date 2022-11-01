import './cart-dropdown.styles.scss'
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import { Link, useNavigate } from "react-router-dom";

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
    <div className='cart-dropdown-container' {...props}>
      <div className='cart-items'>
        {cartItems.map(item => <CartItem key={item.id} cartItem={item}/>)}
      </div>
      <Button onClick={navigateToCheckout}>GO TO CHECKOUT</Button>
    </div>
  )
}

export default CartDropdown;
