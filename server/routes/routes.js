const express = require("express")
const router = express.Router()
const {
  authMiddleware,
  verifyAdmin,
} = require("../middlewares/userAuthMiddleware")
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require(`../controllers/productControllers`)
const { signup, signin, getUser, updateUser, deleteUser } = require(`../controllers/userControllers`)
const {
  getCartProducts,
  addToCart,
  deleteCartProducts,
} = require(`../controllers/cartControllers`)
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
router.post(
  `/new-product`,
  upload.single("image"),
  authMiddleware,
  verifyAdmin,
  createProduct
)
router.patch(
  `/update-product/:id`,
  upload.single("image"),
  authMiddleware,
  verifyAdmin,
  updateProduct
)
router.delete(`/:id`, authMiddleware, verifyAdmin, deleteProduct)
//user routes
router.post(`/signup`, signup)
router.post(`/signin`, signin)
router.get(`/account`, authMiddleware, getUser)
router.patch(`/account`, authMiddleware, updateUser)
router.delete(`/account`, authMiddleware, deleteUser)

//cart routes
router.get(`/cart`, authMiddleware, getCartProducts)
router.post(`/:id`, authMiddleware, addToCart)
router.delete(`/cart/:id`, authMiddleware, deleteCartProducts)

module.exports = router
