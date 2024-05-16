import React, { useEffect, useState } from 'react';
import {Image, View, FlatList, StyleSheet} from 'react-native';
import { getDownloadURL, getStorage, listAll, ref } from "firebase/storage";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from '../firebaseConfig';

const Images = () => {
    const [imageUrls, setImageUrls] = useState([]);
    const storage = getStorage();

    const getImages = async () => {
        const listRef = ref(storage, 'images');
        const result = await listAll(listRef);
        const downloadURLs = await Promise.all(result.items.map(itemRef => getDownloadURL(itemRef)));
        setImageUrls(downloadURLs);
    }

    useEffect(() => {
        getImages();
    }, []);

    // const [imageUrls, setImageUrls] = useState([]);
    //
    // useEffect(() => {
    //     const unsubscribe = onSnapshot(collection(db, 'images'), (snapshot) => {
    //         const newImageUrls = snapshot.docs.map(doc => doc.data().url);
    //         setImageUrls(newImageUrls);
    //         console.log(newImageUrls);
    //     });
    //
    //     // Clean up the subscription on unmount
    //     return () => unsubscribe();
    // }, []);

    return (
        <View>
            <FlatList
                data={imageUrls}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <Image
                        style={styles.image}
                        source={{ uri: item }}
                    />
                )}
            />
        </View>
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

export default Images;