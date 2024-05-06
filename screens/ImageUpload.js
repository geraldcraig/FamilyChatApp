import { initializeApp } from "firebase/app";
import { getAuth, getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, listAll, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth, db, storage} from '../firebaseConfig';


// export const listFiles = async () => {
//     const storage = getStorage();
//
// // Create a reference under which you want to list
//     const listRef = ref(storage, 'images');
//
// // Find all the prefixes and items.
//     const listResp = await listAll(listRef);
//     return listResp.items
// };
//
// export const uploadToFirebase = async (uri, name, onProgress) => {
//     const fetchResponse = await fetch(uri);
//     const theBlob = await fetchResponse.blob();
//     console.log(theBlob);
//
//     const imageRef = ref(getStorage(), `images/${name}`);
//
//     const uploadTask = uploadBytesResumable(imageRef, theBlob);
//
//     return new Promise((resolve, reject) => {
//     uploadTask.on('state_changed',
//         (snapshot) => {
//             const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//             onProgress && onProgress(progress);
//         },
//         (error) => {
//             // Handle unsuccessful uploads
//             reject(error)
//         },
//         async () => {
//             const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
//             resolve({
//                 downloadURL,
//                 metadata : uploadTask.snapshot.metadata
//             })
//                 console.log('File available at', downloadURL);
//         }
//     );
//     })
//
// }
