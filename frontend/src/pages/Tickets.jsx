import { getTickets, reset } from '../features/tickets/ticketSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import TicketItem from '../components/TicketItem'

export default function Tickets() {
  const { tickets, isLoading, isError, isSuccessful } = useSelector(
    state => state.ticket
  )

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTickets())

    return () => {
      if (isSuccessful) {
        dispatch(reset())
      }
    }
  }, [dispatch, isSuccessful])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <BackButton url='/' />
      <h1>Tickets</h1>
      <div className='tickets'>
        <div className='ticket-headings'>
          <div>Date</div>
          <div>Product</div>
          <div>Status</div>
          <div></div>
        </div>
        {tickets.map(ticket => {
          return <TicketItem key={ticket._id} ticket={ticket} />
        })}
      </div>
    </>
  )
}
