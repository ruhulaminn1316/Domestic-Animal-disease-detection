import { NavLink, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useAuth } from "../lib/auth-context"

function Sidebar() {
  const navigate = useNavigate()
  const { configured, logoutUser } = useAuth()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true)
      if (configured) {
        await logoutUser()
      }
      navigate("/login")
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">🐮</div>
        <h2>Domestic Animal<br/>Disease Detection</h2>
      </div>

      <NavLink to="/" end>
        📊 Dashboard
      </NavLink>
      <NavLink to="/upload">📷 Upload Image</NavLink>
      <NavLink to="/symptoms">📝 Enter Symptoms</NavLink>
      <NavLink to="/history">📚 Disease History</NavLink>
      <NavLink to="/profile">👤 Edit Profile</NavLink>
      <button
        type="button"
        className="sidebar-logout-btn"
        onClick={handleLogout}
        disabled={isLoggingOut}
      >
        {isLoggingOut ? "⏳ Logging out..." : "🚪 Log Out"}
      </button>
    </div>
  )
}

export default Sidebar
