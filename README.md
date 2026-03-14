<div align="center">

# 🐄 Domestic Animal Disease Detection

### AI-powered veterinary screening platform for early detection of domestic animal diseases

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-domestic--animal--disease--detection.onrender.com-2e5b4b?style=for-the-badge)](https://domestic-animal-disease-detection.onrender.com)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://reactjs.org)
[![Firebase](https://img.shields.io/badge/Firebase-11-FFCA28?style=flat-square&logo=firebase)](https://firebase.google.com)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)
[![Render](https://img.shields.io/badge/Deployed_on-Render-46E3B7?style=flat-square&logo=render)](https://render.com)

</div>

---

## 🌐 Live Demo

> **[https://domestic-animal-disease-detection.onrender.com](https://domestic-animal-disease-detection.onrender.com)**

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Firebase Setup](#-firebase-setup)
- [Render Deployment](#-render-deployment)
- [Team](#-team)

---

## 🔍 Overview

**Domestic Animal Disease Detection** is a full-stack AI-powered web application that helps farmers, veterinarians, and animal health teams detect diseases in domestic animals early. Users can upload animal images, describe symptoms, and get instant AI-based disease predictions — all secured behind a robust authentication system with full health record tracking.

---

## ✨ Features

### 🔐 Authentication System
- Google Sign-In via Firebase OAuth popup
- Email & Password Sign Up / Sign In
- Forgot Password with email reset link
- Secure protected route navigation
- User profile management (name, photo, password change)
- Firebase Storage profile photo upload

### 🏠 Welcome Page
- Animated full-page landing experience
- Aurora, spark, and floating animal chip animations
- Smooth staggered hero content entry
- Direct CTA routing to Login / Signup

### 📊 Dashboard
- Personalized welcome with user info
- Quick stats: total scans, active cases, analyses
- Recent history preview
- Quick action buttons for Upload & Symptom check

### 📷 Disease Detection (Upload)
- Drag-and-drop or click-to-upload animal image
- AI model powered by **Google Teachable Machine** + **TensorFlow.js**
- Instant confidence-based disease prediction
- Animal type selection before scan

### 🩺 Symptoms Checker
- Form-based symptom entry
- Animal type, symptom description, duration fields
- AI analysis based on described symptoms

### 📈 Results Page
- Detection result with disease name
- Confidence percentage with animated progress bar
- Disease description, symptoms list, treatment suggestions
- Severity indicator and vet consultation notice

### 📁 History Page
- Full prediction history from Firebase Firestore
- Date-wise sorted records
- Status badges (Ongoing / Resolved)
- Per-record disease and animal type details

### 👤 Profile Page
- Display name and profile photo editing
- Live avatar preview before saving
- Password change with current password re-authentication
- Google account detection (password change disabled for OAuth users)

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend Framework** | React 18 |
| **Build Tool** | Vite 5 |
| **Routing** | React Router DOM v6 |
| **Authentication** | Firebase Auth (Google OAuth + Email/Password) |
| **Database** | Firebase Firestore |
| **File Storage** | Firebase Storage |
| **Analytics** | Firebase Analytics |
| **AI / ML** | Google Teachable Machine + TensorFlow.js |
| **Styling** | Custom CSS (Sora font, CSS variables, keyframe animations) |
| **Deployment** | Render (Static Site) |
| **Version Control** | Git + GitHub |

---

## 📁 Project Structure

```
Domestic-Animal-disease-detection/
├── render.yaml                    # Render deployment blueprint
├── react-app/
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── src/
│       ├── App.jsx                # Route definitions + auth guard
│       ├── main.jsx               # App entry point + analytics init
│       ├── styles.css             # Global design system + animations
│       ├── components/
│       │   ├── AppShell.jsx       # Sidebar + Topbar layout wrapper
│       │   ├── Sidebar.jsx        # Nav links + logout
│       │   └── Topbar.jsx         # User identity display
│       ├── pages/
│       │   ├── WelcomePage.jsx    # Animated landing page
│       │   ├── LoginPage.jsx      # Auth: sign in / sign up / reset
│       │   ├── DashboardPage.jsx  # Stats + overview
│       │   ├── UploadPage.jsx     # Image-based AI detection
│       │   ├── SymptomsPage.jsx   # Symptom form analysis
│       │   ├── ResultPage.jsx     # Disease result display
│       │   ├── HistoryPage.jsx    # Past prediction records
│       │   └── ProfilePage.jsx    # User profile management
│       └── lib/
│           ├── firebase.js        # All Firebase service functions
│           ├── firebaseConfig.js  # Firebase project config (private)
│           ├── auth-context.jsx   # React auth context + provider
│           ├── diseaseInfo.js     # Disease metadata (treatments etc.)
│           └── modelConfig.js     # Teachable Machine model URL
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/ruhulaminn1316/Domestic-Animal-disease-detection.git
cd Domestic-Animal-disease-detection

# Install dependencies
cd react-app
npm install

# Start development server
npm run dev
```

Open **http://localhost:5173** in your browser.

---

## 🔥 Firebase Setup

### 1. Create a Firebase Project

- Go to [Firebase Console](https://console.firebase.google.com/)
- Create a new project
- Register a Web App and copy the config

### 2. Enable Services

| Service | Steps |
|---------|-------|
| **Google Auth** | Authentication → Sign-in method → Google → Enable |
| **Email/Password** | Authentication → Sign-in method → Email/Password → Enable |
| **Firestore** | Firestore Database → Create database |
| **Storage** | Storage → Get started |

### 3. Add Config

Open `react-app/src/lib/firebaseConfig.js` and replace the placeholder values:

```js
export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
}
```

### 4. Add Authorized Domain

Authentication → Settings → Authorized domains → Add:
```
domestic-animal-disease-detection.onrender.com
```

---

## ☁️ Render Deployment

A `render.yaml` Blueprint is included at the repo root for one-click deployment.

### Using Blueprint (Recommended)

1. Go to [Render Dashboard](https://dashboard.render.com) → **New +** → **Blueprint**
2. Connect GitHub repo: `ruhulaminn1316/Domestic-Animal-disease-detection`
3. Render detects `render.yaml` → click **Apply**

### Manual Static Site

| Field | Value |
|-------|-------|
| Build Command | `npm install --prefix react-app && npm run build --prefix react-app` |
| Publish Directory | `react-app/dist` |
| Rewrite Rule | `/* → /index.html` |

---

## 👥 Meet the Team

<div align="center">

<table>
<tr>
<td align="center" width="50%">
<br>

<a href="https://github.com/ruhulaminn1316">
  <img src="https://images.weserv.nl/?url=github.com/ruhulaminn1316.png&w=120&h=120&mask=circle&maxage=7d" width="120" height="120" alt="Ruhul Amin"/>
</a>

<br>
<h3>Ruhul Amin</h3>

![Lead Developer](https://img.shields.io/badge/Lead%20Developer-%232e5b4b?style=flat-square)
![Full Stack](https://img.shields.io/badge/Full--Stack%20Aspirant-0d1117?style=flat-square&logo=stackshare&logoColor=white)

<br>

| | |
|---|---|
| 🎓 | Green University of Bangladesh |
| 📚 | BSc in Computer Science & Engineering |
| 🗓️ | 11th Semester · Class of **2026** |
| 💻 | Web Development & AI Systems |
| 📖 | Learning Django & Backend Dev |
| 🎯 | Future Full-Stack Developer |

<br>

[![GitHub](https://img.shields.io/badge/GitHub-%23181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ruhulaminn1316)
[![Facebook](https://img.shields.io/badge/Facebook-%231877F2?style=for-the-badge&logo=facebook&logoColor=white)](https://facebook.com/ruhulaminn1316)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-%230A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/ruhulaminn1316)

<br>
</td>

<td align="center" width="50%">
<br>

<a href="https://github.com/rokeyaritucse2026">
  <img src="https://images.weserv.nl/?url=github.com/rokeyaritucse2026.png&w=120&h=120&mask=circle&maxage=7d" width="120" height="120" alt="Rokeya Khatun Ritu"/>
</a>

<br>
<h3>Rokeya Khatun Ritu</h3>

![Developer](https://img.shields.io/badge/Developer-%232e5b4b?style=flat-square)
![Researcher](https://img.shields.io/badge/Researcher-0d1117?style=flat-square&logo=researchgate&logoColor=white)

<br>

| | |
|---|---|
| 🎓 | Green University of Bangladesh |
| 📚 | BSc in Computer Science & Engineering |
| 🗓️ | 11th Semester · Class of **2026** |
| 🔬 | AI & Disease Detection Research |
| 📊 | Data Analysis & Intelligent Systems |
| 🌱 | Passionate Learner & Collaborator |

<br>

[![GitHub](https://img.shields.io/badge/GitHub-%23181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/rokeyaritucse2026)

<br>
</td>
</tr>
</table>

</div>

---

## 📄 License

This project is for academic and educational purposes.

---

<div align="center">
  Made with ❤️ by Ruhul Amin & Rokeya Khatun Ritu
</div>
