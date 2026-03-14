import { Navigate, Route, Routes } from "react-router-dom"
import AppShell from "./components/AppShell"
import DashboardPage from "./pages/DashboardPage"
import UploadPage from "./pages/UploadPage"
import SymptomsPage from "./pages/SymptomsPage"
import ResultPage from "./pages/ResultPage"
import HistoryPage from "./pages/HistoryPage"
import LoginPage from "./pages/LoginPage"
import ProfilePage from "./pages/ProfilePage"
import WelcomePage from "./pages/WelcomePage"
import { useAuth } from "./lib/auth-context"

function ProtectedPage({ children }) {
  const { configured, loading, user } = useAuth()

  if (loading) {
    return <div className="login-body">Checking login status...</div>
  }

  // Firebase configured থাকলে login enforce করো
  if (configured && !user) {
    return <Navigate to="/welcome" replace />
  }

  // Firebase configured না থাকলে demo mode এ সরাসরি page দেখাও
  return <AppShell>{children}</AppShell>
}

function App() {
  return (
    <Routes>
      <Route path="/welcome" element={<WelcomePage />} />
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
      <Route
        path="/profile"
        element={
          <ProtectedPage>
            <ProfilePage />
          </ProtectedPage>
        }
      />

      <Route path="*" element={<Navigate to="/welcome" replace />} />
    </Routes>
  )
}

export default App
