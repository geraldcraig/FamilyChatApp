import {useCallback, useContext, useEffect, useState} from "react";
import {
    FlatList,
    Image,
    ImageBackground,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { db } from "../firebaseConfig";
import {collection, addDoc, getDoc, doc, getFirestore, getDocs} from "firebase/firestore";
import { useAuthContext } from "../hooks/useAuthContext";
import { Ionicons } from '@expo/vector-icons';
import userImage from "../assets/images/userImage.jpeg";

const ChatScreen = () => {

    const [messageText, setMessageText] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userData, setUserData] = useState([]);

    const { user } = useAuthContext();
    const userId = user.uid;
    console.log("User ID: " + userId);

    useEffect(() => {
        fetchMessages().then();

    }, [userData]);

    async function fetchMessages() {
        const usersRef = collection(db, 'chatroom1')

        const userSnap = await getDocs(usersRef);

        if (!userSnap.empty) {
            const userList = userSnap.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setUserData(userList);
        } else {
            setUserData([]);
        }
    }

    const handleSendMessage = async () => {
        try {
            await addDoc(collection(db, 'chatroom1', ""), {
                message: messageText,
                sender: userId,
                timestamp: new Date()
            })
            setMessageText("");

        } catch (error) {
            console.error('Error adding document: ', error);
        }
    }

    // useEffect(() => {
    //     getUserData().then(r => console.log("User data fetched"));
    // }, []);
    //
    // const getUserData = async () => {
    //     try {
    //         const { uid } = user;
    //         const docRef = doc(db, 'users', uid);
    //         const docSnap = await getDoc(docRef);
    //         if (docSnap.exists()) {
    //             const data = docSnap.data();
    //             setFirstName(data.firstName);
    //             setLastName(data.lastName);
    //         } else {
    //             console.log('No such document!');
    //         }
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }



    // const handleSendMessage = async () => {
    //     try {
    //         const docRef = await addDoc(collection(db, 'chats'), {
    //             firstName: user.firstName,
    //             lastName: user.lastName,
    //             message: messageText,
    //             sender: user.uid,
    //             timestamp: new Date()
    //         });
    //         console.log('Document written with ID: ', docRef.id);
    //         setMessageText("");
    //     } catch (error) {
    //         console.error('Error adding document: ', error);
    //
    //     }
    // }

        // const sendMessage = useCallback(() => {
        //     setMessageText("");
        // }, [messageText]);

        // const handleSendMessage = async () => {
        //     try {
        //         await createMessage(messageText);
        //         setMessageText("");
        //     } catch (error) {
        //         console.error('Error adding document: ', error);
        //     }
        // }
        //
        //     const createMessage = async (message) => {
        //         const docRef = await addDoc(collection(db, 'chats'), {
        //             // get the user's first and last name
        //             firstName: firstName,
        //             lastName: lastName,
        //             message: message,
        //             sender: user.uid,
        //             timestamp: new Date()
        //         });
        //         console.log('Document written with ID: ', docRef.id);
        //     }

    const renderItem = ({ item }) => (
        // pass the selected user to the handleChatPress function

        <Pressable onPress={() => handleChatPress(item.user)} style={styles.chatContainer}>
            <View style={styles.contactContainer}>
                <View style={styles.contactInfo}>
                    <Text style={styles.contactName}>{item.message}</Text>
                </View>
            </View>
        </Pressable>
    );


            return (

                <View style={styles.container}>
                    <View>
                        <FlatList
                            data={userData}
                            keyExtractor={(item) => item.id}
                            renderItem={renderItem}
                        />
                    </View>


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
                            <Ionicons name="add-outline" size={24} color="black"/>
                        </TouchableOpacity>

                        <TextInput
                            style={styles.textBox}
                            value={messageText}
                            onChangeText={(newMessage) => setMessageText(newMessage)}
                            // onSubmitEditing={handleSendMessage}
                        />

                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleSendMessage}>

                            {/*onPress={(sendMessage) => console.log("Send icon: " + messageText)}>*/}

                            <Ionicons name="send-outline" size={24} color="black"/>
                        </TouchableOpacity>

                    </View>
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