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

// @desc Return ticket by id
// @route /api/tickets/:id
// @access Private
const getTicket = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(401)
    throw new Error('User not Found')
  }

  const ticket = await Ticket.findById(req.params.id)

  if (!ticket) {
    res.status(404)
    throw new Error('Ticket Not Found')
  }

  if (ticket.user.toString() !== req.user._id.toString()) {
    res.status(401)
    throw new Error('Permission Denied')
  }
  res.status(200).json(ticket)
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

// @desc Delete ticket by id
// @route /api/tickets/:id
// @access Private
const deleteTicket = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(401)
    throw new Error('User not Found')
  }

  const ticket = await Ticket.findById(req.params.id)

  if (!ticket) {
    res.status(404)
    throw new Error('Ticket Not Found')
  }

  if (ticket.user.toString() !== req.user._id.toString()) {
    res.status(401)
    throw new Error('Permission Denied')
  }

  await ticket.remove()

  res.status(200).json({ success: true })
})

module.exports = {
  getTickets,
  createTicket,
  getTicket,
  deleteTicket,
}
