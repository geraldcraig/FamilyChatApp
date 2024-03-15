import React, { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { ref, onValue } from "firebase/database";
import { db } from '../firebaseConfig';
import userImage from "../assets/images/userImage.jpeg";

const ContactListScreen = ({ navigation }) => {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        fetchUserData();
    }, []);

    function fetchUserData() {
        const dbRef = ref(db, 'users/');
        onValue(dbRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const userList = Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key]
                }));
                setUserData(userList);
            } else {
                setUserData([]);
            }
        });
    }

    const handleChatPress = (user) => {
        // Navigate to the ChatScreen with the selected user
        navigation.navigate('ChatScreen', { user });
    };

    const renderItem = ({ item }) => (
        <Pressable onPress={() => handleChatPress(item.user)} style={styles.chatContainer}>
            <View style={styles.contactContainer}>
                <Image
                    style={styles.image}
                    source={userImage}
                />
                <View style={styles.contactInfo}>
                    <Text style={styles.contactName}>{item.firstName} {item.lastName}</Text>
                    <Text style={styles.contactStatus}>{item.status}</Text>
                </View>
            </View>
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