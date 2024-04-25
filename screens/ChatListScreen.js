import React, { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import userImage from "../assets/images/userImage.jpeg";
import { useAuthContext } from "../hooks/useAuthContext";


const ChatListScreen = ({ navigation }) => {
    const [chatRooms, setChatRooms] = useState([]);
    const { user } = useAuthContext();
    const userId = user.email;
    console.log('chat list screen user:', userId);

    useEffect(() => {
        const ref = collection(db, 'chats');

        const unsubscribe = onSnapshot(ref, (querySnapshot) => {
            let results = [];
            querySnapshot.docs.forEach((doc) => {
                results.push({ id: doc.id, ...doc.data() })
            })

            results.sort((a, b) => b.timestamp - a.timestamp);
            setChatRooms(results);
        });
        return () => unsubscribe();
    }, ['ref']);

    const renderItem = ({ item }) => (
        <Pressable onPress={() => navigation.navigate('ChatScreen', {
            chatRoomId: item.id,
            user1: item.user1,
            user2: item.user2
        })}
            style={styles.chatContainer}>
            <Image
                style={styles.image}
                source={userImage}
            />
            <View style={styles.chatInfo}>
                <Text style={styles.userName}>{item.displayFirstName} {item.displayLastName}</Text>
                <Text style={styles.lastMessage}>{item.lastMessage}</Text>
            </View>
            {/*<Text style={styles.timestamp}>{item.timestamp.toDateString()}</Text>*/}
        </Pressable>
    );

    return (
        <>
            <View style={styles.container}>
                <FlatList
                    data={chatRooms}
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