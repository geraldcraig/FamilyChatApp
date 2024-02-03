import React from 'react';
import {View, FlatList, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';

const ChatList = ({ navigation }) => {
    const chats = [
        {
            id: '1',
            user: { name: 'John Doe', image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/8.png" },
            lastMessage: "How are you doing? Did you get any chance to look at what I've sent you?",
            timestamp: '2:30 PM',
        },
        {
            id: '2',
            user: { name: 'Jane Smith', image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/8.png" },
            lastMessage: "Well done this sprint, guys!",
            timestamp: 'Yesterday',
        },
        {
            id: '3',
            user: { name: 'Bob Johnson', image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/8.png" },
            lastMessage: "Could you please review my last merge?",
            timestamp: 'Monday',
        },
        // Add more chats as needed
    ];

    const handleChatPress = (user) => {
        // Navigate to the ChatScreen with the selected user
        navigation.navigate('ChatScreen', { user });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleChatPress(item.user)} style={styles.chatContainer}>
            <Image source={{ uri: item.user.image }} style={styles.userImage}/>
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
});

export default ChatList;
