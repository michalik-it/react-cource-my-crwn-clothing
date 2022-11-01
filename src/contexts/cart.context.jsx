import { createContext, useEffect, useState } from 'react'

export const CartContext = createContext({
  cartItems: [],
  isCartOpen: () => {},
  setIsCartOpen: null,
  addProductToCart: (productToAdd) => {},
  incrementCartItemCount: (itemToIncrement) => {},
  decrementCartItemCount: (itemToDecrement) => {},
  removeCartItem: (itemToRemove) => {},
  cartItemsCount: 0,
  totalPrice: 0
})

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setCartItemsCount(cartItems.reduce((total, item) => total + item.quantity, 0))
    setTotalPrice(cartItems.reduce((total, nextItem) => total + nextItem.quantity * nextItem.price, 0))
  }, [cartItems])

  const getItemsWithNewCartItem = (items, productToAdd) => {
    const found = items.find(item => item.id === productToAdd.id);
    if (found) {
      return items.map(item => item.id === found.id ? { ...found, quantity: found.quantity + 1 } : item);
    }
    return [...items, { ...productToAdd, quantity: 1 }];
  }

  const addProductToCart = (productToAdd) => {
    setCartItems(getItemsWithNewCartItem(cartItems, productToAdd))
  }

  const incrementCartItemCount = (itemToIncrement) => {
    setCartItems(cartItems.map(item => item.id === itemToIncrement.id ? {
      ...item,
      quantity: item.quantity + 1
    } : item));
  }

  const decrementCartItemCount = (itemToDecrement) => {
    setCartItems(cartItems.map(item => item.id === itemToDecrement.id ? {
      ...item,
      quantity: item.quantity > 1 ? item.quantity - 1 : 1
    } : item));
  }

  const removeCartItem = (itemToRemove) => {
    setCartItems(
      cartItems.filter(item => item.id !== itemToRemove.id));
  }

  const value = {
    isCartOpen, cartItems, cartItemsCount, totalPrice,
    setIsCartOpen, addProductToCart, incrementCartItemCount, decrementCartItemCount, removeCartItem
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
