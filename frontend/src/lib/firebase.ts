// Firebase client initialization.
// All values come from environment variables (see .env.example) so real
// credentials never get committed to the repo. Fill in frontend/.env with
// the values from your Firebase project settings (see FIREBASE_SETUP.md).
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

if (!firebaseConfig.projectId) {
  // Loud warning instead of a silent crash — this is the #1 setup mistake
  // (forgetting to create frontend/.env from .env.example).
  console.warn(
    '[firebase] VITE_FIREBASE_PROJECT_ID kosong. Cek apakah file frontend/.env sudah dibuat dari .env.example dan berisi config Firebase kamu, lalu restart `npm run dev`.'
  );
}

// Reuse existing app instance during Vite HMR instead of re-initializing.
export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// This app doesn't have real user accounts yet (LoginView.tsx does a local
// PIN check, not Firebase Auth). Firestore security rules still require
// *some* signed-in user though, so we sign in anonymously in the
// background as soon as the app loads. See FIREBASE_SETUP.md for how to
// enable the Anonymous sign-in provider in the Firebase console — without
// that step every Firestore read/write will fail with permission-denied.
signInAnonymously(auth).catch((err) => {
  console.error(
    '[firebase] Anonymous sign-in gagal. Pastikan provider "Anonymous" sudah diaktifkan di Firebase Console > Authentication > Sign-in method.',
    err
  );
});
