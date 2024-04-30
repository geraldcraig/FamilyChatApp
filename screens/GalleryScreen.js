import {useEffect, useState} from 'react';
import {Button, Image, View, StyleSheet} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {getDownloadURL, getStorage, listAll, ref, uploadBytes, uploadString} from "firebase/storage";
import uuid from 'react-native-uuid';


// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage();

// Create a storage reference from our storage service
// const storageRef = ref(storage, 'some-child');

export default function ImagePickerExample() {
    const [image, setImage] = useState(null);

    // useEffect(() => {
    //     const obj = { hello: "world" };
    //     const blob = new Blob( "file:///Users/geraldcraig/Library/Developer/CoreSimulator/Devices/998F3AB4-AC20-4C07-A398-34E5D76B6BE4/data/Containers/Data/Application/046F5A8B-3FE5-46D3-A75F-1CBB66DBB155/Library/Caches/ExponentExperienceData/@anonymous/FamilyChatApp-67070f96-0c2f-4aab-b31e-3cd1c3f06d78/ImagePicker/A2C2F858-80B0-46F0-A8A9-F8312EB4D286.jpg"
    //     );
    //
    //     // const obj = { hello: "world" };
    //     // const blob = new Blob([JSON.stringify(obj, null, 2)], {
    //     //     type: "application/json",
    //     // });
    //
    //     uploadBytes(storageRef, blob).then((snapshot) => {
    //         console.log('Uploaded a blob or file!');
    //     });
    //
    //     // 'file' comes from the Blob or File API
    //     // const message = 'This is my message.';
    //     // uploadString(storageRef, message).then((snapshot) => {
    //     //     console.log('Uploaded a raw string!');
    //     // });
    // }, []);

    useEffect(() => {
        // Create a reference under which you want to list
        const listRef = ref(storage, 'images');

        // Find all the prefixes and items.
        listAll(listRef)
            .then((res) => {
                res.prefixes.forEach((folderRef) => {
                    // All the prefixes under listRef.
                    // You may call listAll() recursively on them.
                });
                res.items.forEach((itemRef) => {

                        console.log("users:", res)
                    // All the items under listRef.
                });
            }).catch((error) => {
            // Uh-oh, an error occurred!
        });
        // console.log('listRef', listRef.name);

    }, [])


    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            console.log(result);
        }

        await uploadImageAsync(result.assets[0].uri);
    };

    async function uploadImageAsync(uri) {
        // Why are we using XMLHttpRequest? See:
        // https://github.com/expo/expo/issues/2402#issuecomment-443726662
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
        });

        const fileRef = ref(getStorage(), uuid.v4());
        const result = await uploadBytes(fileRef, blob);

        // We're done with the blob, close and release it
        blob.close();

        return await getDownloadURL(fileRef);
    }

    return (
        <View style={styles.container}>
            <Button title="Pick an image from camera roll" onPress={pickImage}/>
            {image && <Image source={{uri: image}} style={styles.image}/>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: 200,
        height: 200,
    },
});
