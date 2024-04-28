import React, { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { collection, doc, getDocs, onSnapshot, query, where, updateDoc, arrayUnion} from "firebase/firestore";
import { useAuthContext } from "../components/useAuthContext";
import { db } from "../firebaseConfig";
import userImage from "../assets/images/userImage.jpeg";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import * as FileSystem from 'expo-file-system';


// Create a root reference
const storage = getStorage();

const ContactListScreen = ({ navigation }) => {
    console.log(`FIRST RENDER: ${Date.now()}`);

    // states empty, page renders no data, use effects run, state changes, page renders with data, no effects again

    const [userData, setUserData] = useState([]);
    const [chats, setChats] = useState([]);
    const { user } = useAuthContext();
    const userId = user.uid;
    console.log('contact list screen user:', userId + ' email: ' + user.email);

    const uploadImageAsync = async (uri) => {
        // Why are we using XMLHttpRequest? See:
        // https://github.com/expo/expo/issues/2402#issuecomment-443726662
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
        });

        const fileRef = ref(getStorage(), 'testfile.jpg');
        const result = await uploadBytes(fileRef, blob);

        // We're done with the blob, close and release it
        blob.close();

        // return await getDownloadURL(fileRef);
    }

    const getChats = async (results) => {
        console.log(`function: ${Date.now()}`);

        const myUser = results.find((result) => result.id === userId);

        // console.log(`testing1: ${JSON.stringify(userData)}`);

        console.log(`testing2: ${JSON.stringify(myUser)}`);

        const myChatIds = myUser?.chatIds;

        if (myChatIds) {
            console.log(`testing3: ${JSON.stringify(myChatIds)}`);

            const chatsRef = collection(db, "chats");

            const q = query(chatsRef, where('chatId', 'in', [1,2]));

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
            });

            setChats(querySnapshot.docs);

            const chatRef = collection(db, "chats");
            const q1 = query(chatRef, where("chatId", "in", myChatIds));

            const q2snapshot = await getDocs(q1);
            q2snapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " @@@@@@@ ", doc.data());
            });


        }
    }


    useEffect(() => {
        const ref = collection(db, 'users');

        const unsubscribe = onSnapshot(ref, (querySnapshot) => {
            let results = [];
            querySnapshot.docs.forEach((doc) => {
                results.push({ id: doc.id, ...doc.data() })
            });

            // const filteredResults = results.filter((result) => result.id !== userId);
            // filteredResults.forEach((result) => console.log('contacts:', result.firstName + ' ' + result.lastName));
            setUserData(results);
            console.log('Results', userData)
            console.log(`first effect: ${Date.now()}`);
            getChats(results).then(r => console.log('done'))
        });
        return () => unsubscribe();
    }, []);

    // useEffect(() => {
    //     console.log(`second effect: ${Date.now()}`);
    //     console.log(`testing4: ${JSON.stringify(userData)}`);
    //
    //
    //     getChats().then(e => console.log('test'));
    // }, [])

    const uploadFile = async (imageName) => {
        await uploadImageAsync();

        // const myImageRef = ref(storage, 'myImage.jpg');
        //
        // const fileUri = "";
        //
        // await FileSystem.readAsStringAsync(fileUri).then((file) => {
        //     console.log('file read');
        // })

        // uploadBytes(myImageRef, file).then((snapshot) => {
        //     console.log('Uploaded a blob or file!');
        // });
    }

    const updateUsersChatLists = async (firstUserId, secondUserId, chatId) => {
        const firstUserRef = doc(db, "users", firstUserId);
        const secondUserRef = doc(db, "users", secondUserId);

        await updateDoc(firstUserRef, {
            chatIds: arrayUnion(chatId)
        });

        await updateDoc(secondUserRef, {
            chatIds: arrayUnion(chatId)
        });
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

    const renderItem = ({ item }) => (
        <Pressable
            style={styles.chatContainer}
            onPress={() => {
                navigation.navigate('NewChatScreen', {
                    selectedUser: item.id,
                    currentUser: userId,
                    displayFirstName: item.firstName,
                    displayLastName: item.lastName,
                });
            }}>
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