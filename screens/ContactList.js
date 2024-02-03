import React from 'react';
import { View, FlatList, Image, Text, StyleSheet } from 'react-native';

const ContactList = () => {
    const contacts = [
        { id: '1', name: 'John Doe', status: 'Available', image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/8.png" },
        { id: '2', name: 'Jane Smith', status: 'Busy', image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/8.png" },
        { id: '3', name: 'Bob Johnson', status: 'Offline', image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/8.png" },
        // Add more contacts as needed
    ];

    const renderItem = ({ item }) => (
        <View style={styles.contactContainer}>
            <Image source={{ uri: item.image }} style={styles.contactImage} />
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
});

export default ContactList;
