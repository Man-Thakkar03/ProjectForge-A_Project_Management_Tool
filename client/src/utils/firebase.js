// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "project-manager-656a0.firebaseapp.com",
  projectId: "project-manager-656a0",
  storageBucket: "project-manager-656a0.firebasestorage.app",
  messagingSenderId: "893197315621",
  appId: "1:893197315621:web:72397c2be28a26936c19cc",
  measurementId: "G-GVL4YGX8X2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);