const User = require(`../models/userSchema`)
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" })
}

const { wrap } = require("../utils/wrap")

const signup = wrap(async (req, res) => {
  const { name, email, password } = req.body
  const newUser = await User.create({ name, email, password, isAdmin: false })
  res.send(newUser)
})

const signin = wrap(async (req, res) => {
  const { email, password } = req.body
  const user = await User.login(email, password)
  const token = createToken(user._id)
  res.json({ user, token })
})

module.exports = {
  signup,
  signin,
}
