const express = require("express")
const router = express.Router()
const {authMiddleware, verifyAdmin} = require("../middlewares/userAuthMiddleware")
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require(`../controllers/productControllers`)
const { signup, signin, verifyUser } = require(`../controllers/userControllers`)
const { getCartProducts } = require(`../controllers/cartControllers`)
const multer = require("multer")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images")
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})
const upload = multer({ storage: storage })

//product routes
router.get(`/`, getProducts)
router.get(`/product-details/:id`, getProduct)
router.post(`/new-product`, authMiddleware, upload.single("image"), createProduct)
router.patch(`/update-product/:id`, upload.single("image"), authMiddleware, verifyAdmin, updateProduct)
router.delete(`/:id`, authMiddleware, verifyAdmin, deleteProduct)

//cart routes
router.get(`/cart`, authMiddleware, getCartProducts)

//user routes
router.post(`/signup`, signup)
router.post(`/signin`, signin)

module.exports = router
