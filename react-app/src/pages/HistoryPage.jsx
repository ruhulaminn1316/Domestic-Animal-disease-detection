import { useNavigate } from "react-router-dom"

function HistoryPage() {
  const navigate = useNavigate()

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

      <div className="hero-banner compact-banner">
        <div className="hero-copy">
          <span className="hero-chip">Case tracking</span>
          <h3>Keep disease records organized for better follow-up care</h3>
          <p>
            Use the history view to spot recurring illnesses, measure recovery outcomes, and
            prioritize animals that still need monitoring.
          </p>
        </div>
        <div className="hero-visual single-panel">
          <div className="hero-panel">
            <span className="hero-panel-label">Recovery rate</span>
            <strong>75%</strong>
            <p>18 of the latest 24 records are marked as recovered.</p>
          </div>
        </div>
      </div>

      <div className="stats-row">
        <div className="card stat-chip">
          <div>
            <p className="stat-label">Open Cases</p>
            <h3 className="stat-value">6</h3>
          </div>
          <span className="stat-tag">Need follow-up</span>
        </div>
        <div className="card stat-chip">
          <div>
            <p className="stat-label">Recovered</p>
            <h3 className="stat-value">18</h3>
          </div>
          <span className="stat-tag">Last 30 days</span>
        </div>
        <div className="card stat-chip">
          <div>
            <p className="stat-label">Top Disease</p>
            <h3 className="stat-value">Foot Rot</h3>
          </div>
          <span className="stat-tag">Most frequent</span>
        </div>
      </div>

      <div className="dashboard-layout">
        <div className="stack">
          <div className="card panel">
            <h3>Recent Cases</h3>
            <div className="history-item">
              <div>
                <p className="history-title">#ANML-6783 · Foot Rot</p>
                <p className="history-meta">May 12 · Cow · 92% confidence</p>
              </div>
              <span className="history-status warning">Ongoing</span>
            </div>
            <div className="history-item">
              <div>
                <p className="history-title">#ANML-6781 · Mouth Ulcer</p>
                <p className="history-meta">May 10 · Goat · 84% confidence</p>
              </div>
              <span className="history-status">Recovered</span>
            </div>
            <div className="history-item">
              <div>
                <p className="history-title">#ANML-6741 · Mastitis</p>
                <p className="history-meta">May 05 · Cow · 88% confidence</p>
              </div>
              <span className="history-status">Recovered</span>
            </div>
            <div className="history-item">
              <div>
                <p className="history-title">#ANML-6728 · Sheep Fever</p>
                <p className="history-meta">May 02 · Sheep · 79% confidence</p>
              </div>
              <span className="history-status warning">Monitoring</span>
            </div>
          </div>
        </div>

        <div className="stack">
          <div className="card result-card">
            <h3>History Summary</h3>
            <strong>24 Total Records</strong>
            <p className="stat-label">Recovered Cases</p>
            <div className="progress">
              <span style={{ width: "75%" }} />
            </div>
            <p className="confidence-text">18 recovered</p>
            <button className="btn green" onClick={() => navigate("/upload")}>
              + New Detection
            </button>
          </div>

          <div className="card panel">
            <h3>Common Diseases</h3>
            <div className="stats-list">
              <div>
                <p className="stat-label">1. Foot Rot</p>
                <p className="stat-info">6 records this month</p>
              </div>
              <div>
                <p className="stat-label">2. Mastitis</p>
                <p className="stat-info">4 records this month</p>
              </div>
              <div>
                <p className="stat-label">3. Dermatitis</p>
                <p className="stat-info">3 records this month</p>
              </div>
            </div>
          </div>

          <div className="card panel">
            <h3>Recommended Follow-up</h3>
            <div className="hero-list compact">
              <div>Check ongoing hoof infections within the next 48 hours.</div>
              <div>Review any recurring fever cases for shared environmental causes.</div>
              <div>Attach fresh photos to records before treatment updates.</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HistoryPage
