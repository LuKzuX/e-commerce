const Product = require(`../models/productSchema`)
const { wrap } = require("../utils/wrap")
const CustomError = require("../errors/customError")

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
    throw new CustomError("product not found", 401)
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

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params
    const {
      name,
      price,
      description,
      image = req.file.path,
      quantity,
    } = req.body
    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: id },
      { name, price, description, image, quantity }
    )
    if (!name) {
      return res.status(401).send("sss")
    }
    res.json(updatedProduct)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: `invalid id` })
  }
}

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params
    const deletedProduct = await Product.findByIdAndDelete({ _id: id })
    if (!deletedProduct) {
      return res.status(404).json({ error: `this product id does not exist` })
    }
    res.json(deletedProduct)
  } catch (error) {
    return res.status(500).json({ error: `invalid id` })
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
}
