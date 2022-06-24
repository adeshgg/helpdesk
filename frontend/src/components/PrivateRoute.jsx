import { Outlet, useNavigate } from 'react-router-dom'
import useAuthStatus from '../hook/useAuthStatus'
import Spinner from './Spinner'

export const PrivateRoute = () => {
  const { loggedIn, IsLoading } = useAuthStatus()

  const navigate = useNavigate()

  if (IsLoading) {
    return <Spinner />
  }

  return loggedIn ? <Outlet /> : navigate('/login')
}
