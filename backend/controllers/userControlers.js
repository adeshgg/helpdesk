// @desc Registers a new User
// @route /api/users
// @access Public
const registerUser = (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400).json({ msg: 'Please include all the fields' })
  }
  res.send('Register user')
}

// @desc Login a User
// @route /api/users/login
// @access Public
const loginUser = (req, res) => {
  res.send('Login user')
}

module.exports = {
  registerUser,
  loginUser,
}
