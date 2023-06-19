import { useEffect, useState, useContext } from "react"
import { FiPlus, FiMinus } from "react-icons/fi"
import { useAuthContext } from "../functions/useAuthContext"
import useList from "../functions/fetchHook"
import { useCartProducts } from "../functions/useCart"
const CartList = () => {

  const { totalValue } = useList("/api/")
  const [newCartList, setCartList] = useState([])
  const { cartItems, setCartItems, getCartItems } = useCartProducts()
  const [totalPrice, setTotalPrice] = useState(0)

  
  useEffect(() => {
    setCartList(totalValue)
  }, [cartItems])

  return (
    <div className='container mx-auto px-4 py-8'>
      {newCartList &&
        newCartList.map((x) => (
          <div
            className='flex items-center justify-between border border-gray-300 rounded-lg p-4 mb-4'
            key={x._id}
          >
            <div className='flex items-center'>
              <img
                src={x.image}
                alt={x.name}
                className='w-16 h-16 rounded-md object-cover mr-4'
              />
              <div>
                <p className='text-lg font-semibold'>{x.name}</p>
                <p className='text-gray-600'>${x.price * x.quantity}</p>
              </div>
            </div>
            <div className='flex items-center space-x-2'>
              <p
                className='cursor-pointer hover:text-blue-500'
                onClick={() => {
                  console.log(x._id)
                }}
              >
                <FiPlus />
              </p>
              <input
                className='w-16 h-8 bg-gray-100 text-center text-gray-800 font-semibold rounded-lg'
                type='text'
                readOnly={true}
                value={x.quantity}
              />
              <p className='cursor-pointer hover:text-red-500'>
                <FiMinus />
              </p>
            </div>
          </div>
        ))}
      <p>total: {totalPrice}</p>
    </div>
  )
}

export default CartList
