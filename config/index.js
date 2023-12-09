import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBqilnDILozzmTMUBtqjDXKQ2Heeg3HwNw",
    authDomain: "sabziapp-aa646.firebaseapp.com",
    projectId: "sabziapp-aa646",
    storageBucket: "sabziapp-aa646.appspot.com",
    messagingSenderId: "82196275489",
    appId: "1:82196275489:web:e8d500ac3ccfd13629de60"
};

export const firebase = initializeApp(firebaseConfig);
export const auth = getAuth(firebase);
export const db = getFirestore(firebase); 
