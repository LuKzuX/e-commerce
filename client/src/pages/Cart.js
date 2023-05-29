import { useEffect } from "react"
import { useAuthContext } from "../functions/useAuthContext"

const Cart = () => {
  const { user } = useAuthContext()
  return <div className='w-11/12 mx-auto mt-20'>
    {!user && <p>login pls</p>}
    {user && <p>u are in te cart page</p>}
  </div>
}

export default Cart
