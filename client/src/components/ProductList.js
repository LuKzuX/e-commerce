import { Link } from "react-router-dom"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { ProductContext } from "../context/productContext"
import { useAuthContext } from "../functions/useAuthContext"

const ProductList = () => {
  const navigate = useNavigate()
  const { user } = useAuthContext()
  const { value: data, setValue } = useContext(ProductContext)

  const handleDelete = async (id) => {
    try {
      await axios.delete("/api/" + id, {
        headers: {
          Authorization: `Bearer ${user.data.token}`,
        },
      })
      const newArr = data.filter((item) => item._id !== id)
      setValue(newArr)
    } catch (error) {
      console.log(error.response.data)
    }
  }

  return (
    <div className='product-list grid grid-cols-1 gap-5 w-11/12 m-auto xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
      {data.map((x) => (
        <div className='mb-10' key={x._id}>
          <Link to={`/product-details/${x._id}`}>
            <div className='product-info'>
              <img
                className='mx-auto object-contain aspect-video'
                src={x.image}
                alt={x.name}
              />
              <h2 className='text-lg font-semibold mt-2'>{x.name}</h2>
              <p className='text-gray-500 mt-1'>${x.price}</p>
            </div>
          </Link>
          <button
            onClick={() => {}}
            className='bg-transparent border border-yellow-400 text-yellow-600 font-bold py-2 px-4 rounded-lg hover:bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2'
          >
            Buy
          </button>
          {user && user.data.user.isAdmin && (
            <div className='admin-product-actions flex justify-center mt-2'>
              <div>
                <button
                  className='mx-2 px-3 py-2 rounded-md text-blue-500 border border-blue-500 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                  onClick={() => navigate("/update-product/" + x._id)}
                >
                  Update
                </button>
                <button
                  className='mx-2 px-3 py-2 rounded-md text-red-500 border border-red-500 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
                  onClick={() => {
                    handleDelete(x._id)
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default ProductList
