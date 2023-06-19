import axios from "axios"
import { useAuthContext } from "../functions/useAuthContext"
import { useEffect, useState } from "react"
import { useCartContext } from "../context/cartContext"

export const useCartProducts = () => {
  const { user } = useAuthContext()
  const [ cartItems, setCartItems ] = useState([])

  const getCartItems = async () => {
    try {
      const res = await axios(`/api/cart`, {
        headers: {
          Authorization: `Bearer ${user.data.token}`,
        },
      })
      setCartItems(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getCartItems()
  }, [user])
  return { cartItems, setCartItems, getCartItems }
}

