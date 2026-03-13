# Domestic-Animal-disease-detection

## React App (Full)

Project-এর full React JS version এখন [react-app](react-app) folder-এর ভিতরে।

Run commands:

1. `cd react-app`
2. `npm install` (PowerShell policy issue হলে `npm.cmd install`)
3. `npm run dev` (PowerShell policy issue হলে `npm.cmd run dev`)

Default URL: `http://localhost:5173/`

## Google Login Setup (React)

এই project-এ এখন `Firebase Auth + Google Sign-In` scaffold করা আছে। Direct Gmail password নেওয়া হয়নি; secure Google popup login ব্যবহার করা হয়েছে.

### 1. Firebase project create করুন

- [Firebase Console](https://console.firebase.google.com/) এ নতুন project তৈরি করুন
- `Authentication` → `Sign-in method` → `Google` enable করুন
- `Project settings` → `General` → `Your apps` থেকে web app config copy করুন

### 2. Config বসান

- [react-app/src/lib/firebaseConfig.js](react-app/src/lib/firebaseConfig.js) file খুলুন
- placeholder values-এর জায়গায় আপনার Firebase config বসান

### 3. Authorized domain add করুন

- Firebase `Authentication` → `Settings` → `Authorized domains`
- GitHub Pages ব্যবহার করলে আপনার domain add করুন, যেমন: `your-username.github.io`

### 4. Run flow

- প্রথমে `/login` route open হবে
- Google account দিয়ে sign in করলে dashboard route `/` এ redirect হবে
- unauthenticated user হলে protected routes থেকে auto `/login` এ redirect হবে

### Notes

- Firebase config ছাড়া Google login disabled থাকবে
- Firebase Console-এ `Authorized domains` এ local domain / deployed domain add করতে হবে
