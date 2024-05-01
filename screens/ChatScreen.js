import {useState} from "react";
import {ImageBackground, StyleSheet, Text, TextInput, Pressable, View} from "react-native";
import { Ionicons } from '@expo/vector-icons';

const ChatScreen = () => {

    const [messageText, setMessageText] = useState("");

    // const sendMessage = useCallback(() => {
    //     setMessageText("");
    // }, [messageText]);

    const sendMessage = () => {
        console.log("message: " + messageText)
        setMessageText('')
    }

    return (
        <View style={styles.container}>
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

                <TextInput
                    style={styles.textBox}
                    value={messageText}
                    onChangeText={(newMessage) => setMessageText(newMessage)}
                    onSubmitEditing={sendMessage}
                />

                <Pressable
                    style={styles.button}
                    onPress={sendMessage}>
                    <Ionicons name="send-outline" size={24} color="black" />
                </Pressable>

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