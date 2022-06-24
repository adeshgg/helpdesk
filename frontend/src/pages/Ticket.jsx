import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { closeTicket, getTicket } from '../features/tickets/ticketSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

export default function Ticket() {
  const { ticket, isLoading, isSuccessful, isError, message } = useSelector(
    state => state.ticket
  )

  const { ticketId } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    dispatch(getTicket(ticketId))
  }, [isError, dispatch, ticketId])

  const handleTicketClose = () => {
    dispatch(closeTicket(ticketId))
    toast.success('Ticket Closed')
    navigate('/tickets')
  }

  if (isLoading) {
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
        <hr />
        <div className='ticket-desc'>
          <h3>Description of the issue</h3>
          <p>{ticket.description}</p>
        </div>
      </header>
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
