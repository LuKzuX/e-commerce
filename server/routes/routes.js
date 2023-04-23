const express = require("express")
const router = express.Router()
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require(`../controllers/productControllers`)
const { login } = require(`../controllers/userControllers`)
const multer = require("multer")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './images')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname)
  },
})
const upload = multer({ storage: storage })

router.get(`/`, getProducts)
router.get(`/product-details/:id`, getProduct)
router.post(`/new-product`, upload.single("image"), createProduct)
router.patch(`/update-product/:id`, upload.single("image"), updateProduct)
router.delete(`/:id`, deleteProduct)

//user controllers
router.post(`/signup`, login)

module.exports = router
