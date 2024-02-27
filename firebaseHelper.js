// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

export const getFirebaseApp = () => {
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
        apiKey: "AIzaSyBXVOvznXFgKlr4csQ1HzthpvsG7HbEphM",
        authDomain: "whatsapp-test-88143.firebaseapp.com",
        databaseURL: "https://whatsapp-test-88143-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "whatsapp-test-88143",
        storageBucket: "whatsapp-test-88143.appspot.com",
        messagingSenderId: "707595707980",
        appId: "1:707595707980:web:3b339dc53c232d23af76e9"
    };
    
    // Initialize Firebase
    return initializeApp(firebaseConfig);
}