import React, { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import userImage from "../assets/images/userImage.jpeg";

const ContactListScreen = ({ navigation }) => {
    const [userData, setUserData] = useState([]);


    useEffect(() => {
        const ref = collection(db, 'users');

        const unsubscribe = onSnapshot(ref, (querySnapshot) => {
            let results = [];
            querySnapshot.docs.forEach((doc) => {
                results.push({ id: doc.id, ...doc.data() })
            });
            setUserData(results);
        });
        return () => unsubscribe();
    }, []);

    // const createChatRoom = async (selectedUser, currentUser, displayFirstName, displayLastName) => {
    //     await addDoc(collection(db, 'chats'), {
    //         user1: selectedUser,
    //         user2: currentUser,
    //         timestamp: new Date(),
    //         lastMessage: "This is the last message",
    //         displayFirstName: displayFirstName,
    //         displayLastName: displayLastName,
    //     }).then(r => navigation.navigate('ChatScreen', {
    //         chatRoomId: r.id,
    //         user1: selectedUser,
    //         user2: currentUser,
    //     }));
    //     };

    const renderItem = ({ item }) => (
        <Pressable
            style={styles.chatContainer}
            onPress={() => {
                navigation.navigate('ChatScreen', {user});
            }}>
            {/*// onPress={createChatRoom}>*/}
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