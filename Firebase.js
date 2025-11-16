//AIzaSyDtgxjOTJRij1uYKhsyTXK_DKgK0R7a9jg
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey:"AIzaSyDtgxjOTJRij1uYKhsyTXK_DKgK0R7a9jg", 
  authDomain:"urban-d8b19.firebaseapp.com",
  projectId:"urban-d8b19",
  storageBucket: "urban-d8b19.appspot.com", 
  messagingSenderId: "911120781535",
  appId: "1:911120781535:web:d985c85ed98f7eb4dbd96a",
  measurementId: "G-M56TPWZCDW"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
