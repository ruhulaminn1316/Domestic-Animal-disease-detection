import { useState } from "react"
import { useNavigate } from "react-router-dom"

const initialFormState = {
  animalType: "",
  age: "",
  weight: "",
  symptoms: "",
  duration: "",
  temperature: "",
  behavior: "",
  appetite: "",
  vaccination: "",
  additional: ""
}

function SymptomsPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState(initialFormState)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const resetForm = () => setForm(initialFormState)

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!form.animalType || !form.symptoms || !form.duration || !form.appetite) {
      window.alert("⚠️ Please fill in all required fields marked with *")
      return
    }

    window.alert("🔄 Analyzing symptoms... Redirecting to results page.")
    navigate("/result")
  }

  return (
    <>
      <div className="dashboard-header">
        <div>
          <h2 className="page-title">Enter Animal Symptoms</h2>
          <p className="page-subtitle">
            Describe the condition in detail to support better AI screening.
          </p>
        </div>
        <button className="btn green" onClick={() => navigate("/upload")}>
          📷 Upload Photo Too
        </button>
      </div>

      <div className="hero-banner compact-banner">
        <div className="hero-copy">
          <span className="hero-chip">Symptom-based analysis</span>
          <h3>Turn observations into a clearer preliminary diagnosis</h3>
          <p>
            Add appetite, temperature, duration, and behavior changes so the model can narrow
            possible diseases more accurately.
          </p>
        </div>
        <div className="hero-visual single-panel">
          <div className="hero-panel">
            <span className="hero-panel-label">Recommendation</span>
            <strong>Use the most recent symptoms</strong>
            <p>Fresh symptom notes usually produce more reliable guidance.</p>
          </div>
        </div>
      </div>

      <div className="two-column-layout form-layout">
        <div className="form-container">
          <div className="surface-header centered">
            <h2>📋 Describe Animal Symptoms</h2>
            <p className="surface-text">
              Provide detailed information about your animal's symptoms for accurate disease
              detection.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Animal Type *</label>
              <select name="animalType" value={form.animalType} onChange={handleChange} required>
                <option value="">Select Animal Type</option>
                <option value="cow">Cow</option>
                <option value="goat">Goat</option>
                <option value="sheep">Sheep</option>
                <option value="buffalo">Buffalo</option>
                <option value="chicken">Chicken</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Animal Age *</label>
              <input
                type="text"
                name="age"
                value={form.age}
                onChange={handleChange}
                placeholder="e.g., 2 years, 6 months"
                required
              />
            </div>

            <div className="form-group">
              <label>Animal Weight (kg)</label>
              <input
                type="number"
                name="weight"
                value={form.weight}
                onChange={handleChange}
                placeholder="Enter weight in kg"
              />
            </div>

            <div className="form-group">
              <label>Primary Symptoms *</label>
              <textarea
                name="symptoms"
                value={form.symptoms}
                onChange={handleChange}
                placeholder="Describe the symptoms in detail (e.g., fever, loss of appetite, discharge from nose, limping, etc.)"
                required
              />
            </div>

            <div className="form-group">
              <label>Duration of Symptoms *</label>
              <select name="duration" value={form.duration} onChange={handleChange} required>
                <option value="">Select Duration</option>
                <option value="1day">Less than 1 day</option>
                <option value="1-3days">1-3 days</option>
                <option value="4-7days">4-7 days</option>
                <option value="1-2weeks">1-2 weeks</option>
                <option value="2weeks+">More than 2 weeks</option>
              </select>
            </div>

            <div className="form-group">
              <label>Body Temperature (°F)</label>
              <input
                type="number"
                step="0.1"
                name="temperature"
                value={form.temperature}
                onChange={handleChange}
                placeholder="e.g., 102.5"
              />
            </div>

            <div className="form-group">
              <label>Behavioral Changes</label>
              <textarea
                name="behavior"
                value={form.behavior}
                onChange={handleChange}
                placeholder="Any changes in behavior (e.g., lethargy, aggression, isolation, restlessness)"
              />
            </div>

            <div className="form-group">
              <label>Appetite Status *</label>
              <select name="appetite" value={form.appetite} onChange={handleChange} required>
                <option value="">Select Status</option>
                <option value="normal">Normal</option>
                <option value="reduced">Reduced</option>
                <option value="none">No appetite</option>
                <option value="increased">Increased</option>
              </select>
            </div>

            <div className="form-group">
              <label>Recent Vaccinations</label>
              <input
                type="text"
                name="vaccination"
                value={form.vaccination}
                onChange={handleChange}
                placeholder="List recent vaccinations if any"
              />
            </div>

            <div className="form-group">
              <label>Additional Information</label>
              <textarea
                name="additional"
                value={form.additional}
                onChange={handleChange}
                placeholder="Any other relevant information (environment, recent changes, contact with other animals, etc.)"
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn blue">
                🔍 Analyze Symptoms
              </button>
              <button type="button" className="btn orange" onClick={resetForm}>
                🔄 Reset Form
              </button>
            </div>
          </form>
        </div>

        <div className="side-column">
          <div className="card soft-panel">
            <h3>What to Include</h3>
            <div className="hero-list compact">
              <div>Fever, limping, swelling, discharge, cough, rash.</div>
              <div>When the symptoms started and whether they are worsening.</div>
              <div>Recent contact with other animals or wet housing conditions.</div>
            </div>
          </div>

          <div className="card soft-panel">
            <h3>Quick Checks</h3>
            <div className="mini-grid">
              <span className="mini-pill">Temperature</span>
              <span className="mini-pill">Appetite</span>
              <span className="mini-pill">Mobility</span>
              <span className="mini-pill">Skin</span>
              <span className="mini-pill">Respiration</span>
              <span className="mini-pill">Behavior</span>
            </div>
          </div>

          <div className="card soft-panel">
            <h3>Workflow Tip</h3>
            <p>
              After symptom analysis, compare the suggested result with an uploaded photo for a
              stronger preliminary assessment.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default SymptomsPage
