import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { closeTicket, getTicket } from '../features/tickets/ticketSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import {
  createNote,
  getNotes,
  reset as notesReset,
} from '../features/notes/noteSlice'
import NoteItem from '../components/NoteItem'
import Modal from 'react-modal'
import { FaPlus } from 'react-icons/fa'

const customStyles = {
  content: {
    width: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}

Modal.setAppElement('#root')

export default function Ticket() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [noteText, setNoteText] = useState('')
  const { ticket, isLoading, isSuccessful, isError, message } = useSelector(
    state => state.ticket
  )
  const {
    notes,
    isLoading: notesIsLoading,
    isSuccess,
    isError: notesIsError,
    message: notesIsMessage,
  } = useSelector(state => state.note)

  const { ticketId } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    dispatch(getTicket(ticketId))
    dispatch(getNotes(ticketId))
  }, [isError, dispatch, ticketId])

  const handleTicketClose = () => {
    dispatch(closeTicket(ticketId))
    toast.success('Ticket Closed')
    navigate('/tickets')
  }

  const openModal = () => setModalIsOpen(true)
  const closeModal = () => setModalIsOpen(false)

  const onNoteSubmit = e => {
    e.preventDefault()
    dispatch(createNote({ noteText, ticketId }))
    closeModal()
  }

  if (isLoading || notesIsLoading) {
    return <Spinner />
  }

  return (
    <div className='ticket-page'>
      <header className='ticket-header'>
        <BackButton url='/tickets' />
        <h2>
          Ticket ID : {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>
          Date Submitted : {new Date(ticket.createdAt).toLocaleString('en-IN')}
        </h3>
        <h3>Product : {ticket.product}</h3>
        <hr />
        <div className='ticket-desc'>
          <h3>Description of the issue</h3>
          <p>{ticket.description}</p>
        </div>
        <h2>Notes</h2>
      </header>

      {ticket.status !== 'closed' && (
        <button className='btn' onClick={openModal}>
          <FaPlus /> Add Note
        </button>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Add Note'
      >
        <h2>Add Note</h2>
        <button className='btn-close' onClick={closeModal}>
          X
        </button>
        <form onSubmit={onNoteSubmit}>
          <div className='form-group'>
            <textarea
              name='noteText'
              id='noteText'
              className='form-control'
              placeholder='Add Note'
              value={noteText}
              onChange={e => setNoteText(e.target.value)}
            ></textarea>
          </div>
          <div className='form-group'>
            <button className='btn' type='submit'>
              Submit
            </button>
          </div>
        </form>
      </Modal>

      {notes.map(note => (
        <NoteItem key={note._id} note={note} />
      ))}
      {ticket.status !== 'close' && (
        <button
          onClick={handleTicketClose}
          className='btn btn-block btn-danger'
        >
          Close Ticket
        </button>
      )}
    </div>
  )
}
