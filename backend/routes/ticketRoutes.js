const express = require('express')
const router = express.Router()
const { getTickets, createTicket } = require('../controllers/ticketControllers')

const protectRoutes = require('../middleware/authMiddleware')

router.get('/', protectRoutes, getTickets)
router.post('/', protectRoutes, createTicket)

module.exports = router
