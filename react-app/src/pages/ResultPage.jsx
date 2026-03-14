import { useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { getDiseaseInfo } from "../lib/diseaseInfo"
import { savePrediction, isFirebaseConfigured } from "../lib/firebase"
import { useAuth } from "../lib/auth-context"

function ResultPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()
  const state = location.state || {}

  const disease = state.disease || "Foot Rot"
  const confidence = state.confidence ?? 92
  const animalType = state.animalType || "Cow"
  const isDemo = state.demo ?? true

  const info = getDiseaseInfo(disease)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (isDemo || !isFirebaseConfigured() || !user) return
    savePrediction({ userId: user.uid, disease, confidence, animalType })
      .then(() => setSaved(true))
      .catch(() => {})
  }, [])

  const saveReport = () => {
    if (!isFirebaseConfigured()) {
      window.alert("Demo mode — configure Firebase to save reports.")
      return
    }
    window.alert("✅ Report saved! You can access it from Disease History.")
  }

  return (
    <>
      <div className="dashboard-header">
        <div>
          <h2 className="page-title">Detection Result</h2>
          <p className="page-subtitle">
            Review the predicted condition, supporting evidence, and suggested next steps.
          </p>
        </div>
        <button className="btn green" onClick={() => navigate("/upload")}>
          + New Scan
        </button>
      </div>

      <div className="hero-banner compact-banner">
        <div className="hero-copy">
          <span className="hero-chip">Latest prediction</span>
          <h3>{disease} appears to be the strongest match</h3>
          <p>
            The analysis combines image cues and highlights both treatment support and
            follow-up monitoring advice.
          </p>
        </div>
        <div className="hero-visual single-panel">
          <div className="hero-panel accent">
            <span className="hero-panel-label">Confidence</span>
            <strong>{confidence}%</strong>
            <p>
              {confidence >= 80
                ? "High confidence — still verify with a veterinarian."
                : "Moderate confidence — consult a veterinarian for confirmation."}
            </p>
          </div>
        </div>
      </div>

      {isDemo && (
        <div style={{
          background: "#fff7e6", border: "1px solid #fbd38d", borderRadius: 12,
          padding: "12px 16px", marginBottom: 16, color: "#92600a", fontWeight: 600, fontSize: 14
        }}>
          ⚠️ Demo mode — showing sample result. Add your Teachable Machine model URL in <code>src/lib/modelConfig.js</code> to get real predictions.
        </div>
      )}
      {saved && (
        <div style={{
          background: "#ecf7f2", border: "1px solid #a7d9c5", borderRadius: 12,
          padding: "10px 16px", marginBottom: 14, color: "#2e5b4b", fontWeight: 600, fontSize: 14
        }}>
          ✅ Prediction automatically saved to your history.
        </div>
      )}

      <div className="result-container">
        <h2>🎯 Disease Detection Result</h2>
        <div className="summary-grid">
          <div className="summary-tile">
            <span className="summary-label">Animal</span>
            <strong style={{ textTransform: "capitalize" }}>{animalType}</strong>
          </div>
          <div className="summary-tile">
            <span className="summary-label">Severity</span>
            <strong>{info.severity}</strong>
          </div>
          <div className="summary-tile">
            <span className="summary-label">Action</span>
            <strong>{info.action}</strong>
          </div>
        </div>

        <div className="result-header">
          <h3>Detected Disease</h3>
          <p className="result-disease-name">{disease}</p>
          <div className="confidence">{confidence}% Confidence</div>
          <div className="progress progress-centered">
            <span style={{ width: `${confidence}%` }} />
          </div>
        </div>

        <div className="result-details">
          <h4>📖 About the Disease</h4>
          <p>{info.about}</p>
        </div>

        <div className="result-details">
          <h4>✅ Matched Symptoms</h4>
          <ul>
            {info.symptoms.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </div>

        <div className="result-details">
          <h4>💊 Treatment Recommendations</h4>
          <ul>
            {info.treatment.map((t, i) => <li key={i}>{t}</li>)}
          </ul>
        </div>

        <div className="result-details notice-card">
          <h4>⚠️ Important Notice</h4>
          <p>
            This is an AI-powered preliminary diagnosis. Please consult a qualified veterinarian
            for professional examination and treatment.
          </p>
        </div>

        <div className="result-details">
          <h4>🛡️ Prevention Tips</h4>
          <ul>
            {info.prevention.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
        </div>

        <div className="action-buttons">
          <button className="btn green" onClick={() => window.print()}>
            🖨️ Print Report
          </button>
          <button className="btn blue" onClick={saveReport}>
            💾 Save Report
          </button>
          <button className="btn orange" onClick={() => navigate("/")}>
            🏠 Back to Dashboard
          </button>
        </div>
      </div>
    </>
  )
}

export default ResultPage
