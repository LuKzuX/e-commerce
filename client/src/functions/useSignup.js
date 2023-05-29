import { useState } from "react"
import { AuthContext } from "../functions/useAuthContext"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const useSignup = () => {
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const signup = async (name, email, password) => {
    setError(null)
    try {
      await axios.post("/api/signup", { name, email, password })
      navigate("/signin")
    } catch (error) {
      setError(error.response.data)
    }
  }
  return {signup, error}
}
