const express = require('express')
const dotenv = require('dotenv').config()
const PORT = process.env.PORT

const app = express()

app.get('/', (req, res) => {
  //   res.send('Hello!')
  res.json({ msg: 'Hello, World!' })
})

app.listen(PORT, () => {
  console.log(`Server is spining at PORT : ${PORT}`)
})
