import Sidebar from "./Sidebar"
import Topbar from "./Topbar"

function AppShell({ children }) {
  return (
    <div className="app">
      <Sidebar />
      <div className="main">
        <Topbar />
        <div className="content">{children}</div>
      </div>
    </div>
  )
}

export default AppShell
