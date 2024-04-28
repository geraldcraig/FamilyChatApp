import React, { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import {collection, doc, getDocs, onSnapshot, query, where, updateDoc, arrayUnion, addDoc} from "firebase/firestore";
import { useAuthContext } from "../components/useAuthContext";
import { db } from "../firebaseConfig";
import userImage from "../assets/images/userImage.jpeg";
import { getStorage, ref, uploadBytes } from "firebase/storage";


const ContactListScreen = ({ navigation }) => {
    const [userData, setUserData] = useState([]);
    const [chats, setChats] = useState([]);
    const { user } = useAuthContext();
    const userId = user.uid;
    console.log('contact list screen user:', userId + ' email: ' + user.email);

    // const getChats = async (results) => {
    //     console.log(`function: ${Date.now()}`);
    //
    //     const myUser = results.find((result) => result.id === userId);
    //
    //     // console.log(`testing1: ${JSON.stringify(userData)}`);
    //
    //     console.log(`testing2: ${JSON.stringify(myUser)}`);
    //
    //     const myChatIds = myUser?.chatIds;
    //
    //     if (myChatIds) {
    //         console.log(`testing3: ${JSON.stringify(myChatIds)}`);
    //
    //         const chatsRef = collection(db, "chats");
    //
    //         const q = query(chatsRef, where('chatId', 'in', [1,2]));
    //
    //         const querySnapshot = await getDocs(q);
    //         querySnapshot.forEach((doc) => {
    //             // doc.data() is never undefined for query doc snapshots
    //             console.log(doc.id, " => ", doc.data());
    //         });
    //
    //         setChats(querySnapshot.docs);
    //
    //         const chatRef = collection(db, "chats");
    //         const q1 = query(chatRef, where("chatId", "in", myChatIds));
    //
    //         const q2snapshot = await getDocs(q1);
    //         q2snapshot.forEach((doc) => {
    //             // doc.data() is never undefined for query doc snapshots
    //             console.log(doc.id, " @@@@@@@ ", doc.data());
    //         });
    //
    //
    //     }
    // }

    const ref = collection(db, 'users');

    useEffect(() => {
        getAllUsers().then(r => console.log('getAllUsers'));
    }, []);

    const getAllUsers = async () => {
        const unsubscribe = onSnapshot(ref, (querySnapshot) => {
            let results = [];
            querySnapshot.docs.forEach((doc) => {
                results.push({ id: doc.id, ...doc.data() })
            });
            setUserData(results);
            results.forEach((result) => {
                console.log("users:", result.firstName, result.lastName)
            })
        });
        return () => unsubscribe();
    }

    // useEffect(() => {
    //     const ref = collection(db, 'user_chats');
    //
    //     const unsubscribe = onSnapshot(ref, (querySnapshot) => {
    //         let results = [];
    //         querySnapshot.docs.forEach((doc) => {
    //             results.push({ id: doc.id, ...doc.data() })
    //         });
    //         // const filteredResults = results.filter((result) => result.id !== userId);
    //         // filteredResults.forEach((result) => console.log('result:', result.firstName + ' ' + result.lastName));
    //         setUserData(results);
    //         results.forEach((result) => console.log("chatRoomIds: " + result.chatIds))
    //     });
    //     return () => unsubscribe();
    // }, ['ref']);


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

    // async function addChatRoom() {
    //     const docRef = await addDoc(collection(db, 'chat_rooms'), {
    //         chatRoomId: "",
    //         participants: [item.id, selectedUser],
    //         timestamp: new Date(),
    //         lastMessage: "This is the last message",
    //         selectedUserName: selectedUserName
    //     });
    //     // console.log("Chat room created with ID: ", docRef.id);
    // }

    const renderItem = ({ item }) => (
        <Pressable
            style={styles.chatContainer}
            onPress={() => {
                navigation.navigate('NewChatScreen', {
                    selectedUser: item.id,
                    currentUser: userId,
                    selectedUserFirstName: item.firstName,
                    selectedUserLastName: item.lastName,
                });
            }}
            // onPress={addChatRoom}
        >
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
            data={userData.filter((result) => {
                return result.id !== userId})}
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