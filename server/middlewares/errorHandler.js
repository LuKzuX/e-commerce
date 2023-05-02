const errorHandlerMiddleware = (err, req, res, next) => {
  if (err.name == "CastError") {
    return res.status(401).send("invalid id")
  }
  return res.status(500).send(err)
}

module.exports = errorHandlerMiddleware
