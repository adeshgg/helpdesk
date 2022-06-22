const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')

// @desc Return all the user tickets
// @route /api/tickets/
// @access Private
const getTickets = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(401)
    throw new Error('User not Found')
  }

  const tickets = await Ticket.find({ user: req.user._id })
  res.status(200).json(tickets)
})

// @desc Create new user ticket
// @route /api/tickets/
// @access Private
const createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body

  if (!product || !description) {
    res.status(400)
    throw new Error('Please fill the product and description fields')
  }

  if (!req.user) {
    res.status(401)
    throw new Error('User not Found')
  }

  const ticket = await Ticket.create({
    product,
    description,
    user: req.user._id,
  })

  res.status(201).json(ticket)
})

module.exports = {
  getTickets,
  createTicket,
}
