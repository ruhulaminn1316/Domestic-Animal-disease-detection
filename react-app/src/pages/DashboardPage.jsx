import { useNavigate } from "react-router-dom"

function DashboardPage() {
  const navigate = useNavigate()

  return (
    <>
      <div className="dashboard-header">
        <div>
          <h2 className="page-title">Dashboard</h2>
          <p className="page-subtitle">Monitor predictions and animal health insights</p>
        </div>
        <button className="btn green" onClick={() => navigate("/upload")}>
          + New Prediction
        </button>
      </div>

      <div className="stats-row">
        <div className="card stat-chip">
          <div>
            <p className="stat-label">Total Predictions</p>
            <h3 className="stat-value">32</h3>
          </div>
          <span className="stat-tag">Past month</span>
        </div>
        <div className="card stat-chip">
          <div>
            <p className="stat-label">Disease Records</p>
            <h3 className="stat-value">56</h3>
          </div>
          <span className="stat-tag">Past month</span>
        </div>
        <div className="card stat-chip">
          <div>
            <p className="stat-label">Confidence Avg</p>
            <h3 className="stat-value">89%</h3>
          </div>
          <span className="stat-tag">Last 30 days</span>
        </div>
      </div>

      <div className="dashboard-layout">
        <div className="stack">
          <div className="card feature-card">
            <img
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='110'%3E%3Crect fill='%23eef4f6' width='140' height='110' rx='10'/%3E%3Ctext x='70' y='68' text-anchor='middle' fill='%233f7f73' font-size='40'%3E🐄%3C/text%3E%3C/svg%3E"
              className="feature-image"
              alt="Cow"
            />
            <div>
              <h3>Upload Animal Image</h3>
              <p>Use images to diagnose diseases quickly and accurately.</p>
              <button className="btn green" onClick={() => navigate("/upload")}>
                📷 Upload Image
              </button>
            </div>
          </div>

          <div className="card feature-card">
            <div className="feature-icon">📋</div>
            <div>
              <h3>Enter Symptoms</h3>
              <p>Describe animal symptoms for better AI diagnosis.</p>
              <button className="btn blue" onClick={() => navigate("/symptoms")}>
                📝 Enter Symptoms
              </button>
            </div>
          </div>

          <div className="card panel">
            <h3>Recent Highlights</h3>
            <div className="stats-list">
              <div>
                <p className="stat-label">Most Common</p>
                <p className="stat-info">Bovine Foot Rot</p>
              </div>
              <div>
                <p className="stat-label">Fastest Recovery</p>
                <p className="stat-info">Dermatitis (Goat)</p>
              </div>
              <div>
                <p className="stat-label">New Cases</p>
                <p className="stat-info">12 in last 7 days</p>
              </div>
            </div>
          </div>
        </div>

        <div className="stack">
          <div className="card result-card">
            <h3>Prediction Result</h3>
            <strong>Bovine Foot Rot</strong>
            <p className="stat-label">Confidence</p>
            <div className="progress">
              <span />
            </div>
            <p className="confidence-text">92%</p>
            <button className="btn orange" onClick={() => navigate("/result")}>
              Treatment Advice
            </button>
          </div>

          <div className="card history-card">
            <h3>Recent Records</h3>
            <div className="history-item">
              <div>
                <p className="history-title">Goat Dermatitis</p>
                <p className="history-meta">Yesterday · 86% confidence</p>
              </div>
              <span className="history-status">Recovered</span>
            </div>
            <div className="history-item">
              <div>
                <p className="history-title">Cow Foot Rot</p>
                <p className="history-meta">2 days ago · 92% confidence</p>
              </div>
              <span className="history-status warning">Ongoing</span>
            </div>
            <div className="history-item">
              <div>
                <p className="history-title">Sheep Fever</p>
                <p className="history-meta">4 days ago · 78% confidence</p>
              </div>
              <span className="history-status">Recovered</span>
            </div>
            <button className="btn blue" onClick={() => navigate("/history")}>
              View History
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardPage
