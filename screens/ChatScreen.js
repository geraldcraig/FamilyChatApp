import { useCallback, useState } from "react";
import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { ref, child, push, update, get } from "firebase/database";
import { db } from "../firebaseConfig";
import { useAuthContext } from "../context/AuthContext";


const ChatScreen = () => {

    const [messageText, setMessageText] = useState("");
    const { user } = useAuthContext();
    const uid = user.uid;

    const sendMessage = () => {
        const usersRef = ref(db, 'users/');
        const userRef = child(usersRef, uid);

        get(userRef).then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                console.log(data);
                const { firstName, lastName } = data;
                console.log(firstName, lastName);       
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    };



    // function sendMessage(messageText) {
    //     const { user } = useAuthContext();
    //     const uid = user.uid;

    //     // A post entry.
    //     const postData = {
    //         // messageId: messageId,
    //         userId: uid,
    //         message: messageText,
    //         // timestamp: timestamp
    //     };

    //     // Get a key for a new Post.
    //     const newPostKey = push(child(ref(db), 'posts')).key;

    //     // Write the new post's data simultaneously in the posts list and the user's post list.
    //     const updates = {};
    //     updates['/posts/' + newPostKey] = postData;
    //     updates['/user-posts/' + uid + '/' + newPostKey] = postData;

    //     return update(ref(db), updates);
    // }
    // const sendMessage = useCallback(() => {
    //     const messageId = firebase.database().ref().child('chats').push().key;
    //     const userId = firebase.auth().currentUser.uid;
    //     const timestamp = firebase.database.ServerValue.TIMESTAMP;

    //     const messageData = {
    //         messageId: messageId,
    //         userId: userId,
    //         message: messageText,
    //         timestamp: timestamp
    //     };

    //     firebase.database().ref(`chats/${messageId}`).set(messageData)
    //         .then(() => {
    //             setMessageText("");
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }, [messageText]);

    return (
        <View style={styles.container}>
            <ImageBackground
                // source={image}
                style={styles.backgroundImage}
            ></ImageBackground>

            <Text>Chat Screen</Text>

            <View style={styles.inputContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => console.log("Plus icon")}>
                    <Ionicons name="add-outline" size={24} color="black" />
                </TouchableOpacity>

                <TextInput
                    style={styles.textBox}
                    value={messageText}
                    onChangeText={(newMessage) => setMessageText(newMessage)}
                    onSubmitEditing={sendMessage}
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={sendMessage}>
                    <Ionicons name="send-outline" size={24} color="black" />
                </TouchableOpacity>

            </View>
        </View>
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
    }
});


export default ChatScreen;