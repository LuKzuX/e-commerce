const Product = require(`../models/productSchema`)
const User = require(`../models/userSchema`)
const { wrap } = require("../utils/wrap")
const CustomError = require("../errors/customError")
const jwt = require("jsonwebtoken")

const addToCart = wrap(async (req, res) => {
  const productId = req.params.id
  const { _id } = req.user.obj
  const user = await User.findById(_id)
  const product = await Product.findById(productId)
  const existingProduct = user.userCart.find(
    (item) => item.product.toString() == productId
  )
  if (existingProduct) {
    existingProduct.quantity += 1
  } else {
    user.userCart.push({ product })
  }

  await user.save()
  res.json(user)
})

const getCartProducts = wrap(async (req, res) => {
  const { _id } = req.user.obj
  const user = await User.findById(_id)
  res.json(user.userCart)
})

const deleteCartProducts = wrap(async (req, res) => {
  const productId = req.params.id
  const { _id } = req.user.obj
  const user = await User.findById(_id)
  const existingProduct = user.userCart.find(
    (item) => item.product.toString() == productId
  )
  if (existingProduct.quantity > 1) {
    existingProduct.quantity -= 1
  } else {
    const deletedProduct = user.userCart.filter(
      (item) => item.product.toString() !== productId
    )
    user.userCart = deletedProduct
  }
  await user.save()
  res.json(user.userCart)
})

module.exports = { getCartProducts, addToCart, deleteCartProducts }
