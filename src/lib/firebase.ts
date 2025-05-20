import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration - hardcoded for client-side usage
// For better security in production, consider using Firebase Auth Emulator or Firebase Admin SDK
const firebaseConfig = {
  apiKey: "AIzaSyC7f6VAN2nl2ocobYRSnlCCwPvTcwuGaOI",
  authDomain: "learning-e5a5d.firebaseapp.com",
  projectId: "learning-e5a5d",
  storageBucket: "learning-e5a5d.appspot.com",
  messagingSenderId: "793232253276",
  appId: "1:793232253276:web:08e07657fc2ad84dc86199",
  measurementId: "G-4M32YWVD5Q"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
export default app; 