import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useAuth } from "../lib/auth-context"

function LoginPage() {
  const navigate = useNavigate()
  const { configured, loading, user, loginWithGoogle } = useAuth()
  const [status, setStatus] = useState("আপনার Google account দিয়ে sign in করুন।")
  const [signingIn, setSigningIn] = useState(false)

  useEffect(() => {
    if (!loading && user) {
      navigate("/", { replace: true })
    }
  }, [loading, user, navigate])

  const handleGoogleLogin = async () => {
    if (!configured) {
      setStatus("Google login চালু করতে আগে src/lib/firebaseConfig.js এ Firebase config বসান।")
      return
    }

    try {
      setSigningIn(true)
      setStatus("Google popup open হচ্ছে...")
      await loginWithGoogle()
      setStatus("Login successful. Redirecting...")
      navigate("/", { replace: true })
    } catch (error) {
      setStatus(error.message || "Google login failed.")
      setSigningIn(false)
    }
  }

  return (
    <div className="login-body">
      <div className="login-shell">
        <div className="login-card">
          <div className="login-badge">🐮</div>
          <p className="login-kicker">Animal AI</p>
          <h1>Login with Google</h1>
          <p className="login-text">
            আপনার Gmail / Google account দিয়ে secure ভাবে sign in করুন। Login হলে dashboard এ
            automatic redirect হবে।
          </p>

          <div className="login-features">
            <div className="login-feature">🔐 Secure Google sign-in</div>
            <div className="login-feature">📊 Access dashboard & reports</div>
            <div className="login-feature">🩺 Track animal health records</div>
          </div>

          <button className="google-login-btn" onClick={handleGoogleLogin} disabled={signingIn || loading}>
            {signingIn ? "Signing in..." : configured ? "Continue with Google" : "Configure Firebase First"}
          </button>
          <p className="auth-status">{status}</p>

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
