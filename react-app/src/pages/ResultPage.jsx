import { useNavigate } from "react-router-dom"

function ResultPage() {
  const navigate = useNavigate()

  const saveReport = () => {
    window.alert("✅ Report saved successfully! You can access it from Disease History.")
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
          <h3>Bovine Foot Rot appears to be the strongest match</h3>
          <p>
            The analysis combines image / symptom cues and highlights both treatment support and
            follow-up monitoring advice.
          </p>
        </div>
        <div className="hero-visual single-panel">
          <div className="hero-panel accent">
            <span className="hero-panel-label">Confidence</span>
            <strong>92%</strong>
            <p>High enough for immediate review, but still verify with a veterinarian.</p>
          </div>
        </div>
      </div>

      <div className="result-container">
        <h2>🎯 Disease Detection Result</h2>
        <div className="summary-grid">
          <div className="summary-tile">
            <span className="summary-label">Animal</span>
            <strong>Cow</strong>
          </div>
          <div className="summary-tile">
            <span className="summary-label">Severity</span>
            <strong>Moderate</strong>
          </div>
          <div className="summary-tile">
            <span className="summary-label">Action</span>
            <strong>Clean + isolate</strong>
          </div>
        </div>

        <div className="result-header">
          <h3>Detected Disease</h3>
          <p className="result-disease-name">Bovine Foot Rot</p>
          <div className="confidence">92% Confidence</div>
          <div className="progress progress-centered">
            <span style={{ width: "92%" }} />
          </div>
        </div>

        <div className="result-details">
          <h4>📖 About the Disease</h4>
          <p>
            Foot rot is a common and contagious disease affecting cattle hooves, caused by
            bacteria. It results in inflammation and infection of the tissues between the toes,
            leading to lameness and discomfort. Early detection and treatment are crucial to
            prevent spread and complications.
          </p>
        </div>

        <div className="result-details">
          <h4>✅ Matched Symptoms</h4>
          <ul>
            <li>Severe lameness and difficulty walking</li>
            <li>Swelling between the toes or around the hoof</li>
            <li>Foul-smelling discharge from the affected area</li>
            <li>Elevated body temperature (fever)</li>
            <li>Reduced appetite and weight loss</li>
          </ul>
        </div>

        <div className="result-details">
          <h4>💊 Treatment Recommendations</h4>
          <p>
            <strong>Immediate Actions:</strong>
          </p>
          <ul>
            <li>Clean and disinfect the affected hoof thoroughly</li>
            <li>Apply topical antibiotics (tetracycline or oxytetracycline)</li>
            <li>Administer systemic antibiotics as prescribed by veterinarian</li>
            <li>Provide pain relief medication if necessary</li>
            <li>Isolate the affected animal to prevent spread</li>
          </ul>
          <p className="section-gap">
            <strong>Long-term Care:</strong>
          </p>
          <ul>
            <li>Maintain dry and clean housing conditions</li>
            <li>Regular hoof trimming and inspection</li>
            <li>Footbath treatments for prevention</li>
            <li>Improve nutrition and immunity</li>
            <li>Monitor other animals in the herd</li>
          </ul>
        </div>

        <div className="result-details notice-card">
          <h4>⚠️ Important Notice</h4>
          <p>
            This is an AI-powered preliminary diagnosis. Please consult a qualified veterinarian
            for professional examination and treatment. Early veterinary intervention significantly
            improves treatment outcomes.
          </p>
        </div>

        <div className="result-details">
          <h4>🛡️ Prevention Tips</h4>
          <ul>
            <li>Maintain proper hygiene in animal housing areas</li>
            <li>Ensure adequate drainage to avoid muddy conditions</li>
            <li>Regular hoof care and trimming schedule</li>
            <li>Implement routine footbath protocols</li>
            <li>Monitor herd health regularly</li>
            <li>Quarantine new animals before introducing to herd</li>
            <li>Provide balanced nutrition for strong immunity</li>
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
