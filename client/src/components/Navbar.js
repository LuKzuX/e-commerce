import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ProductContext } from "../context/productContext"
import { HiMenuAlt1 } from "react-icons/hi"
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai"
import { useRef } from "react"

function Navbar({ open, setMenuOpen }) {
  const btnRef = useRef()
  useEffect(() => {
    const handler = (e) => {
      if (!btnRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
  })

  return (
    <header className=' fixed w-full top-0 z-10'>
      <nav className='bg-white shadow-md p-3 font-mono '>
        <div className='flex justify-between items-center'>
          <div className=''>
            <Link to={`/`}>
              <h1 className='text-2xl'>E-Commerce</h1>
            </Link>
          </div>
          <div className='hidden w-1/4 ml-auto lg:block'>
            <Link className='font-bold'>Account</Link>
            <Link className='ml-20 font-bold'>Cart</Link>
          </div>
          <div className='w-10'>
            <h1
              ref={btnRef}
              onClick={() => {
                setMenuOpen(!open)
              }}
            >
              <HiMenuAlt1 size={40} />
            </h1>
          </div>
        </div>
      </nav>
      <div
        className={`w-1/2 lg:w-1/4 xl:w-1/6 bg-white ml-auto flex flex-col items-center fixed top-0 right-0 text-lg py-10 border-b-2 border-l-2 transition-all duration-500 transform
        ${
          open
            ? "translate-x-0 opacity-100 z-10"
            : "translate-x-full opacity-0 pointer-events-none z-10"
        }`}
      >
        <p
          className='absolute top-2 right-3'
          onClick={() => {
            setMenuOpen(!open)
          }}
        >
          X
        </p>
        <Link className='mb-3.5 lg:hidden' href='#'>
          {" "}
          <AiOutlineUser />{" "}
        </Link>
        <Link className='mt-3.5 mb-3.5 lg:hidden'>
          {" "}
          <AiOutlineShoppingCart />{" "}
        </Link>
        <Link className='mt-3.5 mb-3.5 p-3 px-5 bg-sky-500 rounded text-white'>
          Login
        </Link>
        <Link className='mt-3.5 bg-green-500 p-3 rounded text-white'>
          Sign up
        </Link>
      </div>
    </header>
  )
}

export default Navbar
