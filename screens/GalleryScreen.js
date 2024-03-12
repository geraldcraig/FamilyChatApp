import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { launchImageLibraryAsync } from "expo-image-picker";
import { useState } from "react";

export default function App() {
    const [imageURIList, setImageURIList] = useState([]);
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
                <Text style={styles.title}>My favorite pictures</Text>
                <View style={styles.body}>
                    <ScrollView>
                        {imageURIList.map((uri, i) => (
                            <Image style={styles.image} key={uri + i} source={{ uri }} />
                        ))}
                    </ScrollView>
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.btn} onPress={pickImage}>
                        <Text style={styles.btnTxt}>Add picture</Text>
                    </TouchableOpacity>
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