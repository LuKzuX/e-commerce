const Product = require(`../models/productSchema`)
const User = require(`../models/userSchema`)
const { wrap } = require("../utils/wrap")
const CustomError = require("../errors/customError")
const jwt = require("jsonwebtoken")

const addToCart = wrap(async (req, res) => {
  const { id } = req.params
  const { _id } = req.user.obj
  const product = await Product.findOne({ _id: id })
  const user = await User.findOne({ _id: _id })
  const cart = user.get("userCart")
  cart.push(product)
  user.save()
  res.send(user)
})

const getCartProducts = wrap(async (req, res) => {
  const user = await User.find()
  res.json(user)
})

module.exports = { getCartProducts, addToCart }
