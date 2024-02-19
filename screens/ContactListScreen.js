import React from 'react';
import {View, FlatList, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import userImage from "../assets/images/userImage.jpeg";

const ContactListScreen = ({ navigation }) => {
    const contacts = [
        { id: '1', name: 'John Doe', status: 'Available'},
        { id: '2', name: 'Jane Smith', status: 'Busy'},
        { id: '3', name: 'Bob Johnson', status: 'Offline'},
        { id: '4', name: 'Alice Williams', status: 'Hey there'},
        { id: '5', name: 'Robert Smith', status: 'Hey there!'},
        { id: '6', name: 'David Jones', status: 'Hey there!'},
        { id: '7', name: 'John Wilson', status: 'Hey there!'},
        { id: '8', name: 'Bob Smith', status: 'Hey there!'},
        { id: '9', name: 'Joe Jones', status: 'Hey there!'}
    ];

    const handleChatPress = (user) => {
        // Navigate to the ChatScreen with the selected user
        navigation.navigate('Chats', { user });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleChatPress(item.user)} style={styles.chatContainer}>

            <View style={styles.contactContainer}>

                <Image
                    style={styles.image}
                    source={userImage}
                />
                <View style={styles.contactInfo}>
                    <Text style={styles.contactName}>{item.name}</Text>
                    <Text style={styles.contactStatus}>{item.status}</Text>
                </View>
            </View>
        </TouchableOpacity>

    );

    return (
        <FlatList
            data={contacts}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
        />
    );
};

const styles = StyleSheet.create({
    contactContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    contactImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    contactInfo: {
        flex: 1,
    },
    contactName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    contactStatus: {
        color: '#555',
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

export default ContactListScreen;