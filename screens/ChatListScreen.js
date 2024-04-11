import React, { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { ref, onValue } from "firebase/database";
import { db } from '../firebaseConfig';
import userImage from "../assets/images/userImage.jpeg";
import { collection, getDocs, getFirestore } from "firebase/firestore";

const ChatListScreen = ({ navigation }) => {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        fetchUserData();
    }, []);

    // function fetchUserData() {
    //     const dbRef = ref(db, 'chats/');
    //     onValue(dbRef, (snapshot) => {
    //         const data = snapshot.val();
    //         if (data) {
    //             const userList = Object.keys(data).map((key) => ({
    //                 id: key,
    //                 ...data[key]
    //             }));
    //             setUserData(userList);
    //         } else {
    //             setUserData([]);
    //         }
    //     });
    // }

    async function fetchUserData() {
        const db = getFirestore();
        const chatsRef = collection(db, 'chats');

        const chatSnap = await getDocs(chatsRef);

        if (!chatSnap.empty) {
            const chatList = chatSnap.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setUserData(chatList);
        } else {
            setUserData([]);
        }
    }

    const handleChatPress = (user) => {
        // Navigate to the ChatScreen with the selected user
        navigation.navigate('ChatScreen', { user });
    };

    const renderItem = ({ item }) => (
        <Pressable onPress={() => handleChatPress(item.user)} style={styles.chatContainer}>
            <Image
                style={styles.image}
                source={userImage}
            />
            <View style={styles.chatInfo}>
                <Text style={styles.userName}>{item.firstName} {item.lastName}</Text>
                <Text style={styles.lastMessage}>{item.lastMessage}</Text>
            </View>
            <Text style={styles.timestamp}>{item.timestamp}</Text>
        </Pressable>
    );

    return (
        <FlatList
            data={userData}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
        />
    );
};

const styles = StyleSheet.create({
    chatContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    chatInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    lastMessage: {
        color: '#555',
    },
    timestamp: {
        color: '#777',
    },
    image: {
        borderRadius: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        height: 50,
        width: 50,
        marginRight: 10
    }
});

export default ChatListScreen;