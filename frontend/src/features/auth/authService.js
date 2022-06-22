import axios from 'axios'

const API_URL = 'http://localhost:5000/api/users'

// Register User
const register = async userData => {
  const response = await axios.post(API_URL, userData)

  if (response.data) {
    localStorage.setItem('helpdesk-user', JSON.stringify(response.data))
  }

  return response.data
}

const logout = () => localStorage.removeItem('helpdesk-user')

const authService = {
  register,
  logout,
}

export default authService
