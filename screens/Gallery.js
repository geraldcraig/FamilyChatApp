import { useEffect, useState } from "react";
import {Alert, Button, Image, Platform, ScrollView, StyleSheet, View} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { launchImageLibraryAsync } from "expo-image-picker";
import * as ImagePicker from "expo-image-picker";
import {ref, uploadBytes, getDownloadURL, getStorage, listAll, uploadBytesResumable} from "firebase/storage";
import {uploadToFirebase} from "./ImageUpload";

export default function Gallery() {
    const [files, setFiles] = useState([]);
    const listFiles = async () => {
        const storage = getStorage();

// Create a reference under which you want to list
        const listRef = ref(storage, 'images');

// Find all the prefixes and items.
        const listResp = await listAll(listRef);
        return listResp.items
    };
    const uploadToFirebase = async (uri, name, onProgress) => {
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

    console.log(files);

    const takePhoto = async () => {
        try {
            const cameraResp = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1
            })

            if (!cameraResp.canceled) {
                console.log(cameraResp.assets[0].uri)
                const {uri} = cameraResp.assets[0]
                const fileName = uri.split('/').pop();
                const upLoadResp = await uploadToFirebase(uri, fileName);
                console.log(upLoadResp);

                // listFiles().then((listResp) => {
                //     const files = listResp.map((value) => {
                //         return {name: value.fullPath}
                //     });
                //     setFiles(files);
                // });
            }
        } catch (error) {
            Alert.alert("Error uploading image " + error.message);
        }
    };


    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.body}>
                    <ScrollView>
                        {['https://firebasestorage.googleapis.com/v0/b/family-app-14d7b.appspot.com/o/pexels-valeriiamiller-20801061.jpg?alt=media&token=5c879d2e-a756-41b4-959a-789f5a8c09ac'].map((uri, i) => (
                            <Image style={styles.image} key={uri + i} source={{ uri }} />
                        ))}
                    </ScrollView>
                </View>
                <View style={styles.footer}>
                    <Button title="Add picture" onPress={takePhoto} />
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        paddingVertical: 10,
        textAlign: "center",
    },
    body: {
        flex: 6,
    },
    image: {
        height: 300,
        marginVertical: 30
    },
    footer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    btn: {
        backgroundColor: "black",
        padding: 30
    },
    btnTxt: {
        color: "white"
    }
});