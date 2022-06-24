const express = require('express')
const dotenv = require('dotenv').config()
const errorHandler = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const cors = require('cors')
const PORT = process.env.PORT

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Cors
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
)

app.get('/', (req, res) => {
  //   res.send('Hello!')
  res.json({ msg: 'Hello, World!' })
})

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))

app.use(errorHandler)
app.listen(PORT, () => {
  console.log(`Server is spining at PORT : ${PORT}`)
})
