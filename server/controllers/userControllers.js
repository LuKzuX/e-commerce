const User = require(`../models/userSchema`)
const bcrypt = require('bcrypt')

const login = async (req, res) => {
    const { name, email, password } = req.body
    if (!name) {
      
    }
    try {
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(password, salt)
      const newUser = await User.create({
        name,
        email,
        password: hash,
        isAdmin: false,
      })
        res.json(newUser)
    } catch (error) {
        res.status(400).send(error)
    }
}

module.exports = {
  login,
} 
