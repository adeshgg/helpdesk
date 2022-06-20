const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getMe,
} = require('../controllers/userControlers')

const protectRoutes = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protectRoutes, getMe)

module.exports = router
