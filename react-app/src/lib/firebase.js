import { initializeApp } from "firebase/app"
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut
} from "firebase/auth"
import { firebaseConfig } from "./firebaseConfig"

const requiredKeys = ["apiKey", "authDomain", "projectId", "appId"]

const isConfigured = requiredKeys.every((key) => {
  const value = firebaseConfig[key]
  return typeof value === "string" && value.trim() !== "" && !value.includes("YOUR_")
})

let auth = null
let googleProvider = null

if (isConfigured) {
  const app = initializeApp(firebaseConfig)
  auth = getAuth(app)
  googleProvider = new GoogleAuthProvider()
  googleProvider.setCustomParameters({ prompt: "select_account" })
}

export function isFirebaseConfigured() {
  return isConfigured
}

export function subscribeToAuth(callback) {
  if (!auth) {
    callback(null)
    return () => {}
  }

  return onAuthStateChanged(auth, callback)
}

export async function loginWithGoogle() {
  if (!auth || !googleProvider) {
    throw new Error("Firebase config missing. Update src/lib/firebaseConfig.js first.")
  }

  return signInWithPopup(auth, googleProvider)
}

export async function logoutUser() {
  if (!auth) {
    return
  }

  await signOut(auth)
}
