import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../lib/auth-context"

function WelcomePage() {
  const navigate = useNavigate()
  const { loading, user } = useAuth()

  useEffect(() => {
    if (!loading && user) {
      navigate("/", { replace: true })
    }
  }, [loading, user, navigate])

  return (
    <div className="login-body">
      <div className="login-shell">
        <div className="login-card welcome-card">
          <div className="login-badge">🐮</div>
          <p className="login-kicker">Domestic Animal Disease Detection</p>
          <h1>Welcome</h1>
          <p className="login-text">
            AI powered animal disease detection platform-এ স্বাগতম। Continue চাপলে Login / Signup
            screen open হবে।
          </p>

          <button className="google-login-btn" type="button" onClick={() => navigate("/login")}>
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}

export default WelcomePage
