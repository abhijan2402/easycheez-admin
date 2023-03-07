import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyDTuyQuUzqbDd5bZx3olFiivsUb-DLh0T8",
    authDomain: "eazy-cheez.firebaseapp.com",
    projectId: "eazy-cheez",
    storageBucket: "eazy-cheez.appspot.com",
    messagingSenderId: "121007840161",
    appId: "1:121007840161:web:850c84b9c0b4b5440349e0",
    measurementId: "G-9DTFW8H7LM"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);