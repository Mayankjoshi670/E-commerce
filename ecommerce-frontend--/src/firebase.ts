// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyD5L-Pd2XN_O982SXCByaRqkHkFHmVV4UU",
//   authDomain: "e-commerce-9d8e4.firebaseapp.com",
//   projectId: "e-commerce-9d8e4",
//   storageBucket: "e-commerce-9d8e4.appspot.com",
//   messagingSenderId: "249221434829",
//   appId: "1:249221434829:web:cd10aefb27536c2df34884",
//   measurementId: "G-DT19REHVQL"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics: = getAnalytics(app);

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);