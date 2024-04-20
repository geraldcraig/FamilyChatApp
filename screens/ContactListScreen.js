import React, { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { ref, onValue } from "firebase/database";
import { db } from '../firebaseConfig';
import userImage from "../assets/images/userImage.jpeg";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import { useAuthContext } from "../hooks/useAuthContext";


const ContactListScreen = ({ navigation }) => {
    const [userData, setUserData] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const { user } = useAuthContext();
    const currentUser = user.uid;
    const currentUserUid = "WWtKk5TV3LaYiRU6Bzz3MRcwWbk1";
    const selectedUserUid = "d5Nmf2DzP6N1hCI6s9VvX2XtIWg1";

    useEffect(() => {
        fetchUserData();
    }, []);

    // function fetchUserData() {
    //     const dbRef = ref(db, 'users/');
    //     onValue(dbRef, (snapshot) => {
    //         const data = snapshot.val();
    //         if (data) {
    //             const userList = Object.keys(data).map((key) => ({
    //                 id: key,
    //                 ...data[key]
    //             }));
    //             setUserData(userList);
    //         } else {
    //             setUserData([]);
    //         }
    //     });
    // }

    async function fetchUserData() {
        const db = getFirestore();
        const usersRef = collection(db, 'users');

        const userSnap = await getDocs(usersRef);

        if (!userSnap.empty) {
            const userList = userSnap.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            // Remove the current user from the list
            const filteredUsers = userList.filter(user => user.id !== currentUser);
            setUserData(filteredUsers);
            // setUserData(userList);
        } else {
            setUserData([]);
        }
    }

    const createChatRoom = async (currentUserUid, selectedUserUid) => {
        const db = getFirestore();
        const chatroomsRef = collection(db, 'chatrooms');

        const chatroomData = {
            users: [currentUserUid, selectedUserUid],
            createdAt: new Date()
        };

        try {
            const docRef = await addDoc(chatroomsRef, chatroomData);
            console.log("Chatroom created with ID: ", docRef.id);
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    }

// Call the function with currentUserUid and selectedUserUid
    createChatRoom(currentUserUid, selectedUserUid);

    const handleChatPress = ({currentUser}) => {
        // Navigate to the ChatScreen with the selected user
        navigation.navigate('ChatScreen', { email: user.email });
    };

    const renderItem = ({ item }) => (
        // pass the selected user to the handleChatPress function

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