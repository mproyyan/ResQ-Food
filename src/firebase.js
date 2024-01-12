import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API,
    authDomain: "resq-food.firebaseapp.com",
    projectId: "resq-food",
    storageBucket: "resq-food.appspot.com",
    messagingSenderId: "434521055585",
    appId: "1:434521055585:web:91a45dbe74a79baf0c2520"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db
