import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useAuth } from "../lib/auth-context"

function LoginPage() {
  const navigate = useNavigate()
  const { configured, loading, user, loginWithGoogle, loginWithEmail, registerWithEmail, resetPasswordEmail } = useAuth()
  const [authMode, setAuthMode] = useState("signin")
  const [status, setStatus] = useState("Google অথবা Email/Password দিয়ে sign in করুন।")
  const [statusType, setStatusType] = useState("info")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fieldErrors, setFieldErrors] = useState({ email: "", password: "" })
  const [signingIn, setSigningIn] = useState(false)

  useEffect(() => {
    if (!loading && user) {
      navigate("/", { replace: true })
    }
  }, [loading, user, navigate])

  const clearFieldError = (fieldName) => {
    setFieldErrors((currentErrors) => ({ ...currentErrors, [fieldName]: "" }))
  }

  const validateAuthFields = () => {
    const nextErrors = { email: "", password: "" }
    const trimmedEmail = email.trim()

    if (!trimmedEmail) {
      nextErrors.email = "Email দিন।"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      nextErrors.email = "সঠিক Email address দিন।"
    }

    if (!password.trim()) {
      nextErrors.password = "Password দিন।"
    } else if (password.length < 6) {
      nextErrors.password = "Password কমপক্ষে ৬ অক্ষরের হতে হবে।"
    }

    setFieldErrors(nextErrors)
    return !nextErrors.email && !nextErrors.password
  }

  const handleGoogleLogin = async () => {
    if (!configured) {
      setStatus("Google login চালু করতে আগে src/lib/firebaseConfig.js এ Firebase config বসান।")
      setStatusType("error")
      return
    }

    try {
      setSigningIn(true)
      setStatus("Google popup open হচ্ছে...")
      setStatusType("info")
      await loginWithGoogle()
      setStatus("Login successful. Redirecting...")
      setStatusType("success")
      navigate("/", { replace: true })
    } catch (error) {
      setStatus(error.message || "Google login failed.")
      setStatusType("error")
      setSigningIn(false)
    }
  }

  const handleEmailAuth = async (event) => {
    event.preventDefault()
    setFieldErrors({ email: "", password: "" })

    if (!configured) {
      setStatus("Email login চালু করতে আগে src/lib/firebaseConfig.js এ Firebase config বসান।")
      setStatusType("error")
      return
    }

    if (!validateAuthFields()) {
      setStatus("Form-এর ভুলগুলো ঠিক করে আবার চেষ্টা করুন।")
      setStatusType("error")
      return
    }

    try {
      setSigningIn(true)
      setStatus(authMode === "signin" ? "Signing in with Email..." : "Account create হচ্ছে...")
      setStatusType("info")

      if (authMode === "signin") {
        await loginWithEmail({ email: email.trim(), password })
      } else {
        await registerWithEmail({ email: email.trim(), password })
      }

      setStatus("Authentication successful. Redirecting...")
      setStatusType("success")
      navigate("/", { replace: true })
    } catch (error) {
      setStatus(error.message || "Email authentication failed.")
      setStatusType("error")
      setSigningIn(false)
    }
  }

  const handleForgotPassword = async () => {
    setFieldErrors((currentErrors) => ({ ...currentErrors, email: "" }))

    if (!configured) {
      setStatus("Password reset চালু করতে আগে src/lib/firebaseConfig.js এ Firebase config বসান।")
      setStatusType("error")
      return
    }

    if (!email.trim()) {
      setFieldErrors((currentErrors) => ({ ...currentErrors, email: "Reset link পাঠাতে Email দিন।" }))
      setStatus("Reset link পাঠাতে আগে Email লিখুন।")
      setStatusType("error")
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setFieldErrors((currentErrors) => ({ ...currentErrors, email: "সঠিক Email address দিন।" }))
      setStatus("সঠিক Email address দিয়ে আবার চেষ্টা করুন।")
      setStatusType("error")
      return
    }

    try {
      setSigningIn(true)
      setStatus("Password reset link পাঠানো হচ্ছে...")
      setStatusType("info")
      await resetPasswordEmail({ email: email.trim() })
      setStatus("Password reset email sent. Inbox/Spam check করুন।")
      setStatusType("success")
    } catch (error) {
      setStatus(error.message || "Password reset failed.")
      setStatusType("error")
    } finally {
      setSigningIn(false)
    }
  }

  return (
    <div className="login-body">
      <div className="login-shell">
        <div className="login-card">
          <div className="login-badge">🐮</div>
          <p className="login-kicker">Domestic Animal Disease Detection</p>
          <h1>Login to Continue</h1>
          <p className="login-text">
            আপনার Google account অথবা Email/Password দিয়ে secure ভাবে sign in করুন। Login হলে
            dashboard এ automatic redirect হবে।
          </p>

          <div className="auth-mode-switch" role="tablist" aria-label="Authentication mode">
            <button
              className={`auth-mode-btn ${authMode === "signin" ? "active" : ""}`}
              type="button"
              onClick={() => setAuthMode("signin")}
            >
              Email Sign In
            </button>
            <button
              className={`auth-mode-btn ${authMode === "signup" ? "active" : ""}`}
              type="button"
              onClick={() => setAuthMode("signup")}
            >
              Create Account
            </button>
          </div>

          <form className="auth-form" onSubmit={handleEmailAuth}>
            <input
              className={`auth-input ${fieldErrors.email ? "has-error" : ""}`}
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value)
                clearFieldError("email")
              }}
              autoComplete="email"
            />
            {fieldErrors.email && <p className="field-error">{fieldErrors.email}</p>}
            <input
              className={`auth-input ${fieldErrors.password ? "has-error" : ""}`}
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value)
                clearFieldError("password")
              }}
              autoComplete={authMode === "signin" ? "current-password" : "new-password"}
            />
            {fieldErrors.password && <p className="field-error">{fieldErrors.password}</p>}
            <button className="email-login-btn" type="submit" disabled={signingIn || loading}>
              {signingIn
                ? "Please wait..."
                : authMode === "signin"
                  ? "Sign In with Email"
                  : "Create Account"}
            </button>
            {authMode === "signin" && (
              <button
                className="forgot-password-btn"
                type="button"
                onClick={handleForgotPassword}
                disabled={signingIn || loading}
              >
                Forgot password?
              </button>
            )}
          </form>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <div className="login-features">
            <div className="login-feature">🔐 Secure Google sign-in</div>
            <div className="login-feature">📊 Access dashboard & reports</div>
            <div className="login-feature">🩺 Track animal health records</div>
          </div>

          <button className="google-login-btn" onClick={handleGoogleLogin} disabled={signingIn || loading}>
            {signingIn ? "Signing in..." : configured ? "Continue with Google" : "Configure Firebase First"}
          </button>
          <p className={`auth-status ${statusType}`}>{status}</p>

          <div className="login-note">
            <strong>Setup note:</strong>
            <span>
              Firebase config না দিলে Google login কাজ করবে না। Config বসানোর পর GitHub Pages
              থেকেও login করা যাবে।
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
