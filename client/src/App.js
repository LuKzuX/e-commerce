import "./styles.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import ProductDetails from "./pages/productDetails"
import CreateProduct from "./pages/CreateProduct"
import UpdateProduct from "./pages/UpdateProduct"
import { ProductContext } from "./context/productContext"
import { useState } from "react"
import Login from "./pages/Login"

function App() {
  const [value, setValue] = useState(undefined)
  const [open, setMenuOpen] = useState(false)

  return (
    <div className='App'>
      <Router>
        <Navbar open={open} setMenuOpen={setMenuOpen} />
        <ProductContext.Provider value={{ value, setValue, open, setMenuOpen }}>
          <div
            className={`${
              open
                ? "transition-all duration-500 blur-sm pointer-events-none"
                : "blur-none duration-500"
            }`}
          >
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/product-details/:id' element={<ProductDetails />} />
              <Route path='/new-product' element={<CreateProduct />} />
              <Route path='/update-product/:id' element={<UpdateProduct />} />
              <Route path='/signin' element={<Login />} />
            </Routes>
          </div>
        </ProductContext.Provider>
      </Router>
    </div>
  )
}

export default App
