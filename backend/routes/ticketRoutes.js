const express = require('express')
const router = express.Router()
const {
  getTickets,
  createTicket,
  getTicket,
  deleteTicket,
  updateTicket,
} = require('../controllers/ticketControllers')

const protectRoutes = require('../middleware/authMiddleware')

router.get('/', protectRoutes, getTickets)
router.get('/:id', protectRoutes, getTicket)
router.post('/', protectRoutes, createTicket)
router.delete('/:id', protectRoutes, deleteTicket)
router.put('/:id', protectRoutes, updateTicket)

module.exports = router
