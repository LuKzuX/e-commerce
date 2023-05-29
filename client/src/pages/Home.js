import ProductList from "../components/ProductList"
import axios from "axios"
import { useNavigate, useSearchParams } from "react-router-dom"
import useList from "../functions/fetchHook"
import { useContext, useEffect, useState } from "react"
import { ProductContext } from "../context/productContext"
import fill from "../functions/pagination"
import Carrousel from "../components/Carrousel"
import { useAuthContext } from "../functions/useAuthContext"

const Home = () => {
  const navigate = useNavigate()
  const { value: products, setValue } = useContext(ProductContext)
  const [page, setPage] = useState(1)
  const [searchParams, setSearchParams] = useSearchParams()
  const { user } = useAuthContext()
  const { value, totalValue, error } = useList(`/api?p=${page}&${searchParams}`)

  return (
    <div className='w-11/12 mx-auto mt-20'>
      {
        totalValue.length >= 9 && (
          <Carrousel />
        ) /* IF U HAVE LESS THAN 5 PRODUCTS, IT WONT WORK */
      }
      <div className='flex flex-col mb-12 border-b-2 m-auto '>
        <div className='max-w-md search-input flex items-center border-b border-gray-400 pb-2'>
          <label className='pr-2'>Search</label>
          <i className='fa fa-search' aria-hidden='true'></i>
          <input
            className='ml-2 bg-transparent border-none focus:outline-none w-1/4'
            onChange={(e) => {
              setSearchParams((searchParams) => {
                searchParams.set("f", e.target.value)
              })
            }}
          ></input>
        </div>
        <div className='flex flex-row my-5'>
          <div className='flex flex-col'>
            <label className='pr-2'>sort</label>
            <select
              className='border rounded py-1 px-2'
              onChange={(e) => {
                setSearchParams((searchParams) => {
                  searchParams.set("s", e.target.value)
                })
              }}
            >
              <option value=''></option>
              <option value={"price"}>Price: Low to High</option>
              <option value={"-price"}>Price: High to Low</option>
              <option value={"name"}>Name: A to Z</option>
              <option value={"-name"}>Name: Z to A</option>
            </select>
          </div>

          <div className='flex flex-col ml-8'>
            <label className='pr-2'>filter</label>
            <select
              className='border rounded py-1 px-2'
              onChange={(e) => {
                const value = e.target.value
                const [min, max] = value.split("|")
                setSearchParams((searchParams) => {
                  searchParams.set("minprice", min)
                  searchParams.set("maxprice", max)
                })
              }}
            >
              <option value={"0|1000000"}></option>
              <option value={"1000|1000000"}>More than $1000</option>
              <option value={"500|1000"}>Between $500 and $1000</option>
              <option value={"0|500"}>Less than $500</option>
            </select>
          </div>
        </div>
      </div>

      {
        <div className='products-grid'>
          {error && <p>Error loading the products</p>}
          {products && <ProductList />}

          <div className='my-4'>
            <div className='flex justify-center items-center m-auto'>
              {products && (
                <button
                  className={`ml-4 bg-gray-400 ${
                    page < 2
                      ? "cursor-not-allowed"
                      : "hover:bg-blue-700 bg-blue-500"
                  } text-white font-bold py-2 px-4 rounded`}
                  disabled={page < 2}
                  onClick={() => {
                    setPage(page - 1)
                  }}
                >
                  -
                </button>
              )}
              <select
                className=' py-2 px-4 border-gray-400 rounded'
                value={page}
                onChange={(e) => {
                  setPage(e.target.value)
                }}
              >
                {products && fill(Math.ceil(totalValue.length / 9))}
              </select>
              {products && (
                <button
                  className={`mr-4 ${
                    products.length <= 9
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-700"
                  } text-white font-bold py-2 px-4 rounded`}
                  disabled={products.length <= 9}
                  onClick={() => {
                    setPage(page + 1)
                  }}
                >
                  +
                </button>
              )}
            </div>
          </div>
          {user && user.data.user.isAdmin && (
            <div className='flex justify-center'>
              <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center'
                onClick={() => {
                  navigate("/new-product")
                }}
              >
                New product
              </button>
            </div>
          )}
        </div>
      }
    </div>
  )
}

export default Home
