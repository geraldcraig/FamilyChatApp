import React, {useEffect, useState} from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import userImage from "../assets/images/userImage.jpeg";
import chats from '../assets/data/chats.json';

import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const ChatListScreen = ({ navigation }) => {
    // function UserChats() {
    //     const [messages, setMessages] = useState(null);
    //
    //     useEffect(() => {
    //         const ref = collection(db, 'messages');
    //
    //         getDocs(ref)
    //             .then((snapshot) => {
    //                 let results = []
    //                 snapshot.docs.forEach(doc => {
    //                     results.push({id: doc.id, ...doc.data()})
    //                 })
    //                 setMessages(results)
    //             })
    //     }, []);
    // }

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
                <Text style={styles.userName}>{item.user.name}</Text>
                <Text style={styles.lastMessage}>{item.lastMessage}</Text>
            </View>
            <Text style={styles.timestamp}>{item.timestamp}</Text>
        </Pressable>
    );

    return (
        <FlatList
            data={chats}
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