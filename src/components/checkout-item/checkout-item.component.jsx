import './checkout-item.styles.scss'
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

const CheckoutItem = ({ cartItem }) => {
  const { incrementCartItemCount, decrementCartItemCount, removeCartItem } = useContext(CartContext);
  const { name, price, quantity, imageUrl } = cartItem;
  const decrement = async () => decrementCartItemCount(cartItem);
  const increment = async () => incrementCartItemCount(cartItem);
  const remove = async () => removeCartItem(cartItem);

  return (
    <div className="checkout-item-container">
      <div className="image-container"><img src={imageUrl} alt={name}/></div>
      <span className="name">{name}</span>
      <span className="quantity non-select">
        <div className="arrow pointer" onClick={decrement}>&#10094;</div>
        <span className="value">{quantity}</span>
        <div className="arrow pointer" onClick={increment}>&#10095;</div>
      </span>
      <span className="price">{price}</span>
      <div className="remove-button" onClick={remove}>&#10005;</div>
    </div>
  )
}

export default CheckoutItem;
