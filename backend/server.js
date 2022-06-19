const express = require('express')
const dotenv = require('dotenv').config()
const errorHandler = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const PORT = process.env.PORT

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  //   res.send('Hello!')
  res.json({ msg: 'Hello, World!' })
})

app.use('/api/users', require('./routes/userRoutes'))
app.use(errorHandler)
app.listen(PORT, () => {
  console.log(`Server is spining at PORT : ${PORT}`)
})
