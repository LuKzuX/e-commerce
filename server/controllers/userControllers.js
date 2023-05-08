const User = require(`../models/userSchema`)
const bcrypt = require("bcrypt")
const { wrap } = require("../utils/wrap")

const signup = wrap(async(req, res, next) => {
    const { name, email, password } = req.body
    const newUser = await User.create({ name, email, password, isAdmin: false })
    res.json(newUser)
})

module.exports = { 
  signup,
}
