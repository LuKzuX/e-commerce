const mongoose = require(`mongoose`)

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    minLength: 3,
    required: [true, `please enter name with more than 3 characters`],
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    unique: true,
    required: true,
  },
  image: {
    type: String,
    unique: true,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
})

const Product = mongoose.model('Product', productSchema)
module.exports = Product
