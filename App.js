import { StatusBar } from 'expo-status-bar';
import {Alert, Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import Gallery from "./screens/Gallery";
import {listFiles, uploadToFirebase} from "./screens/ImageUpload";
import {useEffect, useState} from "react";

export default function App() {
    // const [files, setFiles] = useState([]);
    //
    // console.log(files);
    //
    // const takePhoto = async () => {
    //     try {
    //         const cameraResp = await ImagePicker.launchImageLibraryAsync({
    //             mediaTypes: ImagePicker.MediaTypeOptions.All,
    //             allowsEditing: true,
    //             aspect: [1, 1],
    //             quality: 1
    //         })
    //
    //         if (!cameraResp.canceled) {
    //             console.log(cameraResp.assets[0].uri)
    //             const {uri} = cameraResp.assets[0]
    //             const fileName = uri.split('/').pop();
    //             const upLoadResp = await uploadToFirebase(uri, fileName);
    //             console.log(upLoadResp);
    //
    //             // listFiles().then((listResp) => {
    //             //     const files = listResp.map((value) => {
    //             //         return {name: value.fullPath}
    //             //     });
    //             //     setFiles(files);
    //             // });
    //         }
    //     } catch (error) {
    //         Alert.alert("Error uploading image " + error.message);
    //     }
    // };

    return (
        <SafeAreaView style={styles.container}>
            {/*<Text>Working with Firebase and Image Picker</Text>*/}
            <Gallery />
            <StatusBar style="auto" />
            {/*<Button title="Take Picture" onPress={takePhoto}></Button>*/}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});