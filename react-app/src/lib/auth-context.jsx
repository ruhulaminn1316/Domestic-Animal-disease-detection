import { createContext, useContext, useEffect, useMemo, useState } from "react"
import {
  isFirebaseConfigured,
  loginWithGoogle,
  logoutUser,
  subscribeToAuth
} from "./firebase"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isFirebaseConfigured()) {
      setLoading(false)
      return
    }

    const unsubscribe = subscribeToAuth((nextUser) => {
      setUser(nextUser)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = useMemo(
    () => ({
      user,
      loading,
      configured: isFirebaseConfigured(),
      loginWithGoogle,
      logoutUser
    }),
    [user, loading]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
