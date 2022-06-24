const express = require('express')
// endPoint : api/tickets/:ticketId/notes
const router = express.Router({ mergeParams: true })

const { getNotes } = require('../controllers/noteControllers')
const protectRoutes = require('../middleware/authMiddleware')

router.get('/', protectRoutes, getNotes)

module.exports = router
