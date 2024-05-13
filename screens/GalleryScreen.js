import {useState} from "react";
import {Alert, Button, Image, Platform, ScrollView, StyleSheet, View} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { launchImageLibraryAsync } from "expo-image-picker";
import * as ImagePicker from "expo-image-picker";
import {ref, getDownloadURL, getStorage, listAll, uploadBytesResumable} from "firebase/storage";
import { storage } from "../firebaseConfig";


export default function GalleryScreen() {
    const [imageURIList, setImageURIList] = useState([]);
    const [files, setFiles] = useState([]);
    const listFiles = async () => {
        // const storage = getStorage();
        const listRef = ref(storage, 'images');

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
                    reject(error)
                },
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    resolve({
                        downloadURL,
                        metadata : uploadTask.snapshot.metadata
                    })
                    console.log('File available at', downloadURL);
                    setImageURIList([...imageURIList, downloadURL]);
                }
            );
        })

    }

    console.log(files);

    const selectImage = async () => {
        try {
            const imageResp = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1
            })

            if (!imageResp.canceled) {
                console.log(imageResp.assets[0].uri)
                const {uri} = imageResp.assets[0]
                const fileName = uri.split('/').pop();
                const upLoadResp = await uploadToFirebase(uri, fileName);
                console.log(upLoadResp);
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
                        {imageURIList.map((uri, i) => (
                            <Image style={styles.image} key={uri + i} source={{ uri }} />
                        ))}
                    </ScrollView>
                </View>
                <View style={styles.footer}>
                    <Button title="Add picture" onPress={selectImage} />
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles= StyleSheet.create({
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