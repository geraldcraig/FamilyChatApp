import { useEffect, useState } from "react";
import { FlatList, ImageBackground, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { addDoc, collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from '../firebaseConfig';

const NewChatScreen = ({ route, navigation }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const { selectedUser, currentUser, displayFirstName, displayLastName } = route.params;

    const isMyMessage = () => {
        return true;
    }
    useEffect(() => {
        addDoc(collection(db, 'chats'), {
            user1: selectedUser,
            user2: currentUser,
            timestamp: new Date(),
            lastMessage: "This is the last message",
            displayFirstName: displayFirstName,
            displayLastName: displayLastName,

        }).then(r => console.log("Chat room created"));
    }, []);

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
            <ImageBackground
                // source={image}
                style={styles.backgroundImage}>
                <FlatList
                    data={messages}
                    renderItem={({ item }) => (<Text style={[
                        styles.messagesContainer,
                        {
                            backgroundColor: isMyMessage() ? '#DCF8C5' : 'white',
                            alignSelf: isMyMessage() ? 'flex-end' : 'flex-start',
                        },
                    ]}>{item.message}</Text>)}
                    keyExtractor={(item) => item.id}
                    style={{ padding: 10 }}
                />
            </ImageBackground>
            <View style={styles.inputContainer}>
                <Pressable
                    style={styles.button}
                    onPress={() => console.log("Plus icon")}>
                    <Ionicons name="add-outline" size={24} color="black" />
                </Pressable>
                <TextInput
                    style={styles.textBox}
                    value={input}
                    onChangeText={setInput}
                    placeholder="Type your message here..."
                />
                {/*<Pressable*/}
                {/*    style={styles.button}*/}
                {/*    onPress={postMessage}>*/}
                {/*    <Ionicons name="send-outline" size={24} color="black"/>*/}
                {/*</Pressable>*/}
            </View>
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