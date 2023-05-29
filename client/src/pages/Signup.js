import { useState } from "react"
import { useSignup } from "../functions/useSignup"

const Signup = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const {signup, error} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await signup(name, email, password)
  }

  return (
    <form onSubmit={handleSubmit} className='mt-20 block'>
      <label htmlFor='name' className='text-lg'>
        Name:
      </label>
      <input
        type='text'
        id='name'
        name='name'
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className='input-field mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
      />
      {error && error.name && (
        <span className='text-red-500'>{error.name}</span>
      )}

      <label htmlFor='email' className='text-lg'>
        Email:
      </label>
      <input
        type='text'
        id='email'
        name='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className='input-field mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
      />
      {error && error.email && (
        <span className='text-red-500'>{error.email}</span>
      )}

      <label htmlFor='password' className='text-lg'>
        Password:
      </label>
      <input
        type='password'
        id='password'
        name='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className='input-field mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
      />
      {error && error.password && (
        <span className='text-red-500'>{error.password}</span>
      )}

      <button className='submit-btn bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none hover:bg-blue-600'>
        Submit
      </button>
    </form>
  )
}

export default Signup
