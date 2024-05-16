import {getDownloadURL, getStorage, listAll, ref} from "firebase/storage";
import {StyleSheet} from "react-native";
import {useEffect} from "react";

const ImageScreen =  () => {
// Get a reference to the storage service, which is used to create references in your storage bucket
    const storage = getStorage();

    useEffect(() => {
        getImages().then(() => console.log('images downloaded'));
    }, []);

// Create a storage reference from our storage service
// const storageRef = ref(storage);

// Create a child reference
//     const imagesRef = ref(storage, 'images');
// imagesRef now points to 'images'

    // console.log('full path:', imagesRef.fullPath);
    // console.log('name:', imagesRef.name);
    // console.log('bucket:', imagesRef.bucket)
    // console.log('storage:', imagesRef.storage);

    const getImages = async () => {


        // Create a reference under which you want to list
        const listRef = ref(storage, 'images');

        // Find all the items under listRef.
        const result = await listAll(listRef);
        const downloadURLs = await Promise.all(result.items.map(itemRef => getDownloadURL(itemRef)));

        console.log('downloadURLs', downloadURLs); // Array of download URLs
    }

    // Find all the prefixes and items.
    // listAll(listRef)
    //     .then((res) => {
    //         res.prefixes.forEach((folderRef) => {
    //             // All the prefixes under listRef.
    //             // You may call listAll() recursively on them.
    //             console.log('prefixes:', res.prefixes)
    //         });
    //         res.items.forEach((itemRef) => {
    //             // All the items under listRef.
    //             console.log('items:', res.items)
    //         });
    //         console.log('listref:', listRef)
    //     }).catch((error) => {
    //     // Uh-oh, an error occurred!
    // });

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ImageScreen;
