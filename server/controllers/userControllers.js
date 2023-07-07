const User = require(`../models/userSchema`)
const jwt = require("jsonwebtoken")
const { wrap } = require("../utils/wrap")
const CustomError = require("../errors/customError")

const createToken = (obj) => {
  return jwt.sign({ obj }, process.env.SECRET)
}

const signup = wrap(async (req, res) => {
  const { name, email, password } = req.body
  const newUser = await User.create({ name, email, password, userCart: [], isAdmin: false })
  res.json({ newUser })
})

const signin = wrap(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!email || !password) {
    throw new CustomError("Please provide email and password", 400)
  }
  if (!user) {
    throw new CustomError("incorrect email", 400)
  }
  const token = createToken(user)
  res.json({ user, token })
})

const getUser = wrap(async(req, res) => {
    const {_id} = req.user.obj
    const user = await User.findById(_id)
    res.json(user)
})

const updateUser = wrap(async(req, res) => {
  const {name, email, password} = req.body
  const {_id} = req.user.obj
  console.log(_id);
  const user = await User.findByIdAndUpdate({_id: _id}, {name, email, password}, {runValidators: true})
  res.json(user)
})


module.exports = {
  signup,
  signin,
  getUser,
  updateUser
}
