const mongoose = require(`mongoose`)

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: [true, `please enter a valid name`],
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
})

const Product = mongoose.model('Product', productSchema)
module.exports = Product
