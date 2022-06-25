import { useSelector } from 'react-redux'
import axios from 'axios'
import { useEffect, useState } from 'react'

const API_URL = 'http://localhost:5000/api/users/'

export default function NoteItem({ note }) {
  const { user } = useSelector(state => state.auth)
  const [noteUser, setNoteUser] = useState({})

  const getUser = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }

    const response = await axios.get(API_URL + `${note.user}`, config)
    setNoteUser(response.data)
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <div
      className='note'
      style={{
        backgroundColor: noteUser.isAdmin ? 'rgba(0,0,0,0.7)' : '#fff',
        color: noteUser.isAdmin ? '#fff' : '#000',
      }}
    >
      <h4>
        Note from{' '}
        {noteUser.isAdmin ? <span>Admin</span> : <span>{noteUser.name}</span>}
      </h4>
      <p>{note.text}</p>
      <div className='note-date'>
        {new Date(note.createdAt).toLocaleString('en-IN')}
      </div>
    </div>
  )
}
