import {useEffect, useState} from "react";
import { Button, Image, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { launchImageLibraryAsync } from "expo-image-picker";
import { getStorage, ref, listAll } from "firebase/storage";



export default function App() {
    const [imageURIList, setImageURIList] = useState([]);

    useEffect(() => {



    const storage = getStorage();
    const listRef = ref(storage, 'images');

// Find all the prefixes and items.
    listAll(listRef)
        .then((res) => {
            res.prefixes.forEach((folderRef) => {
                // All the prefixes under listRef.
                // You may call listAll() recursively on them.
            });
            res.items.forEach((itemRef) => {
                // All the items under listRef.
                console.log(itemRef.root)
            });
        }).catch((error) => {
        // Uh-oh, an error occurred!
    });

    }, []);


    async function pickImage() {
        const image = await launchImageLibraryAsync();
        if (image.canceled) {
            alert("No image selected");
        } else {
            setImageURIList([...imageURIList, image.assets[0].uri]);
        }
    }

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
                    <Button title="Add picture" onPress={pickImage} />
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