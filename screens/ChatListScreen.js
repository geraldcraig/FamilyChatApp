import React, { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import userImage from "../assets/images/userImage.jpeg";


const ChatListScreen = ({ navigation }) => {
    const [chatRooms, setChatRooms] = useState([]);

    const uid = auth.currentUser.uid;
    console.log('current user:', uid)
    const name = auth.currentUser.displayName;
    console.log('current user:', name);

    const q = query(collection(db, "chat_rooms"), where("participants", "array-contains", uid));

    // useEffect(() => {
    //     getAllChats().then(r => console.log('get all chats'));
    // }, []);

    // const getAllChats = async () => {

    //     try {
    //         // const querySnapshot = await getDocs(q1);
    //         // querySnapshot.forEach((doc) => {
    //         //     // doc.data() is never undefined for query doc snapshots
    //         //     console.log(doc.id, " => ", doc.data());
    //         // });

    //         const querySnapshot = await getDocs(q);
    //         let results = [];
    //         querySnapshot.forEach((doc) => {
    //             results.push({ id: doc.id, ...doc.data() })
    //         })
    //         setChatRooms(results);
    //     } catch (e) {
    //         console.error("Error getting documents: ", e);
    //     } 
    // }

    useEffect(() => {
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let results = [];
            querySnapshot.docs.forEach((doc) => {
                results.push({ id: doc.id, ...doc.data() })
            });
            results.forEach((result) => {
                console.log("users:", result.id)
            })
            results.forEach((result) => console.log('contacts:', result.displayName));
            setChatRooms(results);
        });
        return () => unsubscribe();
    }, []);

    const renderItem = ({ item }) => (
        <Pressable onPress={() => navigation.navigate('ChatScreen', {
            chatRoomId: item.id,
            // user1: item.user1,
            // user2: item.user2
        })}
            style={styles.chatContainer}>
            <Image
                style={styles.image}
                source={userImage}
            />
            <View style={styles.chatInfo}>
                <Text style={styles.userName}>{item.participants}</Text>
                <Text style={styles.lastMessage}>{item.lastMessage}</Text>
            </View>
            {/* <Text style={styles.timestamp}>{item.timestamp}</Text> */}
        </Pressable>
    );

    return (
        <>
            <View style={styles.container}>
                <FlatList
                    data={chatRooms.sort((a, b) => b.timestamp - a.timestamp)}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                />
            </View>
        </>
    )
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