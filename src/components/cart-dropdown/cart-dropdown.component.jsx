import './cart-dropdown.styles.scss'
import Button from "../button/button.component";

const CartDropdown = ({...props}) => {
  return (
    <div className='cart-dropdown-container' {...props}>
      <div className='cart-items'>
      </div>
      <Button>GO TO CHECKOUT</Button>
    </div>
  )
}

export default CartDropdown;
