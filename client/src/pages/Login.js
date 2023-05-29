import { useState } from "react"
import { useLogin } from "../functions/useLogin"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login, error, isLoading } = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(email, password)
  }

  return (
    <form onSubmit={handleSubmit} className='mt-20'>
      <div className='mb-4'>
        <label htmlFor='email' className='block text-lg font-medium'>
          Email:
        </label>
        <input
          type='text'
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id='email'
          required
          className='input-field border-2'
        />
      </div>
      <div className='mb-4'>
        <label htmlFor='password' className='block text-lg font-medium'>
          Password:
        </label>
        <input
          type='password'
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id='password'
          required
          className='input-field border-2'
        />
      </div>
      <button className='submit-btn bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none hover:bg-blue-600'>
        Submit
      </button>
    </form>
  )
}

export default Login
