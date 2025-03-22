import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCB8QmsBGLFntoCS8oezpUVjBuIz3hMIeI",
    authDomain: "hacksphere-5ca29.firebaseapp.com",
    projectId: "hacksphere-5ca29",
    storageBucket: "hacksphere-5ca29.firebasestorage.app",
    messagingSenderId: "407432083515",
    appId: "1:407432083515:web:059ea842e0250436d3c41e"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 