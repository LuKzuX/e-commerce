import { useContext, useState } from "react"
import AuthContext from "../context/AuthProvider"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Login = () => {

  const navigate = useNavigate()
  const {setAuth} = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('/api/signin', {email, password})
      const accessToken = res?.data?.accessToken
      const roles = res?.data.user.isAdmin
      setAuth({email, password, roles, accessToken})
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  }
  return (
      <form onSubmit={handleLogin} className="mt-20">
        <label>email:</label>
        <input
          type='text'
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id='email'
          required
        />
        <label>password:</label>
        <input
          type='text'
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id='password'
          required
        />
        <button>Submit</button>
      </form>
  )
}

export default Login
