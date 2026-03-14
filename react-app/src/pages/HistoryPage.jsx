import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { getUserHistory, isFirebaseConfigured } from "../lib/firebase"
import { useAuth } from "../lib/auth-context"

const DEMO_RECORDS = [
  { id: "1", disease: "Foot Rot", animalType: "Cow", confidence: 92, status: "Ongoing", createdAt: { seconds: Date.now() / 1000 - 86400 } },
  { id: "2", disease: "Mouth Ulcer", animalType: "Goat", confidence: 84, status: "Recovered", createdAt: { seconds: Date.now() / 1000 - 86400 * 3 } },
  { id: "3", disease: "Mastitis", animalType: "Cow", confidence: 88, status: "Recovered", createdAt: { seconds: Date.now() / 1000 - 86400 * 8 } },
  { id: "4", disease: "Dermatitis", animalType: "Sheep", confidence: 79, status: "Monitoring", createdAt: { seconds: Date.now() / 1000 - 86400 * 11 } },
]

function formatDate(record) {
  if (!record.createdAt) return "Unknown date"
  const ts = record.createdAt.seconds ? record.createdAt.seconds * 1000 : record.createdAt
  return new Date(ts).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
}

function HistoryPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const isDemo = !isFirebaseConfigured()

  useEffect(() => {
    if (isDemo || !user) {
      setRecords(DEMO_RECORDS)
      setLoading(false)
      return
    }
    getUserHistory(user.uid)
      .then((data) => {
        setRecords(data.length > 0 ? data : DEMO_RECORDS)
        setLoading(false)
      })
      .catch(() => {
        setRecords(DEMO_RECORDS)
        setLoading(false)
      })
  }, [user])

  const recovered = records.filter((r) => r.status === "Recovered").length
  const open = records.filter((r) => r.status !== "Recovered").length
  const topDisease = records.length > 0 ? records[0].disease : "—"
  const recoveryPct = records.length > 0 ? Math.round((recovered / records.length) * 100) : 0

  return (
    <>
      <div className="dashboard-header">
        <div>
          <h2 className="page-title">Disease History</h2>
          <p className="page-subtitle">Review recent detections and health records</p>
        </div>
        <button className="btn blue" onClick={() => navigate("/")}>
          🏠 Back to Dashboard
        </button>
      </div>

      {isDemo && (
        <div style={{
          background: "#fff7e6", border: "1px solid #fbd38d", borderRadius: 12,
          padding: "10px 16px", marginBottom: 14, color: "#92600a", fontWeight: 600, fontSize: 14
        }}>
          ⚠️ Demo mode — showing sample history. Configure Firebase to see your real records.
        </div>
      )}

      <div className="hero-banner compact-banner">
        <div className="hero-copy">
          <span className="hero-chip">Case tracking</span>
          <h3>Keep disease records organized for better follow-up care</h3>
          <p>Use the history view to spot recurring illnesses and prioritize animals that still need monitoring.</p>
        </div>
        <div className="hero-visual single-panel">
          <div className="hero-panel">
            <span className="hero-panel-label">Recovery rate</span>
            <strong>{recoveryPct}%</strong>
            <p>{recovered} of {records.length} records are marked as recovered.</p>
          </div>
        </div>
      </div>

      <div className="stats-row">
        <div className="card stat-chip">
          <div>
            <p className="stat-label">Open Cases</p>
            <h3 className="stat-value">{open}</h3>
          </div>
          <span className="stat-tag">Need follow-up</span>
        </div>
        <div className="card stat-chip">
          <div>
            <p className="stat-label">Recovered</p>
            <h3 className="stat-value">{recovered}</h3>
          </div>
          <span className="stat-tag">Last 30 days</span>
        </div>
        <div className="card stat-chip">
          <div>
            <p className="stat-label">Latest Disease</p>
            <h3 className="stat-value" style={{ fontSize: 18 }}>{topDisease}</h3>
          </div>
          <span className="stat-tag">Most recent</span>
        </div>
      </div>

      <div className="dashboard-layout">
        <div className="stack">
          <div className="card panel">
            <h3>Recent Cases</h3>
            {loading ? (
              <p style={{ color: "var(--ink-500)", marginTop: 12 }}>Loading...</p>
            ) : records.length === 0 ? (
              <p style={{ color: "var(--ink-500)", marginTop: 12 }}>No records yet. Upload an image to start.</p>
            ) : (
              records.slice(0, 8).map((r) => (
                <div className="history-item" key={r.id}>
                  <div>
                    <p className="history-title">{r.disease}</p>
                    <p className="history-meta">{formatDate(r)} · {r.animalType} · {r.confidence}% confidence</p>
                  </div>
                  <span className={`history-status${r.status !== "Recovered" ? " warning" : ""}`}>
                    {r.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="stack">
          <div className="card result-card">
            <h3>History Summary</h3>
            <strong>{records.length} Total Records</strong>
            <p className="stat-label">Recovery Rate</p>
            <div className="progress">
              <span style={{ width: `${recoveryPct}%` }} />
            </div>
            <p className="confidence-text">{recovered} recovered</p>
            <button className="btn green" onClick={() => navigate("/upload")}>
              + New Detection
            </button>
          </div>

          <div className="card panel">
            <h3>Recommended Follow-up</h3>
            <div className="hero-list compact">
              <div>Check ongoing hoof infections within the next 48 hours.</div>
              <div>Review any fever cases for shared environmental causes.</div>
              <div>Attach fresh photos to records before treatment updates.</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HistoryPage
