import { Link } from "react-router-dom"
import { HiMenuAlt1 } from "react-icons/hi"
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai"
import { useLogout } from "../functions/useLogout"
import { useAuthContext } from "../functions/useAuthContext"

function Navbar({ open, setMenuOpen }) {
  const { logout } = useLogout()
  const { user } = useAuthContext()
  const handleLogout = () => {
    logout()
    window.location.reload()
  }

  return (
    <header className='fixed w-full top-0 z-10'>
      <nav className='bg-white shadow-md p-3 font-mono'>
        <div className='flex justify-between items-center'>
          <div>
            <Link to={`/`}>
              <h1 className='text-2xl font-bold'>E-Commerce</h1>
            </Link>
          </div>
          <div className='hidden lg:block'>
            <Link
              to={`/account`}
              className='ml-6 font-semibold text-gray-800 hover:text-gray-600 transition-colors duration-300'
            >
              Account
            </Link>
            <Link
              to={`/cart`}
              className='ml-6 font-semibold text-gray-800 hover:text-gray-600 transition-colors duration-300'
            >
              Cart
            </Link>
          </div>
          <div className='w-10'>
            <h1
              onClick={() => {
                setMenuOpen(!open)
              }}
            >
              <HiMenuAlt1 size={40} className='cursor-pointer' />
            </h1>
          </div>
        </div>
      </nav>
      <div
        className={`w-1/2 lg:w-1/4 xl:w-1/6 bg-white ml-auto flex flex-col items-center fixed top-0 right-0 text-lg py-10 border-b-2 border-l-2 transition-all duration-500 transform ${
          open
            ? "translate-x-0 opacity-100 z-10"
            : "translate-x-full opacity-0 pointer-events-none z-10"
        }`}
      >
        <p
          className='absolute top-2 right-3 cursor-pointer'
          onClick={() => {
            setMenuOpen(!open)
          }}
        >
          X
        </p>
        <Link
          to={`/account`}
          className='mb-3.5 lg:hidden text-gray-800 hover:text-gray-600 transition-colors duration-300'
        >
          <AiOutlineUser size={24} />
        </Link>
        <Link
          to={`/cart`}
          className='mt-3.5 mb-3.5 lg:hidden text-gray-800 hover:text-gray-600 transition-colors duration-300'
        >
          <AiOutlineShoppingCart size={24} />
        </Link>
        {!user && (
          <div>
            <Link
              to={"/signin"}
              onClick={() => {
                setMenuOpen(!open)
              }}
              className='mt-3.5 mb-3.5 p-3 px-5 bg-sky-500 rounded text-white hover:bg-sky-600 transition-colors duration-300'
            >
              Login
            </Link>
            <Link
              to={"/signup"}
              onClick={() => {
                setMenuOpen(!open)
              }}
              className='mt-3.5 bg-green-500 p-3 rounded text-white hover:bg-green-600 transition-colors duration-300'
            >
              Sign up
            </Link>
          </div>
        )}
        {user && (
          <div>
            <button
              onClick={handleLogout}
              className='inline-block px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors duration-300'
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar
