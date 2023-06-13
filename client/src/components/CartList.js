import { useContext, useEffect, useState } from "react"
import { useCartContext } from "../context/cartContext"
import { useCartProducts } from "../functions/useCart"
import { ProductContext } from "../context/productContext"
import axios from "axios"

const CartList = () => {
  const {cartItems} = useCartContext()
  const [cartList, setCartList] = useState([])
  const [data, setData] = useState([])

  useEffect(() => {
    const items = []
    axios.get(`/api/`).then((res) => {
      setData(res.data.totalproducts)
      console.log(res.data);
    })
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < cartItems.length; j++) {
        if (cartItems[j].product.toString() == data[i]._id) {
          items.push(data[i])
        }
      }
    }
    setCartList(items)
  }, [cartItems])

  return (
    <div>
      {cartList && console.log(cartList)}
      {cartList &&
        cartList.map((x) => (
          <div className='' key={x._id}>
            <p>{x.name}</p>
            <p>{x.price}</p>
          </div>
        ))}
    </div>
  )
}

export default CartList
