const express = require('express')
// endPoint : api/tickets/:ticketId/notes
const router = express.Router({ mergeParams: true })

const { getNotes, addNote } = require('../controllers/noteControllers')
const protectRoutes = require('../middleware/authMiddleware')

router.get('/', protectRoutes, getNotes)
router.post('/', protectRoutes, addNote)

module.exports = router
