import { useEffect, useState } from "react";
import {Button, Image, Platform, ScrollView, StyleSheet, View} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { launchImageLibraryAsync } from "expo-image-picker";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytes, getDownloadURL} from "firebase/storage";


export default function App() {
    const [imageURIList, setImageURIList] = useState([]);

    useEffect(() => {
        // const listRef = ref(storage, 'images');



    });


    const uploadImageAsync = async (uri) => {
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

        const fileRef = ref(getStorage(), 'testfile.jpg');
        const result = await uploadBytes(fileRef, blob);

        // We're done with the blob, close and release it
        blob.close();

        setImageURIList(['https://firebasestorage.googleapis.com/v0/b/family-app-14d7b.appspot.com/o/testfile.jpg?alt=media&token=9261cff4-4db8-45cb-82dc-008bbf666b98'])

        // console.log(`dload url: ${await getDownloadURL(fileRef)}`);

        return await getDownloadURL(fileRef);
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

    const launchImagePicker = async () => {
        await checkMediaPermissions();

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1
        });

        if (!result.canceled) {
            console.log(`test: ${JSON.stringify(result.assets)}`);
            return result.assets[0].uri;
        }
    }


    async function pickImage() {
        // const image = await launchImageLibraryAsync();
        // if (image.canceled) {
        //     alert("No image selected");
        // } else {
        //     setImageURIList([...imageURIList, image.assets[0].uri]);
        // }



        const uri = await launchImagePicker();

        console.log(`uri: ${uri}`)

        await uploadImageAsync(uri);
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.body}>
                    <ScrollView>
                        {['https://firebasestorage.googleapis.com/v0/b/family-app-14d7b.appspot.com/o/testfile.jpg?alt=media&token=9261cff4-4db8-45cb-82dc-008bbf666b98'].map((uri, i) => (
                            <Image style={styles.image} key={uri + i} source={{ uri }} />
                        ))}
                    </ScrollView>
                </View>
                <View style={styles.footer}>
                    <Button title="Add picture" onPress={pickImage} />
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