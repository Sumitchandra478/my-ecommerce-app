import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: "AIzaSyD4cULWd0Zf0FsH4ZE44AilHyqxWjrB7Vo",
    authDomain: "e-commerce-595d5.firebaseapp.com",
    projectId: "e-commerce-595d5",
    storageBucket: "e-commerce-595d5.firebasestorage.app",
    messagingSenderId: "184552283191",
    appId: "1:184552283191:web:22235e14ab3a09e53cf3b2"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const auth = getAuth(app);
export { db, auth }; // ✅ Export auth