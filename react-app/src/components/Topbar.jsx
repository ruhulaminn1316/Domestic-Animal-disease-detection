import { useAuth } from "../lib/auth-context"

function Topbar() {
  const { user } = useAuth()
  const displayName = user?.displayName || user?.email?.split("@")[0] || "Guest User"
  const email = user?.email || "Local access"
  const initials = (displayName.trim().charAt(0).toUpperCase() || "G").replace("'", "")
  const avatarSvg = `<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'><rect fill='%233f7f73' width='40' height='40' rx='20'/><text x='20' y='28' text-anchor='middle' fill='white' font-size='20' font-family='Arial'>${initials}</text></svg>`
  const avatarSrc = user?.photoURL || `data:image/svg+xml,${encodeURIComponent(avatarSvg)}`

  return (
    <div className="topbar">
      <h3>
        <span className="topbar-logo">🐮</span> Domestic Animal Disease Detection
      </h3>
      <div className="topbar-user">
        <img className="user-avatar" src={avatarSrc} alt={displayName} referrerPolicy="no-referrer" />
        <div className="topbar-user-meta">
          <strong className="user-name">{displayName}</strong>
          <span className="topbar-email">{email}</span>
        </div>
      </div>
    </div>
  )
}

export default Topbar
