import './product-card.styles.scss'
import Button from "../button/button.component";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

const ProductCard = ({ product }) => {
  const { addItemToCard } = useContext(CartContext);
  const { name, price, imageUrl } = product;
  const addToCart = async () => {
    addItemToCard(product);
  };
  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={name}/>
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType='inverted' onClick={addToCart}>Add to card</Button>
    </div>
  )
}

export default ProductCard;
