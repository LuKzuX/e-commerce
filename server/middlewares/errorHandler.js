const CustomError = require('../errors/customError')

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json(err.message)
  }
  
  return res.status(500).send("Something went wrong")
}

module.exports = errorHandlerMiddleware
