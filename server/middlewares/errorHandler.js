const { default: mongoose } = require("mongoose")
const CustomError = require("../errors/customError")

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json(err.message)
  }

  if (err instanceof mongoose.Error.CastError) {
    return res.status(404).send(err)
  }

  if (err instanceof mongoose.Error.ValidationError) {
    Object.values(err.errors).forEach(({ properties }) => {
      if (properties.minlength) {
        return res
          .status(401)
          .send(
            `${Object.values(
              properties.path
            )} has to be longer than 3 characters`
          )
      }
      return res.status(401).send(properties.message)
    })
  }

  if (err.code == 11000) {
    console.log(err)
    return res
      .status(401)
      .send(
        `A product with the ${Object.keys(err.keyValue)[0]} '${Object.values(
          err.keyValue
        )}' already exists`
      )
  }
  return res.status(err.status).send(err.message)
}

module.exports = errorHandlerMiddleware
