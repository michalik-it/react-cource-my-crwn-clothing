import { createContext, useEffect, useState } from 'react'

export const CartContext = createContext({
  cartItems: [],
  isCartOpen: () => {},
  setIsCartOpen: null,
  addItemToCard: () => {},
  cartItemsCount: 0
})

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    setCartItemsCount(cartItems.reduce((total, item) => total + item.quantity, 0))
  }, [cartItems])

  const addCartItem = (items, productToAdd) => {
    const found = items.find(item => item.id === productToAdd.id);
    if (found) {
      return items.map(item => item.id === found.id ? { ...found, quantity: found.quantity + 1 } : item);
    }
    return [...items, { ...productToAdd, quantity: 1 }];
  }

  const addItemToCard = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd))
  }

  const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCard, cartItemsCount };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
