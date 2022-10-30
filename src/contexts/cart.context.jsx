import { createContext, useState } from 'react'

export const CartContext = createContext({
  products: [],
  open: false,
  setProducts: null,
  setOpen: null,
})

export const CartProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const value = { products, open, setProducts, setOpen };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
