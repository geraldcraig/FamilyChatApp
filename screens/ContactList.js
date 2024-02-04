import React from 'react';
import { View, FlatList, Image, Text, StyleSheet } from 'react-native';
import userImage from "../assets/images/userImage.jpeg";

const ContactList = () => {
    const contacts = [
        { id: '1', name: 'John Doe', status: 'Available'},
        { id: '2', name: 'Jane Smith', status: 'Busy'},
        { id: '3', name: 'Bob Johnson', status: 'Offline'},
        {id: '4', name: 'Alice Williams',
            status: 'Hey there!',
            image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/8.png"
        },
        {
            id: '5',
            name: 'Charlie Brown',
            status: 'Hey there!',
            image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/8.png"
        },
        // Add more contacts as needed
    ];

    const renderItem = ({ item }) => (
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

export default ContactList;
