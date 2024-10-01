// Import the necessary Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration (copy from Firebase Console)
const firebaseConfig = {
    apiKey: "AIzaSyDqM8BdfYFw3AjGDa1TG3rneGbWqmp8eSE",
    authDomain: "thara-marketplace-demo.firebaseapp.com",
    projectId: "thara-marketplace-demo",
    storageBucket: "thara-marketplace-demo.appspot.com",
    messagingSenderId: "109848744218",
    appId: "1:109848744218:web:7bc5afee9e62761ec35ca3",
    measurementId: "G-XZJEDW1PS0"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Google Auth provider
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
