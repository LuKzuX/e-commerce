const Product = require(`../models/productSchema`)
const { wrap } = require("../utils/wrap")
const CustomError = require("../errors/customError")
const conditionals = require("../utils/multipleConditionals")
const jwt = require('jsonwebtoken')

const getProducts = async (req, res) => {
  const page = req.query.p || 1
  const find = req.query.f || ""
  const sort = req.query.s || ""
  const numFilterMin = req.query.minprice || 0
  const numFilterMax = req.query.maxprice || 1000000
  const productsPerPage = 9

  const totalproducts = await Product.find({})
  const products = await Product.find({ name: { $regex: find, $options: "i" } })
    .skip((page - 1) * productsPerPage)
    .limit(productsPerPage)
    .gte("price", numFilterMin)
    .lte("price", numFilterMax)
    .sort(sort)
  res.json({ products, totalproducts })
}

const getProduct = wrap(async (req, res) => {
  const { id } = req.params
  const product = await Product.findOne({ _id: id })
  if (!product) {
    throw new CustomError("product not found", 404)
  }
  res.json(product)
})

const createProduct = wrap(async (req, res) => {
  const { name, price, description, image = req.file.path, quantity } = req.body
  const newProduct = await Product.create({
    name,
    price,
    description,
    image,
    quantity,
  })
  res.json({ newProduct })
})

const updateProduct = wrap(async (req, res) => {
  console.log(req.user);
  const { id } = req.params
  const { name, price, description, image = req.file.path, quantity } = req.body
  const updatedProduct = await Product.findByIdAndUpdate(
    { _id: id },
    { name, price, description, image: image || req.file.path, quantity },
    { new: true, runValidators: true }
  )
  if (!conditionals(name, price, description, image, quantity)) {
    throw new CustomError('Please fill all the fields', 401)
  }
  res.json(updatedProduct)
})

const deleteProduct = wrap(async (req, res) => {
  const { id } = req.params
  const deletedProduct = await Product.findByIdAndDelete({ _id: id })
  if (!deletedProduct) {
    throw new Error("no item to delete with this id", 404)
  }
  res.json('deleted')
})

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
}
