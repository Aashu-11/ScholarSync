import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD03L_Eww2kAd-RvCoXdSlubbJrtFl--kQ",
  authDomain: "scholarsync-83c15.firebaseapp.com",
  projectId: "scholarsync-83c15",
  storageBucket: "scholarsync-83c15.appspot.com",
  messagingSenderId: "519256643878",
  appId: "1:519256643878:web:4da3f4c79a850d5b1c49e7",
  measurementId: "G-Y5C934S3B6" // Optional, remove if not using analytics
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
