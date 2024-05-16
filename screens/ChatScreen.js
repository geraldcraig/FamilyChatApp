import { useEffect, useState } from "react";
import { FlatList, ImageBackground, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { addDoc, collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { auth, db } from '../firebaseConfig';

const ChatScreen = ({ route, navigation }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const { chatRoomId } = route.params;
    const chatRoom = chatRoomId;

    const uid = auth.currentUser.uid;
    console.log('current user:', uid)
    const name = auth.currentUser.displayName;
    console.log('current user:', name);

    const isMyMessage = (item) => {
        return item.userId === uid;
    }

    useEffect(() => {
        const ref = collection(db, 'chat_rooms', chatRoom, 'messages');

        const unsubscribe = onSnapshot(ref, (querySnapshot) => {
            let results = [];
            querySnapshot.docs.forEach((doc) => {
                results.push({ id: doc.id, ...doc.data() })
            });
            setMessages(results);
        });
        return () => unsubscribe();
    }, []);

    const postMessage = async () => {
        await addDoc(collection(db, 'chat_rooms', chatRoom, 'messages'), {
            userId: uid,
            message: input,
            timestamp: new Date(),
            displayDate: new Date().toLocaleDateString()
        });
        setInput('');

        const chatroomDocRef = doc(db, "chat_rooms", chatRoom);

        await updateDoc(chatroomDocRef, {
            lastMessage: input,
            displayDate: new Date().toLocaleDateString()
        });
    };

    return (
        <>
            <ImageBackground
                // source={image}
                style={styles.backgroundImage}>
                <FlatList
                    data={messages.sort((a, b) => a.timestamp - b.timestamp)}
                    renderItem={({ item }) => (<Text style={[
                        styles.messagesContainer,
                        {
                            backgroundColor: isMyMessage(item) ? '#DCF8C5' : 'white',
                            alignSelf: isMyMessage(item) ? 'flex-end' : 'flex-start',
                        },
                    ]}>{item.message}</Text>)}
                    keyExtractor={(item) => item.id}
                    style={{ padding: 10 }}
                />
            </ImageBackground>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 90}
                style={styles.bg}
            >

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
                <Pressable
                    style={styles.button}
                    onPress={postMessage}>
                    <Ionicons name="send-outline" size={24} color="black" />
                </Pressable>
            </View>
            </KeyboardAvoidingView>
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

export default ChatScreen;