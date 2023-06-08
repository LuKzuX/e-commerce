const mongoose = require("mongoose")
const { isEmail } = require("validator")
const bcrypt = require("bcrypt")
const {wrap} = require('../utils/wrap')
const CustomError = require("../errors/customError")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, "name must be equal or longher than 3 characters"],
    required: [true, "please enter a valid name"],
  },
  email: {
    type: String,
    required: [true, "please enter an email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "please enter a password"],
    minlength: [6, "minimum password length is 6 characters"],
  },
  userCart: [{
    product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}, 
    quantity: {type: Number, default: 1}
  }],
  isAdmin: { type: Boolean, required: true },
})

userSchema.pre('save', async  function (next) {
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

const User = mongoose.model("User", userSchema)
module.exports = User
