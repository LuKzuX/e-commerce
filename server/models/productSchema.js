const mongoose = require(`mongoose`)

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    minLength: 3,
    required: [true, `please enter a name with 3 or more characters`],
  },
  price: {
    type: Number,
    required: [true, `please enter a price`],
  },
  description: {
    type: String,
    unique: true,
    required: [true, `please enter a description `],
  },
  image: {
    type: String,
    unique: true,
    required: [true, `please enter an image `],
  },
  quantity: {
    type: Number,
    required: [true, `please enter a quantity `],
  },
})

const Product = mongoose.model('Product', productSchema)
module.exports = Product
