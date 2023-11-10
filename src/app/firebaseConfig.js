import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCckyzNWWcPMfmfZ8wEILMoLhHfTEGTWTc",
  authDomain: "msbd-5017.firebaseapp.com",
  projectId: "msbd-5017",
  databaseURL: "https://msbd-5017-default-rtdb.asia-southeast1.firebasedatabase.app/",
  storageBucket: "msbd-5017.appspot.com",
  messagingSenderId: "579058765866",
  appId: "1:579058765866:web:a9604ef3169221e542f353",
  measurementId: "G-1MLN4VD45X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export {database};