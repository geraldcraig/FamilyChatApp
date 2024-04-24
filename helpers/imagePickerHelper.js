import {useState} from 'react';
import * as ImagePicker from 'expo-image-picker';
import {Button, Platform, View} from 'react-native';
import uuid from 'react-native-uuid';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import {initializeApp} from "firebase/app";
import {getReactNativePersistence, initializeAuth} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getFirebaseApp = () => {
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

    return initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage)
    });
}

export const launchImagePicker = async () => {
    await checkMediaPermissions();

    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1
    });

    if (!result.cancelled) {
        console.log(result)
        return result.uri;
    }
}

export const openCamera = async () => {

    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
        console.log("No permission to access the camera");
        return;
    }

    const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1
    });

    if (!result.cancelled) {
        return result.uri;
    }
}

export const uploadImageAsync = async (uri, isChatImage = false) => {
    const app = getFirebaseApp();

    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(xhr.response);
        };

        xhr.onerror = function(e) {
            console.log(e);
            reject(new TypeError("Network request failed"));
        };

        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send();
    });

    const pathFolder = isChatImage ? 'chatImages' : 'profilePics';
    const storageRef = ref(getStorage(app), `${pathFolder}/${uuid.v4()}`);

    await uploadBytesResumable(storageRef, blob);

    blob.close();

    return await getDownloadURL(storageRef);
}

const checkMediaPermissions = async () => {
    if (Platform.OS !== 'web') {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            return Promise.reject("We need permission to access your photos");
        }
    }

    return Promise.resolve();
}