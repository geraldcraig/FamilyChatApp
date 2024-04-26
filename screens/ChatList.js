import React, {useEffect, useRef, useState} from 'react';
import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {collection, getDocs, onSnapshot, query, where} from "firebase/firestore";
import {db} from "../firebaseConfig";
import userImage from "../assets/images/userImage.jpeg";
import {useAuthContext} from "../components/useAuthContext";


const ChatList = ({navigation}) => {
    // const [chatRooms, setChatRooms] = useState([]);
    const {user} = useAuthContext();
    const userId = user.uid;

    const citiesRef = collection(db, "chats");
    const q1 = query(citiesRef, where("user2", "==", userId));



    // console.log("q1", q1);

    useEffect(() => {
        getAllChats().then(r => console.log('hello'));
    }, []);

    const getAllChats = async () => {

        try {


            const querySnapshot = await getDocs(q1);
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
            });

        } catch (e) {
            console.error("Error getting documents: ", e);
        }
    }


    return (
        <>
            <View style={styles.container}>
                <Text>Chat List</Text>
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

export default ChatList;