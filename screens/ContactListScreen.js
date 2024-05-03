import React, { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { collection, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import userImage from "../assets/images/userImage.jpeg";


const ContactListScreen = ({ navigation }) => {
    const [userData, setUserData] = useState([]);

    const uid = auth.currentUser.uid;
    console.log('current user:', uid)
    const name = auth.currentUser.displayName;
    console.log('current user:', name);

    // useEffect(() => {
    //     getUser();
    // }, []);

    // const getUser = () => {
    //     onAuthStateChanged(auth, (user) => {
    //         if (user) {
    //             const userId = user.uid;
                
    //             setUserId(userId);
    //         } else {
    //             console.log('user signed out')
    //         }   
    //     });
    // }

    useEffect(() => {
        const ref = collection(db, 'users');

        const unsubscribe = onSnapshot(ref, (querySnapshot) => {
            let results = [];
            querySnapshot.docs.forEach((doc) => {
                results.push({ id: doc.id, ...doc.data() })
            });
            results.forEach((result) => {
                console.log("users:", result.id)
            })
            results.forEach((result) => console.log('contacts:', result.displayName));
            setUserData(results);
        });
        return () => unsubscribe();
    }, []);

    const renderItem = ({ item }) => (
        <Pressable
            style={styles.chatContainer}
            onPress={() => {
                navigation.navigate('NewChatScreen', {
                    selectedUser: item.id,
                    currentUser: uid,
                    userName: item.userName
                });
            }}>
       
            <View style={styles.contactContainer}>
                <Image
                    style={styles.image}
                    source={userImage}
                />
                <View style={styles.contactInfo}>
                    <Text style={styles.contactName}>{item.userName}</Text>
                    <Text style={styles.contactStatus}>{item.status}</Text>
                </View>
            </View>
        </Pressable>
    );

    return (
        <FlatList
            data={userData.filter((result) => {
                return result.id !== uid
            })}
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