import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const UpdateProduct = () => {
  const { id } = useParams()

  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")
  const [quantity, setQuantity] = useState("")

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
        console.log(error)
      }
    }

    fetchData()
  }, [id])

  const handleUpdate = async (e) => {
    const formData = new FormData()
    formData.append("name", name)
    formData.append("price", price)
    formData.append("description", description)
    formData.append("image", image)
    formData.append("quantity", quantity)
    try {
      await axios.patch("/api/update-product/" + id, formData)
      console.log(image)
    } catch (error) {
      console.log(error)
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
        />
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
        />
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
        />
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
        />
      </div>
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
        type='submit'
      >
        Update
      </button>
    </form>
  )
}

export default UpdateProduct
