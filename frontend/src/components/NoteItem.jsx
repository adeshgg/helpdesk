import { useSelector } from 'react-redux'

export default function NoteItem({ note }) {
  const { user } = useSelector(state => state.auth)

  return (
    <div
      className='note'
      style={{
        backgroundColor: user.isAdmin === true ? 'rgba(0,0,0,0.7)' : '#fff',
        color: user.isAdmin === true ? '#fff' : '#000',
      }}
    >
      <h4>
        Note from {user.isAdmin ? <span>Admin</span> : <span>{user.name}</span>}
      </h4>
      <p>{note.text}</p>
      <div className='note-date'>
        {new Date(note.createdAt).toLocaleString('en-IN')}
      </div>
    </div>
  )
}
