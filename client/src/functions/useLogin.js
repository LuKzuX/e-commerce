import { useState } from "react"
import { useAuthContext } from "../functions/useAuthContext"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export const useLogin = () => {
  const [error, setError] = useState(null)
  const { dispatch } = useAuthContext()
  const navigate = useNavigate()

  const login = async (email, password) => {
    try {
      const res = await axios.post("/api/signin", { email, password })
      localStorage.setItem("user", JSON.stringify(res))
      dispatch({ type: "LOGIN", payload: res })
      navigate("/")
    } catch (error) {
      setError(error.response.data)
    }
  }
  return { login, error }
}
