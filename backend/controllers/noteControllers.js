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
  if (
    !req.user.isAdmin &&
    ticket.user._id.toString() !== req.user._id.toString()
  ) {
    res.status(401)
    throw new Error('Request not authorized')
  }

  const notes = await Note.find({ ticket: req.params.ticketId })

  res.status(200).json(notes)
})

// @desc Create note for a ticket
// @route /api/tickets/:ticketId/notes
// @access Private
const addNote = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(401)
    throw new Error('User not Found')
  }

  const ticket = await Ticket.findById(req.params.ticketId)
  if (
    !req.user.isAdmin &&
    ticket.user._id.toString() !== req.user._id.toString()
  ) {
    res.status(401)
    throw new Error('Request not authorized')
  }

  const note = await Note.create({
    user: req.user._id,
    ticket: req.params.ticketId,
    text: req.body.text,
  })

  res.status(201).json(note)
})

module.exports = {
  getNotes,
  addNote,
}
