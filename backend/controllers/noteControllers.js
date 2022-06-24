const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')
const Note = require('../models/noteModel')

// @desc Return all notes of a ticket
// @route /api/tickets/:ticketId/notes
// @access Private
const getNotes = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(401)
    throw new Error('User not Found')
  }

  const ticket = await Ticket.findById(req.params.ticketId)
  if (ticket.user._id.toString() !== req.user._id.toString()) {
    res.status(401)
    throw new Error('Request not authorized')
  }

  const notes = await Note.find({ ticket: req.params.ticketId })

  res.status(200).json(notes)
})

module.exports = {
  getNotes,
}
