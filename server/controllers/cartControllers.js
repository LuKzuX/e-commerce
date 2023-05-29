const Product = require(`../models/productSchema`)
const { wrap } = require("../utils/wrap")
const CustomError = require("../errors/customError")
const jwt = require('jsonwebtoken')

const getCartProducts = wrap(async(req, res) => {
  res.send('u are in the cart page')
})

module.exports = {getCartProducts}