import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>
      <section className='heading'>
        <h1>How can we help you</h1>
      </section>

      <Link to='/new-ticket' className='btn btn-reverse btn-block'>
        <FaQuestionCircle /> Create New Ticket
      </Link>
      <Link to='/tickets' className='btn btn-block'>
        <FaTicketAlt /> View your Tickets
      </Link>
    </>
  )
}
