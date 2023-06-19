import { createContext, useState, useContext } from "react"

export const CartContext = createContext()

export const useCartContext = () => {
  const context = useCartContext(CartContext)
  return context
}

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  )
}
