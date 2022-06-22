const express = require('express')
const router = express.Router()
const {
  getTickets,
  createTicket,
  getTicket,
} = require('../controllers/ticketControllers')

const protectRoutes = require('../middleware/authMiddleware')

router.get('/', protectRoutes, getTickets)
router.get('/:id', protectRoutes, getTicket)
router.post('/', protectRoutes, createTicket)

module.exports = router
