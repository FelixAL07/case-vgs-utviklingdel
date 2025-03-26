import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBIdPdJ99vBAPu7dm2kc9uQGf8-ngzmyg4",
    authDomain: "case-vgs-utvikling-felix.firebaseapp.com",
    projectId: "case-vgs-utvikling-felix",
    storageBucket: "case-vgs-utvikling-felix.firebasestorage.app",
    messagingSenderId: "774382388824",
    appId: "1:774382388824:web:8fe7db0ca883deb2a7ec2d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };