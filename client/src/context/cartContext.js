import { createContext, useState, useEffect, useContext } from "react"


export const CartContext = createContext()

export const useCartContext = () => useContext(CartContext)

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  return (
    <CartContext.Provider value={{cartItems, setCartItems}}>
      {children}
    </CartContext.Provider>
  )
}
