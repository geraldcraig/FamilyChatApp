import { initializeApp } from "firebase/app";
import { getAuth, getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, listAll, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth, db, storage} from '../firebaseConfig';


// const firebaseConfig = {
//     apiKey: "AIzaSyCbPsbyAtCkPPT1LU7wMIknMC0CP2pmRmg",
//     authDomain: "family-app-14d7b.firebaseapp.com",
//     databaseURL: "https://family-app-14d7b-default-rtdb.europe-west1.firebasedatabase.app",
//     projectId: "family-app-14d7b",
//     storageBucket: "family-app-14d7b.appspot.com",
//     messagingSenderId: "293818915401",
//     appId: "1:293818915401:web:0b6a5ca5fb39407a03fd98"
// };

// const app = initializeApp(firebaseConfig);

// initializeAuth(app, {
//     persistence: getReactNativePersistence(AsyncStorage)
// });

// export const auth = getAuth();

// export const db = getFirestore();

// export const storage = getStorage();

export const listFiles = async () => {
    const storage = getStorage();

// Create a reference under which you want to list
    const listRef = ref(storage, 'images');

// Find all the prefixes and items.
    const listResp = await listAll(listRef);
    return listResp.items
};

export const uploadToFirebase = async (uri, name, onProgress) => {
    const fetchResponse = await fetch(uri);
    const theBlob = await fetchResponse.blob();
    console.log(theBlob);

    const imageRef = ref(getStorage(), `images/${name}`);

    const uploadTask = uploadBytesResumable(imageRef, theBlob);

    return new Promise((resolve, reject) => {
    uploadTask.on('state_changed',
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            onProgress && onProgress(progress);
        },
        (error) => {
            // Handle unsuccessful uploads
            reject(error)
        },
        async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve({
                downloadURL,
                metadata : uploadTask.snapshot.metadata
            })
                console.log('File available at', downloadURL);
        }
    );
    })

}
