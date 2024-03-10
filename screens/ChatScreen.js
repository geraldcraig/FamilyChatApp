import {useCallback, useContext, useState} from "react";
import {Button, ImageBackground, Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import {Ionicons} from '@expo/vector-icons';
// import {MessagesContext} from "../store/messages-context";
import { useMessagesDispatch } from "../store/messages-context";

const ChatScreen = () => {
    // const messagesCtx = useContext(MessagesContext)
    // const [messageText, setMessageText] = useState("");
    //
    // const sendMessage = useCallback(() => {
    //     setMessageText("");
    // }, [messageText]);

    const [message, setMessage] = useState('');
    const dispatch = useMessagesDispatch();

    let nextId = 1;

    const handleAddMessage = () => {
        dispatch({
            type: 'added',
            id: nextId++, // Assuming you have nextId defined somewhere
            message: message,
        });
        setMessage('');
    };

    return (
        <View style={styles.container} messages={message}>
            <ImageBackground
                // source={image}
                style={styles.backgroundImage}
            ></ImageBackground>

            <Text>Chat Screen</Text>

            <View style={styles.inputContainer}>
                <Pressable
                    style={styles.button}
                    onPress={() => console.log("Plus icon")}>
                    <Ionicons name="add-outline" size={24} color="black" />
                </Pressable>
                {/*<TextInput*/}
                {/*    style={styles.textBox}*/}
                {/*    value={message}*/}
                {/*    onChangeText={setMessage}*/}
                {/*    // onSubmitEditing={sendMessage}*/}
                {/*/>*/}
                {/*<Pressable*/}
                {/*    style={styles.button}*/}
                {/*    onPress={(sendMessage) => console.log("Send icon: " + messageText)}>*/}
                {/*    <Ionicons name="send-outline" size={24} color="black" />*/}
                {/*</Pressable>*/}
                <Button title="Add" onPress={handleAddMessage} />
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
