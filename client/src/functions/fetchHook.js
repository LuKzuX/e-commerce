import axios from "axios"
import { useEffect, useState } from "react"
import { useContext } from "react"
import { ProductContext } from "../context/productContext"

const useList = (url) => {
  const [error, setError] = useState("")
  const { value, setValue } = useContext(ProductContext)
  const [totalValue, setTotalValue] = useState([])
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(url)
        setValue(res.data.products)
        setTotalValue(res.data.totalproducts)
      } catch (error) {
        setError(true)
      }
    }
    getData()
  }, [url])

  return { value, totalValue, error }
}

export default useList
