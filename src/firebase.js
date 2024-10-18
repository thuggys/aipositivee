// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

console.log("Firebase config:", JSON.stringify(firebaseConfig, null, 2));

let app;
let auth;

try {
  app = initializeApp(firebaseConfig);
  console.log("Firebase app initialized successfully");
  
  auth = getAuth(app);
  console.log("Firebase auth initialized successfully");

  // Uncomment the following line if you're using Firebase Emulator
  // connectAuthEmulator(auth, "http://localhost:9099");

  auth.useDeviceLanguage();
  console.log("Device language set for auth");
} catch (error) {
  console.error("Error initializing Firebase:", error);
}

export { app, auth };

// Example of a default export
export default app;

// Or if you have named exports
export const firebaseApp = app;
