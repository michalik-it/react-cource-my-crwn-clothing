import './cart-icon.styles.scss'
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

const CardIcon = ({ ...props }) => {
  const { isCartOpen, setIsCartOpen, cartItemsCount } = useContext(CartContext)
  const toggleCartDropdown = async () => {
    setIsCartOpen(!isCartOpen);
  };
  return (
    <div className="cart-icon-container" {...props} onClick={toggleCartDropdown}>
      <ShoppingIcon className="shopping-icon"/>
      <span className="item-count non-select">{cartItemsCount}</span>
    </div>
  )
}

export default CardIcon;
