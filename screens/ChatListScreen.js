import React from 'react';
import {View, FlatList, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import userImage from "../assets/images/userImage.jpeg";
import chats from '../assets/data/chats.json';

const ChatListScreen = ({ navigation }) => {
    // const chats = [
    //     {
    //         id: '1',
    //         user: { name: 'John Doe' },
    //         lastMessage: "How are you doing? Did you get any chance to look at what I've sent you?",
    //         timestamp: '2:30 PM',
    //     },
    //     {
    //         id: '2',
    //         user: { name: 'Jane Smith' },
    //         lastMessage: "Well done this sprint, guys!",
    //         timestamp: 'Yesterday',
    //     },
    //     {
    //         id: '3',
    //         user: { name: 'Bob Johnson' },
    //         lastMessage: "Could you please review my last merge?",
    //         timestamp: 'Monday',
    //     },
    // ];

    const handleChatPress = (user) => {
        // Navigate to the ChatScreen with the selected user
        navigation.navigate('Chats', { user });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleChatPress(item.user)} style={styles.chatContainer}>
            <Image
                style={styles.image}
                source={userImage}
            />
            <View style={styles.chatInfo}>
                <Text style={styles.userName}>{item.user.name}</Text>
                <Text style={styles.lastMessage}>{item.lastMessage}</Text>
            </View>
            <Text style={styles.timestamp}>{item.timestamp}</Text>
        </TouchableOpacity>
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