import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {
    apiKey: "AIzaSyBXVOvznXFgKlr4csQ1HzthpvsG7HbEphM",
    authDomain: "whatsapp-test-88143.firebaseapp.com",
    databaseURL: "https://whatsapp-test-88143-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "whatsapp-test-88143",
    storageBucket: "whatsapp-test-88143.appspot.com",
    messagingSenderId: "707595707980",
    appId: "1:707595707980:web:3b339dc53c232d23af76e9"
};


const app = initializeApp(firebaseConfig);

initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// const db = getFirestore(app);
const db = getFirestore(app);

export { db }
//
// export default app;
