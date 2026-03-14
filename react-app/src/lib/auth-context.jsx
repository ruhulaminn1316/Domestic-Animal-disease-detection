import { createContext, useContext, useEffect, useMemo, useState } from "react"
import {
  changeUserPassword,
  isFirebaseConfigured,
  loginWithEmail,
  loginWithGoogle,
  resetPasswordEmail,
  registerWithEmail,
  logoutUser,
  subscribeToAuth,
  uploadProfilePhoto,
  updateUserProfileDetails
} from "./firebase"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [profileVersion, setProfileVersion] = useState(0)

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

  const saveUserProfile = async (profileData) => {
    const updatedUser = await updateUserProfileDetails(profileData)
    setProfileVersion((currentVersion) => currentVersion + 1)
    return updatedUser
  }

  const value = useMemo(
    () => ({
      user,
      loading,
      configured: isFirebaseConfigured(),
      changeUserPassword,
      loginWithEmail,
      loginWithGoogle,
      resetPasswordEmail,
      registerWithEmail,
      saveUserProfile,
      uploadProfilePhoto,
      logoutUser
    }),
    [user, loading, profileVersion]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
