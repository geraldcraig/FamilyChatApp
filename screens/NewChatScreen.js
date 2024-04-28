import {useEffect, useState} from "react";
import {Button, FlatList, ImageBackground, Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import {Ionicons} from '@expo/vector-icons';
import {
    addDoc, arrayUnion,
    collection,
    doc,
    getDocs,
    onSnapshot,
    query,
    setDoc,
    updateDoc,
    where,
    writeBatch
} from "firebase/firestore";
import {db} from '../firebaseConfig';
import {useAuthContext} from "../components/useAuthContext";

const NewChatScreen = ({route, navigation}) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [chatRoomId, setChatRoomId] = useState('')
    const {selectedUser, currentUser, selectedUserFirstName, selectedUserLastName} = route.params;
    const { user } = useAuthContext();
    const userId = user.uid;
    const selectedUserName = selectedUserFirstName + " " + selectedUserLastName

    const isMyMessage = () => {
        return true;
    }
    useEffect(() => {
        addChatRoom().then(r => console.log('addChatRoom'));
    }, []);

    // useEffect(() => {
    //     getData().then(r => console.log('getData'));
    // }, []);

    // useEffect(() => {
    // updateUserChat();
    // }, []);

    async function addChatRoom() {
        const docRef = await addDoc(collection(db, 'chat_rooms'), {
            chatRoomId: "",
            participants: [currentUser, selectedUser],
            timestamp: new Date(),
            lastMessage: "This is the last message",
            selectedUserName: selectedUserName
        });
        setChatRoomId(docRef.id);
        console.log("Chat room created with ID: ", docRef.id);
    }

    async function getData() {
        const q = query(collection(db, "chat_rooms"), where("participants", "array-contains", userId));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    }

    // function updateUserChat() {
    //     setDoc(doc(db, 'user_chats', userId), {
    //         chatIds: [1]
    //     }).then(rs => console.log('User chat added'));
    // }

    const updateUserChat = async () => {
        const chatRef = doc(db, "users", userId);
        await updateDoc(chatRef, {
            chatRoomIds: arrayUnion(chatRoomId)
        });
        navigation.navigate("Chats");
    }

//     async function batchWrite() {
//         // Get a new write batch
//         const batch = writeBatch(db);
//
// // // Set the value of 'NYC'
// //         const nycRef = doc(db, "cities", "NYC");
// //         batch.set(nycRef, {name: "New York"});
// //
// // Update the population of 'SF'
//         const sfRef = doc(db, "cities", "SF");
//         batch.update(sfRef, {"population": [8999]});
//
// // // Delete the city 'LA'
// //         const laRef = doc(db, "cities", "CO");
// //         batch.delete(laRef);
//
//
// // Commit the batch
//         await batch.commit();
//     }

    // useEffect(() => {
    //     const ref = collection(db, 'chats', chatRoom, 'messages');
    //
    //     const unsubscribe = onSnapshot(ref, (querySnapshot) => {
    //         let results = [];
    //         querySnapshot.docs.forEach((doc) => {
    //             results.push({id: doc.id, ...doc.data()})
    //         });
    //         setMessages(results);
    //     });
    //     return () => unsubscribe();
    // }, ['ref']);
    //
    // const postMessage = async () => {
    //     await addDoc(collection(db, 'chats', chatRoom, 'messages'), {
    //         selectedUser: user1,
    //         currentUser: user2,
    //         message: input,
    //         timestamp: new Date(),
    //     });
    //     console.log("Message posted: " + input);
    //     setInput('');
    // };

    return (
        <>
            <View style={styles.container}>
                <Button title="Click to create chat" onPress={updateUserChat} />

            </View>

            {/*<ImageBackground*/}
            {/*    // source={image}*/}
            {/*    style={styles.backgroundImage}>*/}
            {/*    <FlatList*/}
            {/*        data={messages}*/}
            {/*        renderItem={({item}) => (<Text style={[*/}
            {/*            styles.messagesContainer,*/}
            {/*            {*/}
            {/*                backgroundColor: isMyMessage() ? '#DCF8C5' : 'white',*/}
            {/*                alignSelf: isMyMessage() ? 'flex-end' : 'flex-start',*/}
            {/*            },*/}
            {/*        ]}>{item.message}</Text>)}*/}
            {/*        keyExtractor={(item) => item.id}*/}
            {/*        style={{padding: 10}}*/}
            {/*    />*/}
            {/*</ImageBackground>*/}
            {/*<View style={styles.inputContainer}>*/}
                {/*<Pressable*/}
                {/*    style={styles.button}*/}
                {/*    onPress={() => console.log("Plus icon")}>*/}
                {/*    <Ionicons name="add-outline" size={24} color="black"/>*/}
                {/*</Pressable>*/}
                {/*<TextInput*/}
                {/*    style={styles.textBox}*/}
                {/*    value={input}*/}
                {/*    onChangeText={setInput}*/}
                {/*    placeholder="Type your message here..."*/}
                {/*/>*/}
                {/*<Pressable*/}
                {/*    style={styles.button}*/}
                {/*    onPress={updateUserChat}>*/}
                {/*    <Ionicons name="send-outline" size={24} color="black"/>*/}
                {/*</Pressable>*/}
            {/*</View>*/}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    backgroundImage: {
        flex: 1
    },
    inputContainer: {
        flexDirection: 'row',
        paddingVertical: 8,
        paddingHorizontal: 10,
        height: 50
    },
    textBox: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 50,
        marginHorizontal: 15,
        paddingHorizontal: 12
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 35
    },
    messagesContainer: {
        margin: 5,
        padding: 10,
        borderRadius: 10,
        maxWidth: '80%',

        // Shadows
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,

        elevation: 1,
    },
    time: {
        color: 'gray',
        alignSelf: 'flex-end',
    }
});

export default NewChatScreen;