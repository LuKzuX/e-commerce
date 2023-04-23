import { useEffect, useState } from "react"
import useList from "./fetchHook"

const useCarrousel = () => {
  const [carrousel, setCarrousel] = useState([])
  const { value, totalValue, error } = useList(`/api`)

  useEffect(() => {
    const getCarrousel = () => {
      if (totalValue.length > 0) {
        const newArr = []
        const secondArray = []
        while (newArr.length < 9) { //set the number of products in the carrousel
          let x = Math.floor(Math.random() * totalValue.length)
          if (newArr.indexOf(totalValue[x]) > -1) { //study this shit, thx indians
            secondArray.push(totalValue[x])
          } else {
            newArr.push(totalValue[x])
          }
        }
        setCarrousel(newArr)
      }
    }
    getCarrousel()
  }, [totalValue])
  return { carrousel }
}

export default useCarrousel
