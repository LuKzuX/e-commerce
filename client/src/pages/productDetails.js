import axios from "axios"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

const ProductDetails = () => {
  const { id } = useParams()
  const [data, setData] = useState("")
  const [error, setError] = useState("")

  const checkProductQuantity = (quantity) => {
    if (quantity < 100) {
      return "few in stock"
    } else {
      return "in stock"
    }
  }
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`/api/product-details/` + id)
        setData(res.data)
      } catch (error) {
        setError(error.response.data)
      }
    }
    fetch()
  }, [id])

  return (
    <div className='mt-20 flex flex-col items-center justify-center bg-gray-100 rounded-lg shadow-lg p-4'>
        {<p>{error}</p>}
      <img
        src={data.image}
        className='w-full h-auto max-w-lg'
        alt={data.name}
      />
      <h2 className='text-gray-800 font-bold text-xl mt-4 text-center'>
        {data.name}
      </h2>
      <p className='text-gray-600 mt-2'>{data.price}</p>
      <p className='text-gray-700 mt-2 text-sm'>{data.description}</p>
      {data.quantity && (
        <p
          className={`mt-2 ${
            data.quantity < 100
              ? "text-orange-500"
              : data.quantity === 0
              ? "text-red-500"
              : "text-green-600"
          }`}
        >
          Quantity: {checkProductQuantity(data.quantity)}
        </p>
      )}
    </div>
  )
}

export default ProductDetails
