const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getMe,
  getUser,
} = require('../controllers/userControlers')

const protectRoutes = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protectRoutes, getMe)
router.get('/:id', protectRoutes, getUser)

module.exports = router
