import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function useAuthStatus() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const { user } = useSelector(state => state.auth)

  useEffect(() => {
    if (user) {
      setLoggedIn(true)
    } else {
      setIsLoading(false)
    }

    setIsLoading(false)
  }, [user])

  return { loggedIn, isLoading }
}
