const mongoose = require("mongoose")
const { isEmail } = require("validator")
const bcrypt = require("bcrypt")
const {wrap} = require('../utils/wrap')

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
  isAdmin: { type: Boolean, required: true },
})

const User = mongoose.model("User", userSchema)
module.exports = User
