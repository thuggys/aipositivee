// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMHMyrht-Pv2sZ1smHC5lb8nMYzk3Pk4E",
  authDomain: "spirits-c0808.firebaseapp.com",
  projectId: "spirits-c0808",
  storageBucket: "spirits-c0808.appspot.com",
  messagingSenderId: "790473923017",
  appId: "1:790473923017:web:135034f1a2252e57367018",
  measurementId: "G-4SYG5YN47Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Example of a default export
export default firebaseConfig;

// Or if you have named exports
export const firebaseApp = app;