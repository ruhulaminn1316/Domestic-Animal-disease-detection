import { initializeApp } from "firebase/app"
import { getAnalytics, isSupported as isAnalyticsSupported } from "firebase/analytics"
import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updatePassword,
  updateProfile
} from "firebase/auth"
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp
} from "firebase/firestore"
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"
import { firebaseConfig } from "./firebaseConfig"

const requiredKeys = ["apiKey", "authDomain", "projectId", "appId"]

const authErrorMessages = {
  "auth/account-exists-with-different-credential": "এই Email দিয়ে অন্য sign-in method already আছে।",
  "auth/admin-restricted-operation": "Firebase Console-এ এই auth feature enable করা নেই বা restricted আছে।",
  "auth/configuration-not-found": "Firebase Authentication configuration incomplete। Console-এ provider setup check করুন।",
  "auth/email-already-in-use": "এই Email address দিয়ে আগে থেকেই account খোলা আছে।",
  "auth/internal-error": "Firebase side-এ configuration error আছে। Console settings check করুন।",
  "auth/invalid-api-key": "Firebase API key বা project config সঠিক নয়।",
  "auth/invalid-credential": "Email অথবা Password সঠিক নয়।",
  "auth/invalid-email": "সঠিক Email address দিন।",
  "auth/missing-password": "Password দিন।",
  "auth/network-request-failed": "Network সমস্যা হয়েছে। Internet connection check করুন।",
  "auth/operation-not-allowed": "Firebase Console-এ এই sign-in method enable করা নেই। Authentication > Sign-in method থেকে enable করুন।",
  "auth/popup-blocked": "Browser popup block করেছে। Popup allow করে আবার চেষ্টা করুন।",
  "auth/popup-closed-by-user": "Google login popup বন্ধ করা হয়েছে। আবার চেষ্টা করুন।",
  "auth/too-many-requests": "অনেকবার চেষ্টা করা হয়েছে। কিছুক্ষণ পরে আবার চেষ্টা করুন।",
  "auth/unauthorized-domain": "এই domain Firebase Authentication-এ authorized নয়। Firebase Console > Authentication > Settings > Authorized domains-এ add করুন।",
  "auth/user-disabled": "এই account disable করা আছে।",
  "auth/user-not-found": "এই Email দিয়ে কোনো account পাওয়া যায়নি।",
  "auth/weak-password": "Password কমপক্ষে ৬ অক্ষরের হতে হবে।",
  "auth/wrong-password": "Password সঠিক নয়।"
}

const isConfigured = requiredKeys.every((key) => {
  const value = firebaseConfig[key]
  return typeof value === "string" && value.trim() !== "" && !value.includes("YOUR_")
})

let auth = null
let googleProvider = null
let db = null
let storage = null
let app = null
let analyticsInitialized = false

if (isConfigured) {
  app = initializeApp(firebaseConfig)
  auth = getAuth(app)
  db = getFirestore(app)
  storage = firebaseConfig.storageBucket ? getStorage(app) : null
  googleProvider = new GoogleAuthProvider()
  googleProvider.setCustomParameters({ prompt: "select_account" })
}

function normalizeAuthError(error, fallbackMessage) {
  const code = error?.code
  const message = authErrorMessages[code]
  const normalizedError = new Error(message || fallbackMessage)
  normalizedError.code = code || "unknown"
  normalizedError.originalMessage = error?.message || ""
  return normalizedError
}

function normalizeStorageError(error, fallbackMessage) {
  const code = error?.code
  const storageMessages = {
    "storage/object-not-found": "Upload করা file পাওয়া যায়নি। আবার চেষ্টা করুন।",
    "storage/unauthorized": "Firebase Storage rules এই upload allow করছে না। Storage rules check করুন।",
    "storage/canceled": "Upload cancel করা হয়েছে।",
    "storage/unknown": "Firebase Storage error হয়েছে। Storage bucket/config check করুন।"
  }
  const normalizedError = new Error(storageMessages[code] || fallbackMessage)
  normalizedError.code = code || "unknown"
  normalizedError.originalMessage = error?.message || ""
  return normalizedError
}

function buildDisplayNameFromEmail(email) {
  const localPart = email.split("@")[0] || "User"
  return localPart
    .replace(/[._-]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ")
}

export async function initializeAnalyticsIfSupported() {
  if (!app || analyticsInitialized || typeof window === "undefined") {
    return null
  }

  const supported = await isAnalyticsSupported()
  if (!supported) {
    return null
  }

  analyticsInitialized = true
  return getAnalytics(app)
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
  try {
    return await signInWithPopup(auth, googleProvider)
  } catch (error) {
    throw normalizeAuthError(error, "Google login failed. আবার চেষ্টা করুন।")
  }
}

export async function loginWithEmail({ email, password }) {
  if (!auth) {
    throw new Error("Firebase config missing. Update src/lib/firebaseConfig.js first.")
  }
  try {
    return await signInWithEmailAndPassword(auth, email, password)
  } catch (error) {
    throw normalizeAuthError(error, "Email sign in failed. আবার চেষ্টা করুন।")
  }
}

export async function registerWithEmail({ email, password }) {
  if (!auth) {
    throw new Error("Firebase config missing. Update src/lib/firebaseConfig.js first.")
  }
  try {
    const credential = await createUserWithEmailAndPassword(auth, email, password)
    if (credential.user && !credential.user.displayName) {
      await updateProfile(credential.user, {
        displayName: buildDisplayNameFromEmail(email)
      })
    }
    return credential
  } catch (error) {
    throw normalizeAuthError(error, "Account create করা যায়নি। আবার চেষ্টা করুন।")
  }
}

export async function resetPasswordEmail({ email }) {
  if (!auth) {
    throw new Error("Firebase config missing. Update src/lib/firebaseConfig.js first.")
  }
  try {
    return await sendPasswordResetEmail(auth, email)
  } catch (error) {
    throw normalizeAuthError(error, "Password reset email পাঠানো যায়নি। আবার চেষ্টা করুন।")
  }
}

export async function updateUserProfileDetails({ displayName, photoURL }) {
  if (!auth || !auth.currentUser) {
    throw new Error("Login session পাওয়া যায়নি। আবার sign in করুন।")
  }

  try {
    await updateProfile(auth.currentUser, {
      displayName: displayName.trim(),
      photoURL: photoURL.trim() || null
    })
    return auth.currentUser
  } catch (error) {
    throw normalizeAuthError(error, "Profile update করা যায়নি। আবার চেষ্টা করুন।")
  }
}

export async function changeUserPassword({ currentPassword, newPassword }) {
  if (!auth || !auth.currentUser) {
    throw new Error("Login session পাওয়া যায়নি। আবার sign in করুন।")
  }

  const isEmailUser = auth.currentUser.providerData.some((provider) => provider.providerId === "password")
  if (!isEmailUser || !auth.currentUser.email) {
    throw new Error("এই account-এর password এখানে change করা যাবে না। প্রয়োজন হলে password reset ব্যবহার করুন।")
  }

  try {
    const credential = EmailAuthProvider.credential(auth.currentUser.email, currentPassword)
    await reauthenticateWithCredential(auth.currentUser, credential)
    await updatePassword(auth.currentUser, newPassword)
    return auth.currentUser
  } catch (error) {
    throw normalizeAuthError(error, "Password change করা যায়নি। আবার চেষ্টা করুন।")
  }
}

export async function uploadProfilePhoto(file) {
  if (!storage || !auth || !auth.currentUser) {
    throw new Error("Profile photo upload চালু নেই। Firebase Storage config check করুন।")
  }

  if (!file) {
    throw new Error("একটি image file select করুন।")
  }

  if (!file.type.startsWith("image/")) {
    throw new Error("শুধু image file upload করা যাবে।")
  }

  const maxSizeInBytes = 2 * 1024 * 1024
  if (file.size > maxSizeInBytes) {
    throw new Error("Image size 2MB এর মধ্যে হতে হবে।")
  }

  try {
    const fileExtension = file.name.split(".").pop()?.toLowerCase() || "jpg"
    const storageRef = ref(storage, `profile-photos/${auth.currentUser.uid}/${Date.now()}.${fileExtension}`)
    await uploadBytes(storageRef, file, {
      contentType: file.type
    })
    return await getDownloadURL(storageRef)
  } catch (error) {
    throw normalizeStorageError(error, "Photo upload করা যায়নি। আবার চেষ্টা করুন।")
  }
}

export async function logoutUser() {
  if (!auth) return
  await signOut(auth)
}

export async function savePrediction({ userId, disease, confidence, animalType }) {
  if (!db) return null
  const docRef = await addDoc(collection(db, "predictions"), {
    userId,
    disease,
    confidence,
    animalType,
    status: "Ongoing",
    createdAt: serverTimestamp()
  })
  return docRef.id
}

export async function getUserHistory(userId) {
  if (!db) return []
  const q = query(
    collection(db, "predictions"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
}
