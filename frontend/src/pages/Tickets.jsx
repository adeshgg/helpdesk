import { getTickets, reset } from '../features/tickets/ticketSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

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

  return <div>Tickets</div>
}
