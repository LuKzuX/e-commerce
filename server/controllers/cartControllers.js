const Product = require(`../models/productSchema`)
const User = require(`../models/userSchema`)
const { wrap } = require("../utils/wrap")
const CustomError = require("../errors/customError")

const addToCart = wrap(async (req, res) => {
  const productId = req.params.id
  const { _id } = req.user.obj
  const user = await User.findById(_id)
  const product = await Product.findById(productId)
  const existingProduct = user.userCart.find(
    (item) => item.product._id.toString() === productId
  )

  if (existingProduct) {
    if (req.body.quantity) {
      existingProduct.quantity = req.body.quantity
    }
  } else {
    user.userCart.push({
      product: {
        _id: product._id,
        name: product.name,
        price: product.price,
        description: product.description,
        image: product.image,
        quantity: product.quantity,
      },
    })
  }

  await user.save()
  res.json(user.userCart)
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
  const deletedProducts = user.userCart.filter((item) => {
    return item._id.toString() !== productId
  })
  console.log(deletedProducts);
  user.userCart = deletedProducts
  await user.save()
  res.json(user.userCart)
})

module.exports = { getCartProducts, addToCart, deleteCartProducts }
