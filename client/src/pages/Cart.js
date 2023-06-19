import { useEffect, useState } from "react"
import { useAuthContext } from "../functions/useAuthContext"
import axios from "axios"
import { Link } from "react-router-dom"
import CartList from "../components/CartList"
import { useCartProducts } from "../functions/useCart"

const Cart = () => {
  return (
    <div className='mt-20'>
     {<CartList/>}
    </div>
  )
}

export default Cart
