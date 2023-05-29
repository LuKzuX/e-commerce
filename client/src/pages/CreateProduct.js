import { useState } from "react"
import axios from "axios"

const CreateProduct = () => {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")
  const [quantity, setQuantity] = useState("")
  const [error, setError] = useState(undefined)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("name", name.charAt(0).toUpperCase() + name.slice(1))
    formData.append("price", price)
    formData.append("description", description)
    formData.append("image", image)
    formData.append("quantity", quantity)
    try {
      await axios.post("/api/new-product", formData)
    } catch (error) {
      setError(error.response.data)
      console.log(error);
      setTimeout(() => {
        setError(undefined)
      }, 1500)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='w-11/12 m-auto my-20'
      encType='multipart/form-data'
    >
      <h3 className='text-lg font-medium mb-4'>Add new product</h3>
      <div className='mb-4'>
        <label htmlFor='name' className='block text-gray-700 font-medium mb-2'>
          Name:
        </label>
        <input
          type='text'
          name='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          id='name'
          className='w-full py-2 px-3 rounded-md shadow-sm border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          placeholder='Enter product name'
          required
        />
        {error && error.name}
      </div>
      <div className='mb-4'>
        <label htmlFor='price' className='block text-gray-700 font-medium mb-2'>
          Price:
        </label>
        <input
          type='number'
          step='0.01'
          name='price'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          id='price'
          className='w-full py-2 px-3 rounded-md shadow-sm border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          placeholder='Enter product price'
          required
        />
        {error && error.price}
      </div>
      <div className='mb-4'>
        <label
          htmlFor='description'
          className='block text-gray-700 font-medium mb-2'
        >
          Description:
        </label>
        <textarea
          name='description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          id='description'
          className='w-full py-2 px-3 rounded-md shadow-sm border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          placeholder='Enter product description'
          required
        />
        {error && error.description}
      </div>
      <div className='mb-4'>
        <label htmlFor='image' className='block text-gray-700 font-medium mb-2'>
          Image:
        </label>
        <input
          type='file'
          name='image'
          id='image'
          onChange={(e) => setImage(e.target.files[0])}
          className='w-full py-2 px-3 rounded-md shadow-sm border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          required
        />
        {error && error.image}
      </div>
      <div className='mb-4'>
        <label
          htmlFor='quantity'
          className='block text-gray-700 font-medium mb-2'
        >
          Quantity:
        </label>
        <input
          type='number'
          name='quantity'
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          id='quantity'
          className='w-full py-2 px-3 rounded-md shadow-sm border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          placeholder='Enter product quantity'
          required
        />
        {error && error.quantity}
      </div>
      <button
        type='submit'
        className='inline-flex justify-center py-2 px-4 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-sm font-medium'
      >
        Create
      </button>
    </form>
  )
}

export default CreateProduct
