const asyncHandler = require('express-async-handler')

// @desc Registers a new User
// @route /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please add all the fields')
  }
  res.send('Register user')
})

// @desc Login a User
// @route /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  res.send('Login user')
})

module.exports = {
  registerUser,
  loginUser,
}
