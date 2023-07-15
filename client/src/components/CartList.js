import { useEffect, useState } from "react"
import { useCartProducts } from "../functions/useCart"
import { useAuthContext } from "../functions/useAuthContext"
import { Link } from "react-router-dom"
import axios from "axios"
const CartList = () => {
  const { user } = useAuthContext()
  const { cartItems, setCartItems, getCartItems } = useCartProducts()
  const [totalPrice, setTotalPrice] = useState(0)

  const handleAdd = async (id, quantity) => {
    try {
      await axios.post(
        "/api/" + id,
        { quantity },
        {
          headers: {
            Authorization: `Bearer ${user.data.token}`,
          },
        }
      )
      const mapped = cartItems.map((item) => {
        return {...item, quantity}
      })
      setCartItems(mapped)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/cart/` + id, {
        headers: {
          Authorization: `Bearer ${user.data.token}`,
        },
      });
      const updatedCartItems = cartItems.filter((item) => item._id !== id);
      setCartItems(updatedCartItems);
    } catch (error) {
      console.log(error);
    }
  };
  

  useEffect(() => {
    calculateTotalPrice()
  }, [cartItems, setCartItems])

  const calculateTotalPrice = () => {
    if (cartItems) {
      let total = 0
      cartItems.forEach((item) => {
        total += item.product.price * item.quantity
      })
      setTotalPrice(total)
    }
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h2 className='text-2xl font-semibold mb-6'>Your Cart</h2>
      {cartItems &&
        cartItems.map((x) => (
          <div
            className='flex items-center justify-between border border-gray-300 rounded-lg p-4 mb-4'
            key={x.product._id}
          >
            <Link to={`/product-details/${x.product._id}`}>
              <div className='flex items-center'>
                <img
                  src={x.product.image}
                  alt={x.product.image}
                  className='w-16 h-16 rounded-md object-cover mr-4'
                />
                <div>
                  <p className='text-lg font-semibold'>{x.product.name}</p>
                  <p className='text-gray-600'>
                    ${x.product.price * x.quantity}
                  </p>
                </div>
              </div>
            </Link>
            <div className='flex items-center space-x-2'>
              <select
                className='w-16 h-8 bg-gray-100 text-center text-gray-800 font-semibold rounded-lg'
                type='text'
                onChange={(e) => {
                  handleAdd(x.product._id, e.target.value)
                }}
              >
                <option value={x.quantity}>{x.quantity}</option>
                <option value={1}>{1}</option>
                <option value={2}>{2}</option>
                <option value={3}>{3}</option>
                <option value={4}>{4}</option>
                <option value={5}>{5}</option>
              </select>
              <button
                className='px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300'
                onClick={() => {
                  handleDelete(x._id)
                }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      <p className='text-xl font-semibold mt-6'>Total Price: ${totalPrice}</p>
      <button className='mt-8 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300'>
        Proceed to Checkout
      </button>
    </div>
  )
}

export default CartList
