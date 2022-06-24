import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getTicket } from '../features/tickets/ticketSlice'

export default function Ticket() {
  const { ticket, isLoading, isSuccessful, isError, message } = useSelector(
    state => state.ticket
  )

  const { ticketId } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    dispatch(getTicket(ticketId))
  }, [isError, dispatch, ticketId])

  return <div>Ticket</div>
}
