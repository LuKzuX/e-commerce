import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../functions/useAuthContext"

const UpdateProduct = () => {
  const { user } = useAuthContext()
  const { id } = useParams()
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")
  const [quantity, setQuantity] = useState("")
  const [error, setError] = useState(undefined)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/product-details/" + id)
        setName(res.data.name)
        setPrice(res.data.price)
        setDescription(res.data.description)
        setImage(res.data.image)
        setQuantity(res.data.quantity)
      } catch (error) {
        setError("")
      }
    }

    fetchData()
  }, [id])

  const handleUpdate = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("name", name.charAt(0).toUpperCase() + name.slice(1))
    formData.append("price", price)
    formData.append("description", description)
    formData.append("image", image)
    formData.append("quantity", quantity)
    try {
      await axios.patch("/api/update-product/" + id, formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      if (!user) {
        setError("only admins can update products")
      }
      navigate("/")
    } catch (error) {
      console.log(error.response.data)
      setError(error.response.data)
      setTimeout(() => {
        setError(undefined)
        console.log(error.response)
      }, 1500)
    }
  }

  return (
    <form
      className='update-product-form  w-11/12 m-auto my-20'
      onSubmit={handleUpdate}
      encType='multipart/form-data'
    >
      <div className='form-group'>
        <label className='block text-gray-700 font-bold mb-2' htmlFor='name'>
          Name:
        </label>
        <input
          className='border rounded-lg px-3 py-2 mb-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          id='name'
          type='text'
          placeholder='Product Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        {error && error.name}
      </div>
      <div className='form-group'>
        <label className='block text-gray-700 font-bold mb-2' htmlFor='price'>
          Price:
        </label>
        <input
          className='border rounded-lg px-3 py-2 mb-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          id='price'
          type='number'
          placeholder='Product Price'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        {error && error.price}
      </div>
      <div className='form-group'>
        <label
          className='block text-gray-700 font-bold mb-2'
          htmlFor='description'
        >
          Description:
        </label>
        <textarea
          className='border rounded-lg px-3 py-2 mb-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          id='description'
          type='text'
          placeholder='Product Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        {error && error.description}
      </div>
      <div className='form-group'>
        <label className='block text-gray-700 font-bold mb-2' htmlFor='image'>
          Image:
        </label>
        <input
          className='border rounded-lg px-3 py-2 mb-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          id='image'
          type='file'
          name='image'
          onChange={(e) => setImage(e.target.files[0])}
        />
        {error && error.image}
      </div>
      <div className='form-group'>
        <label
          className='block text-gray-700 font-bold mb-2'
          htmlFor='quantity'
        >
          Quantity:
        </label>
        <input
          className='border rounded-lg px-3 py-2 mb-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          id='quantity'
          type='number'
          placeholder='Product Quantity'
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
        {error && error.quantity}
      </div>
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
        type='submit'
      >
        Update
      </button>
      {error && <div className='alert text-red-500'>{error}</div>}
    </form>
  )
}

export default UpdateProduct
