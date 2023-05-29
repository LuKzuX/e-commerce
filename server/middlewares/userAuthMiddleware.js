const CustomError = require("../errors/customError")
const { wrap } = require("../utils/wrap")
const jwt = require("jsonwebtoken")
const User = require('../models/userSchema')


const authMiddleware = async (req, res, next) => {
 const {authorization} = req.headers
 if (!authorization) {
  return res.status(401).json({error: 'auth token required'})
 }
 const token = authorization.split(' ')[1]
 try {
  const verified = jwt.verify(token, process.env.SECRET)
  req.user = verified
  next()
 } catch (error) {
  res.status(401).json({error})
 }

}

const verifyAdmin = (req, res, next) => {
  console.log(req.user.obj.isAdmin);
  if (!req.user.obj.isAdmin) {
    return res.status(401).send('not an admin')
  }
  next()
}
module.exports = {authMiddleware, verifyAdmin}
