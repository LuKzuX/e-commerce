import axios from "axios"
import { useAuthContext } from "../functions/useAuthContext"
import { useEffect, useState } from "react"
import { useCartContext } from "../context/cartContext"

export const useCartProducts = async () => {
  const { user } = useAuthContext()
  const { cartItems, setCartItems } = useCartContext()

  useEffect(() => {
    const getCartItems = async () => {
      try {
        const response = await axios(`/api/cart`, {
          headers: {
            Authorization: `Bearer ${user.data.token}`,
          },
        })
        console.log(response);
        setCartItems(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    getCartItems()
  }, [user])

  return { cartItems }
}
