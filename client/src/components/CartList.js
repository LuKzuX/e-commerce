import { useEffect, useState } from "react"
import { useCartContext } from "../context/cartContext"
import axios from "axios"
import { FiPlus, FiMinus } from "react-icons/fi"
import { useAuthContext } from "../functions/useAuthContext"

const CartList = () => {
  const { user } = useAuthContext()
  const { cartItems } = useCartContext()
  const [cartList, setCartList] = useState([])
  const [data, setData] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  axios.get(`/api/`).then((res) => {
    setData(res.data.totalproducts)
  })

  useEffect(() => {
    const items = []
    let totalPrice = 0
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < cartItems.length; j++) {
        if (cartItems[j].product.toString() === data[i]._id) {
          items.push(data[i])
        }
      }
    }
    for (let i = 0; i < cartItems.length; i++) {
      if (items[i]) {
        items[i].quantity = cartItems[i].quantity
        totalPrice += (items[i].price * items[i].quantity)
      }
    }

    setCartList(items)
    setTotalPrice(totalPrice)
  }, [cartItems])

  const handleAdd = async (id) => {
    try {
      const res = await axios.post(`/api/` + id, "", {
        headers: {
          Authorization: `Bearer ${user.data.token}`,
        },
        
      })
      console.log(res);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      {cartList &&
        cartList.map((x) => (
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
                  handleAdd(x._id)
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
  );
  
}

export default CartList
