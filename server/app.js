require("dotenv").config()
const express = require("express")
const app = express()
const router = require(`./routes/routes`)
const connectDB = require(`./db/connect`)
const cors = require('cors')
const notFound = require('./middlewares/notFound')
const errorHandlerMiddleware = require('./middlewares/errorHandler')


app.use('/images', express.static('../server/images'))
app.use('/product-details/images', express.static('../server/images')) //study this shit too
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use(`/api`, router)
app.use(notFound)
app.use(errorHandlerMiddleware)



const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(5000, () => {
      console.log(`Server is listening...`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
