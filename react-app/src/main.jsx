import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import "./styles.css"
import { AuthProvider } from "./lib/auth-context"
import { initializeAnalyticsIfSupported } from "./lib/firebase"

initializeAnalyticsIfSupported().catch(() => {
  // Analytics is optional; auth and Firestore should continue to work even if it fails.
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
)
