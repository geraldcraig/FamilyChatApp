import { initializeApp } from "firebase/app";
import { getAuth, getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
    apiKey: "AIzaSyCbPsbyAtCkPPT1LU7wMIknMC0CP2pmRmg",
    authDomain: "family-app-14d7b.firebaseapp.com",
    databaseURL: "https://family-app-14d7b-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "family-app-14d7b",
    storageBucket: "family-app-14d7b.appspot.com",
    messagingSenderId: "293818915401",
    appId: "1:293818915401:web:0b6a5ca5fb39407a03fd98"
};

const app = initializeApp(firebaseConfig);

initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

export const auth = getAuth();

export const db = getDatabase();
