import { NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "../lib/auth-context"

function Sidebar() {
  const navigate = useNavigate()
  const { configured, logoutUser } = useAuth()

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">🐮</div>
        <h2>Animal AI</h2>
      </div>

      <NavLink to="/" end>
        📊 Dashboard
      </NavLink>
      <NavLink to="/upload">📷 Upload Image</NavLink>
      <NavLink to="/symptoms">📝 Enter Symptoms</NavLink>
      <NavLink to="/history">📚 Disease History</NavLink>
      <a
        href="#"
        className="logout-link"
        onClick={async (event) => {
          event.preventDefault()
          if (configured) {
            await logoutUser()
          }
          navigate("/login")
        }}
      >
        🚪 Log Out
      </a>
    </div>
  )
}

export default Sidebar
