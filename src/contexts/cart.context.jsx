import { createContext, useEffect, useReducer } from 'react'

export const CartContext = createContext({
  cartItems: [],
  isCartOpen: false,
  cartItemsCount: 0,
  totalPrice: 0,
  setIsCartOpen: () => {},
  addProductToCart: (productToAdd) => {},
  incrementCartItemCount: (itemToIncrement) => {},
  decrementCartItemCount: (itemToDecrement) => {},
  removeCartItem: (itemToRemove) => {}
})

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS', SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
}

const cartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state, ...payload
      };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state, isCartOpen: payload
      };
    default:
      throw new Error(`Invalid type ${action} in cartReducer`)
  }
}

const INITIAL_STATE = {
  cartItems: [], isCartOpen: false, cartItemsCount: 0, totalPrice: 0
}

export const CartProvider = ({ children }) => {
  // const [cartItems, setCartItems] = useState([]);
  // const [isCartOpen, setIsCartOpen] = useState(false);
  // const [cartItemsCount, setCartItemsCount] = useState(0);
  // const [totalPrice, setTotalPrice] = useState(0);

  // useEffect(() => {
    // setCartItemsCount(cartItems.reduce((total, item) => total + item.quantity, 0))
    // setTotalPrice(cartItems.reduce((total, nextItem) => total + nextItem.quantity * nextItem.price, 0))
  // }, [cartItems])

  const [{ cartItems, isCartOpen, cartItemsCount, totalPrice }, dispatch] = useReducer(cartReducer, INITIAL_STATE);

  const updateCartItemReducer = (newCartItems) => {
    const newTotalPrice = newCartItems.reduce((total, nextItem) => total + nextItem.quantity * nextItem.price, 0);
    const newCartItemsCount = newCartItems.reduce((total, item) => total + item.quantity, 0);
    dispatch({
      type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: {
        cartItems: newCartItems, cartItemsCount: newCartItemsCount, totalPrice: newTotalPrice
      }
    })
  }

  const addProductToCartAsItem = (items, productToAdd) => {
    const found = items.find(item => item.id === productToAdd.id);
    if (found) {
      return items.map(item => item.id === found.id ? { ...found, quantity: found.quantity + 1 } : item);
    }
    return [...items, { ...productToAdd, quantity: 1 }];
  }

  const addProductToCart = (productToAdd) => {
    const newCartItems = addProductToCartAsItem(cartItems, productToAdd);
    updateCartItemReducer(newCartItems);
  }

  const incrementCartItemCount = (itemToIncrement) => {
    const newCartItems = cartItems.map(item => item.id === itemToIncrement.id ? {
      ...item, quantity: item.quantity + 1
    } : item);
    updateCartItemReducer(newCartItems);
  }

  const decrementCartItemCount = (itemToDecrement) => {
    const newCartItems = cartItems.map(item => item.id === itemToDecrement.id ? {
      ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1
    } : item);
    updateCartItemReducer(newCartItems);
  }

  const removeCartItem = (itemToRemove) => {
    const newCartItems = cartItems.filter(item => item.id !== itemToRemove.id);
    updateCartItemReducer(newCartItems);
  }

  const setIsCartOpen = (value) => {
    dispatch({ type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload: value })
  }

  const value = {
    isCartOpen,
    cartItems,
    cartItemsCount,
    totalPrice,
    setIsCartOpen,
    addProductToCart,
    incrementCartItemCount,
    decrementCartItemCount,
    removeCartItem
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
