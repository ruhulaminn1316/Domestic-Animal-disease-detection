import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../lib/auth-context"

function ProfilePage() {
  const navigate = useNavigate()
  const { user, saveUserProfile, changeUserPassword, uploadProfilePhoto } = useAuth()
  const [displayName, setDisplayName] = useState("")
  const [photoURL, setPhotoURL] = useState("")
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [status, setStatus] = useState("আপনার profile info update করতে পারেন।")
  const [statusType, setStatusType] = useState("info")
  const [fieldErrors, setFieldErrors] = useState({ displayName: "", photoURL: "" })
  const [passwordFields, setPasswordFields] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" })
  const [passwordErrors, setPasswordErrors] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" })
  const [passwordStatus, setPasswordStatus] = useState("Email/Password account হলে এখান থেকে password change করতে পারবেন।")
  const [passwordStatusType, setPasswordStatusType] = useState("info")
  const [saving, setSaving] = useState(false)
  const [changingPassword, setChangingPassword] = useState(false)
  const [uploadingPhoto, setUploadingPhoto] = useState(false)
  const isEmailPasswordUser = user?.providerData?.some((provider) => provider.providerId === "password")

  useEffect(() => {
    setDisplayName(user?.displayName || user?.email?.split("@")[0] || "")
    setPhotoURL(user?.photoURL || "")
  }, [user])

  const validateProfile = () => {
    const nextErrors = { displayName: "", photoURL: "" }
    const trimmedName = displayName.trim()
    const trimmedPhoto = photoURL.trim()

    if (!trimmedName) {
      nextErrors.displayName = "Display name দিন।"
    } else if (trimmedName.length < 2) {
      nextErrors.displayName = "Display name কমপক্ষে ২ অক্ষরের হতে হবে।"
    }

    if (trimmedPhoto) {
      try {
        const parsedUrl = new URL(trimmedPhoto)
        if (!["http:", "https:"].includes(parsedUrl.protocol)) {
          nextErrors.photoURL = "Photo URL অবশ্যই http বা https হতে হবে।"
        }
      } catch {
        nextErrors.photoURL = "সঠিক Photo URL দিন।"
      }
    }

    setFieldErrors(nextErrors)
    return !nextErrors.displayName && !nextErrors.photoURL
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!validateProfile()) {
      setStatus("Form-এর ভুলগুলো ঠিক করে আবার চেষ্টা করুন।")
      setStatusType("error")
      return
    }

    try {
      setSaving(true)
      setStatus("Profile update হচ্ছে...")
      setStatusType("info")
      await saveUserProfile({ displayName, photoURL })
      setStatus("Profile successfully updated.")
      setStatusType("success")
    } catch (error) {
      setStatus(error.message || "Profile update করা যায়নি।")
      setStatusType("error")
    } finally {
      setSaving(false)
    }
  }

  const handlePhotoSelect = (event) => {
    const nextFile = event.target.files?.[0] || null
    setSelectedPhoto(nextFile)
    setFieldErrors((currentErrors) => ({ ...currentErrors, photoURL: "" }))
    if (nextFile) {
      setStatus(`Selected photo: ${nextFile.name}`)
      setStatusType("info")
    }
  }

  const handlePhotoUpload = async () => {
    if (!selectedPhoto) {
      setStatus("Upload করার আগে একটি image select করুন।")
      setStatusType("error")
      return
    }

    try {
      setUploadingPhoto(true)
      setStatus("Photo upload হচ্ছে...")
      setStatusType("info")
      const uploadedUrl = await uploadProfilePhoto(selectedPhoto)
      setPhotoURL(uploadedUrl)
      setSelectedPhoto(null)
      setStatus("Photo upload successful. Save Profile চাপলে profile update হবে।")
      setStatusType("success")
    } catch (error) {
      setStatus(error.message || "Photo upload করা যায়নি।")
      setStatusType("error")
    } finally {
      setUploadingPhoto(false)
    }
  }

  const validatePasswordForm = () => {
    const nextErrors = { currentPassword: "", newPassword: "", confirmPassword: "" }

    if (!passwordFields.currentPassword.trim()) {
      nextErrors.currentPassword = "Current password দিন।"
    }

    if (!passwordFields.newPassword.trim()) {
      nextErrors.newPassword = "New password দিন।"
    } else if (passwordFields.newPassword.length < 6) {
      nextErrors.newPassword = "New password কমপক্ষে ৬ অক্ষরের হতে হবে।"
    }

    if (!passwordFields.confirmPassword.trim()) {
      nextErrors.confirmPassword = "Password confirm করুন।"
    } else if (passwordFields.confirmPassword !== passwordFields.newPassword) {
      nextErrors.confirmPassword = "New password দুই জায়গায় same হতে হবে।"
    }

    setPasswordErrors(nextErrors)
    return !nextErrors.currentPassword && !nextErrors.newPassword && !nextErrors.confirmPassword
  }

  const handlePasswordChange = async (event) => {
    event.preventDefault()

    if (!validatePasswordForm()) {
      setPasswordStatus("Form-এর ভুলগুলো ঠিক করে আবার চেষ্টা করুন।")
      setPasswordStatusType("error")
      return
    }

    try {
      setChangingPassword(true)
      setPasswordStatus("Password change হচ্ছে...")
      setPasswordStatusType("info")
      await changeUserPassword({
        currentPassword: passwordFields.currentPassword,
        newPassword: passwordFields.newPassword
      })
      setPasswordFields({ currentPassword: "", newPassword: "", confirmPassword: "" })
      setPasswordErrors({ currentPassword: "", newPassword: "", confirmPassword: "" })
      setPasswordStatus("Password successfully changed.")
      setPasswordStatusType("success")
    } catch (error) {
      setPasswordStatus(error.message || "Password change করা যায়নি।")
      setPasswordStatusType("error")
    } finally {
      setChangingPassword(false)
    }
  }

  const avatar = photoURL.trim() || user?.photoURL || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96'%3E%3Crect fill='%233f7f73' width='96' height='96' rx='48'/%3E%3Ctext x='48' y='58' text-anchor='middle' fill='white' font-size='34' font-family='Arial'%3E%F0%9F%90%AE%3C/text%3E%3C/svg%3E"

  return (
    <>
      <div className="dashboard-header">
        <div>
          <h2 className="page-title">Edit Profile</h2>
          <p className="page-subtitle">Update your display name and profile photo</p>
        </div>
        <button className="btn blue" onClick={() => navigate("/")}>🏠 Back to Dashboard</button>
      </div>

      <div className="hero-banner compact-banner">
        <div className="hero-copy">
          <span className="hero-chip">Profile settings</span>
          <h3>Keep your account identity clear across the dashboard</h3>
          <p>Updated name and photo will appear in the topbar and help separate email accounts from demo access.</p>
        </div>
        <div className="hero-visual single-panel">
          <div className="hero-panel accent">
            <span className="hero-panel-label">Signed in as</span>
            <strong>{user?.email || "Demo User"}</strong>
            <p>{user?.uid ? `User ID: ${user.uid.slice(0, 10)}...` : "No active Firebase session"}</p>
          </div>
        </div>
      </div>

      <div className="dashboard-layout">
        <div className="stack">
          <div className="card panel">
            <h3>Profile Details</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="displayName">Display Name</label>
                <input
                  id="displayName"
                  type="text"
                  value={displayName}
                  onChange={(event) => {
                    setDisplayName(event.target.value)
                    setFieldErrors((currentErrors) => ({ ...currentErrors, displayName: "" }))
                  }}
                />
                {fieldErrors.displayName && <p className="field-error profile-field-error">{fieldErrors.displayName}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="photoURL">Photo URL</label>
                <input
                  id="photoURL"
                  type="url"
                  placeholder="https://example.com/your-photo.jpg"
                  value={photoURL}
                  onChange={(event) => {
                    setPhotoURL(event.target.value)
                    setFieldErrors((currentErrors) => ({ ...currentErrors, photoURL: "" }))
                  }}
                />
                {fieldErrors.photoURL && <p className="field-error profile-field-error">{fieldErrors.photoURL}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="profilePhotoFile">Upload Photo</label>
                <input
                  id="profilePhotoFile"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoSelect}
                />
                <p className="helper-text">JPG, PNG বা অন্য image file দিন। Max size 2MB.</p>
                <div className="form-actions profile-upload-actions">
                  <button
                    className="btn orange"
                    type="button"
                    onClick={handlePhotoUpload}
                    disabled={uploadingPhoto || !selectedPhoto}
                  >
                    {uploadingPhoto ? "Uploading..." : "Upload Photo"}
                  </button>
                  {selectedPhoto && <span className="upload-file-name">{selectedPhoto.name}</span>}
                </div>
              </div>

              <div className="form-actions">
                <button className="btn green" type="submit" disabled={saving}>
                  {saving ? "Saving..." : "Save Profile"}
                </button>
                <button
                  className="btn blue"
                  type="button"
                  onClick={() => {
                    setDisplayName(user?.displayName || user?.email?.split("@")[0] || "")
                    setPhotoURL(user?.photoURL || "")
                    setSelectedPhoto(null)
                    setFieldErrors({ displayName: "", photoURL: "" })
                    setStatus("Changes reset করা হয়েছে।")
                    setStatusType("info")
                  }}
                >
                  Reset
                </button>
              </div>
            </form>

            <p className={`auth-status ${statusType}`}>{status}</p>
          </div>

          <div className="card panel">
            <h3>Change Password</h3>
            {isEmailPasswordUser ? (
              <form onSubmit={handlePasswordChange}>
                <div className="form-group">
                  <label htmlFor="currentPassword">Current Password</label>
                  <input
                    id="currentPassword"
                    type="password"
                    value={passwordFields.currentPassword}
                    onChange={(event) => {
                      setPasswordFields((currentFields) => ({ ...currentFields, currentPassword: event.target.value }))
                      setPasswordErrors((currentErrors) => ({ ...currentErrors, currentPassword: "" }))
                    }}
                  />
                  {passwordErrors.currentPassword && <p className="field-error profile-field-error">{passwordErrors.currentPassword}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="newPassword">New Password</label>
                  <input
                    id="newPassword"
                    type="password"
                    value={passwordFields.newPassword}
                    onChange={(event) => {
                      setPasswordFields((currentFields) => ({ ...currentFields, newPassword: event.target.value }))
                      setPasswordErrors((currentErrors) => ({ ...currentErrors, newPassword: "" }))
                    }}
                  />
                  {passwordErrors.newPassword && <p className="field-error profile-field-error">{passwordErrors.newPassword}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm New Password</label>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={passwordFields.confirmPassword}
                    onChange={(event) => {
                      setPasswordFields((currentFields) => ({ ...currentFields, confirmPassword: event.target.value }))
                      setPasswordErrors((currentErrors) => ({ ...currentErrors, confirmPassword: "" }))
                    }}
                  />
                  {passwordErrors.confirmPassword && <p className="field-error profile-field-error">{passwordErrors.confirmPassword}</p>}
                </div>

                <div className="form-actions">
                  <button className="btn orange" type="submit" disabled={changingPassword}>
                    {changingPassword ? "Changing..." : "Change Password"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="password-help-box">
                <p>Google বা অন্য provider দিয়ে sign in করা account-এর password এখানে change করা যাবে না।</p>
                <p>Password update দরকার হলে Forgot Password / provider account settings ব্যবহার করুন।</p>
              </div>
            )}

            <p className={`auth-status ${passwordStatusType}`}>{passwordStatus}</p>
          </div>
        </div>

        <div className="stack">
          <div className="card panel profile-preview-card">
            <h3>Live Preview</h3>
            <div className="profile-preview-avatar-wrap">
              <img className="profile-preview-avatar" src={avatar} alt={displayName || "Profile preview"} referrerPolicy="no-referrer" />
            </div>
            <strong>{displayName.trim() || "Your Name"}</strong>
            <p>{user?.email || "No email available"}</p>
            <div className="mini-grid">
              <span className="mini-pill">Topbar ready</span>
              <span className="mini-pill">Firebase synced</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfilePage