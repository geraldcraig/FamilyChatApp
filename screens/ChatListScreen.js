import React, { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { collection, getDocs, onSnapshot, query, where, getDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import userImage from "../assets/images/userImage.jpeg";

const ChatListScreen = ({ navigation }) => {
    const [chatRooms, setChatRooms] = useState([]);
    // const [participants, setParticipants] = useState([]);

    const [participantsMapping, setParticipantsMapping] = useState({});

    const uid = auth.currentUser.uid;
    console.log('current user:', uid)
    const name = auth.currentUser.displayName;
    console.log('current user:', name);

    const q = query(collection(db, "chat_rooms"), where("participants", "array-contains", uid));

    const getChatRecipient = (item) => {
        const participants = item.participants;
        const recipientUserId = participants.filter((e) => e !== uid);

        const chatRecipient = participantsMapping[recipientUserId];

        return chatRecipient;
    }

    const getParticipants = async (chatRooms) => {

        const otherParticipantIdList = chatRooms
            .map(e => e.participants);

        const filteredList = [];
        otherParticipantIdList.forEach(f => {
            filteredList.push(f.filter(g => g !== uid)[0])
        });

        if (otherParticipantIdList.length) {
            const q = query(collection(db, "users"), where("userId", "in", filteredList));

            const results = {};

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {

                results[doc.data().userId] = doc.data().userName;
            });

            setParticipantsMapping(results);
        }
    }

    useEffect(() => {
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let results = [];
            querySnapshot.docs.forEach((doc) => {
                results.push({ id: doc.id, ...doc.data() })
            });
            results.forEach((result) => {
                console.log("users:", result.id)
            })
            results.forEach((result) => console.log('contacts:', result.displayName));
            setChatRooms(results);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        getParticipants(chatRooms);
    }, [chatRooms]);

    const renderItem = ({ item }) => (
        <Pressable onPress={() => navigation.navigate('ChatScreen', {
            chatRoomId: item.id,
        })}
                   style={styles.chatContainer}>
            <Image
                style={styles.image}
                source={userImage}
            />
            <View style={styles.chatInfo}>
                <Text style={styles.userName}>{getChatRecipient(item)}</Text>
                <Text style={styles.lastMessage}>{item.lastMessage}</Text>
            </View>
            <Text style={styles.timestamp}>{item.displayDate}</Text>
        </Pressable>
    );

    return (
        <>
            <View style={styles.container}>
                <FlatList
                    data={chatRooms}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                />
            </View>
        </>
    )
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