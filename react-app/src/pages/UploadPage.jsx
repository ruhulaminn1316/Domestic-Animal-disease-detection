import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import * as tmImage from "@teachablemachine/image"
import { MODEL_URL } from "../lib/modelConfig"

const initialFormState = {
  animalType: "",
  notes: ""
}

function UploadPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState(initialFormState)
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState("")
  const [analyzing, setAnalyzing] = useState(false)
  const [error, setError] = useState("")
  const imgRef = useRef(null)

  const resetForm = () => {
    setForm(initialFormState)
    setFile(null)
    setPreview("")
    setError("")
  }

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0]
    if (!selectedFile) return
    setFile(selectedFile)
    setError("")
    const reader = new FileReader()
    reader.onload = (loadEvent) => setPreview(loadEvent.target?.result || "")
    reader.readAsDataURL(selectedFile)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!file) { setError("⚠️ Please select an image first!"); return }
    if (!form.animalType) { setError("⚠️ Please select an animal type!"); return }

    if (MODEL_URL.includes("YOUR_MODEL_ID")) {
      // Model না থাকলে demo result দেখাও
      navigate("/result", {
        state: { disease: "Foot Rot", confidence: 92, animalType: form.animalType, demo: true }
      })
      return
    }

    try {
      setAnalyzing(true)
      setError("")
      const model = await tmImage.load(MODEL_URL + "model.json", MODEL_URL + "metadata.json")
      const predictions = await model.predict(imgRef.current)
      const top = predictions.reduce((a, b) => (a.probability > b.probability ? a : b))
      navigate("/result", {
        state: {
          disease: top.className,
          confidence: Math.round(top.probability * 100),
          animalType: form.animalType,
          demo: false
        }
      })
    } catch (err) {
      setError("❌ Model load failed. Check your MODEL_URL in modelConfig.js")
      setAnalyzing(false)
    }
  }

  return (
    <>
      <div className="dashboard-header">
        <div>
          <h2 className="page-title">Upload Animal Image</h2>
          <p className="page-subtitle">
            Start with a clear image to get a faster preliminary diagnosis.
          </p>
        </div>
        <button className="btn blue" onClick={() => navigate("/symptoms")}>
          📝 Use Symptoms Instead
        </button>
      </div>

      <div className="hero-banner compact-banner">
        <div className="hero-copy">
          <span className="hero-chip">Image-based screening</span>
          <h3>Capture visible signs before the condition spreads</h3>
          <p>
            Upload hoof, skin, eye, or mouth images with enough lighting so the model can focus
            on the affected area.
          </p>
        </div>
        <div className="hero-visual single-panel">
          <div className="hero-panel accent">
            <span className="hero-panel-label">Best practice</span>
            <strong>Keep the lesion centered</strong>
            <p>Use one close photo and one full-body photo for better context.</p>
          </div>
        </div>
      </div>

      <div className="two-column-layout">
        <div className="upload-container">
          <div className="surface-header">
            <h2>🖼️ Upload Animal Image for Detection</h2>
            <p className="surface-text">
              Upload a clear image of your animal to detect potential diseases using AI technology.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <label className="upload-area" htmlFor="fileInput">
              <div className="upload-icon">📤</div>
              <p>
                <strong>Click to browse</strong> or drag and drop
              </p>
              <p className="helper-text">
                Supported formats: JPG, PNG, JPEG · Maximum file size 5MB
              </p>
            </label>
            <input id="fileInput" type="file" accept="image/*" onChange={handleFileChange} />

            <div className="preview-panel">
              {preview ? (
                <>
                  <img
                    ref={imgRef}
                    src={preview}
                    className="preview-image"
                    alt="Uploaded animal preview"
                    crossOrigin="anonymous"
                  />
                  <p className="preview-caption">✅ Image loaded: {file?.name}</p>
                </>
              ) : null}
            </div>

            {error && (
              <p style={{ color: "#b43324", fontWeight: 600, marginBottom: 8 }}>{error}</p>
            )}

            <div className="form-group">
              <label>Animal Type</label>
              <select
                value={form.animalType}
                onChange={(event) => setForm((prev) => ({ ...prev, animalType: event.target.value }))}
                required
              >
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
              <label>Additional Notes (Optional)</label>
              <textarea
                value={form.notes}
                onChange={(event) => setForm((prev) => ({ ...prev, notes: event.target.value }))}
                placeholder="Any additional information about the animal..."
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn green" disabled={analyzing}>
                {analyzing ? "⏳ Analyzing..." : "🔍 Analyze Image"}
              </button>
              <button type="button" className="btn orange" onClick={resetForm} disabled={analyzing}>
                🔄 Reset
              </button>
            </div>
          </form>
        </div>

        <div className="side-column">
          <div className="card soft-panel">
            <h3>Photo Tips</h3>
            <div className="hero-list compact">
              <div>Use natural light or bright light source.</div>
              <div>Avoid blurry motion shots during capture.</div>
              <div>Show the affected area from multiple angles.</div>
            </div>
          </div>

          <div className="card soft-panel">
            <h3>Supported Animals</h3>
            <div className="mini-grid">
              <span className="mini-pill">Cow</span>
              <span className="mini-pill">Goat</span>
              <span className="mini-pill">Sheep</span>
              <span className="mini-pill">Buffalo</span>
              <span className="mini-pill">Chicken</span>
              <span className="mini-pill">Other</span>
            </div>
          </div>

          <div className="card soft-panel">
            <h3>After Upload</h3>
            <p>
              Your image analysis opens the result page where you can review confidence score,
              matched symptoms, and treatment suggestions.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default UploadPage
