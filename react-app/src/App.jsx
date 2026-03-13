import { Navigate, Route, Routes } from "react-router-dom"
import AppShell from "./components/AppShell"
import DashboardPage from "./pages/DashboardPage"
import UploadPage from "./pages/UploadPage"
import SymptomsPage from "./pages/SymptomsPage"
import ResultPage from "./pages/ResultPage"
import HistoryPage from "./pages/HistoryPage"
import LoginPage from "./pages/LoginPage"
import { useAuth } from "./lib/auth-context"

function ProtectedPage({ children }) {
  const { configured, loading, user } = useAuth()

  if (loading) {
    return <div className="login-body">Checking login status...</div>
  }

  if (!configured) {
    return <Navigate to="/login" replace />
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <AppShell>{children}</AppShell>
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/"
        element={
          <ProtectedPage>
            <DashboardPage />
          </ProtectedPage>
        }
      />
      <Route
        path="/upload"
        element={
          <ProtectedPage>
            <UploadPage />
          </ProtectedPage>
        }
      />
      <Route
        path="/symptoms"
        element={
          <ProtectedPage>
            <SymptomsPage />
          </ProtectedPage>
        }
      />
      <Route
        path="/result"
        element={
          <ProtectedPage>
            <ResultPage />
          </ProtectedPage>
        }
      />
      <Route
        path="/history"
        element={
          <ProtectedPage>
            <HistoryPage />
          </ProtectedPage>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
