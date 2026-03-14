import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../lib/auth-context"

function WelcomePage() {
  const navigate = useNavigate()
  const { loading, user } = useAuth()
  const animals = [
    { icon: "🐄", name: "Cattle", delay: "0s" },
    { icon: "🐐", name: "Goat", delay: "0.4s" },
    { icon: "🐑", name: "Sheep", delay: "0.8s" },
    { icon: "🐃", name: "Buffalo", delay: "1.2s" },
    { icon: "🐖", name: "Pig", delay: "1.6s" },
    { icon: "🐓", name: "Poultry", delay: "2s" }
  ]

  useEffect(() => {
    if (!loading && user) {
      navigate("/", { replace: true })
    }
  }, [loading, user, navigate])

  return (
    <div className="welcome-page">
      <div className="welcome-glow welcome-glow-left" />
      <div className="welcome-glow welcome-glow-right" />

      <div className="welcome-shell">
        <section className="welcome-hero">
          <p className="welcome-kicker">Domestic Animal Disease Detection</p>
          <h1>
            Welcome to a smarter
            <span> Veterinary Screening Experience</span>
          </h1>
          <p className="welcome-copy">
            AI সহায়তায় animal disease early detect করুন, records track করুন, আর দ্রুত treatment decision
            নিন. Login বা Signup দিয়ে শুরু করুন।
          </p>

          <div className="welcome-actions">
            <button className="welcome-btn welcome-btn-primary" type="button" onClick={() => navigate("/login?mode=signin")}>
              Login
            </button>
            <button className="welcome-btn welcome-btn-secondary" type="button" onClick={() => navigate("/login?mode=signup")}>
              Signup
            </button>
          </div>

          <div className="welcome-meta">
            <span>⚡ Fast prediction</span>
            <span>🔒 Secure auth</span>
            <span>📊 Health records</span>
          </div>
        </section>

        <section className="welcome-stage" aria-hidden="true">
          <div className="welcome-stage-core">
            <div className="welcome-mascot">🐮</div>
            <p>Animal Health AI</p>
          </div>

          <div className="welcome-animal-orbit">
            {animals.map((animal) => (
              <div className="animal-chip" key={animal.name} style={{ animationDelay: animal.delay }}>
                <span>{animal.icon}</span>
                <small>{animal.name}</small>
              </div>
            ))}
          </div>

          <div className="welcome-grid-lines" />
        </section>
      </div>
    </div>
  )
}

export default WelcomePage
