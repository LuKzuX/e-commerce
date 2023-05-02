const User = require(`../models/userSchema`)
const bcrypt = require("bcrypt")

const login = async (req, res, next) => {
  try {
    const { name, email, password } = req.body
    const newUser = await User.create({ name, email, password, isAdmin: false })
    res.json(newUser)
  } catch (error) {
    
  }
}

module.exports = {
  login,
}
