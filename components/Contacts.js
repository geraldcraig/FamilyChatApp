import React, { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import userImage from "../assets/images/userImage.jpeg";


const ContactListScreen = ({ navigation }) => {
    const [users, setUsers] = useState(null)

    useEffect(() => {
        const ref = collection(db, 'users')

        getDocs(ref)
        .then((snapshot) => {
            let results = []
            snapshot.docs.forEach(doc => {
                results.push({id: doc.id, ...doc.data()})
            })
            setUsers(results)
        })
    }, [])

    // const useCollection = (c) => {
    //     const [documents, setDocuments] = useState(null);
    
    //     useEffect(() => {
    //         let ref = collection(db, c);
    
    //         const unsub = onSnapshot(ref, (snapshot) => {
    //             let results = []
    //             snapshot.docs.forEach(doc => {
    //                 results.push({...doc.data(), id: doc.id})
    //                 console.log('results', results)
    //             })
    //             setDocuments(results)
    //             console.log('results', results)
    //         })
    //         return () => unsub()
    //     }, [c])
    
    //     return { documents }
    // }

    // const handleChatPress = (user) => {
    //     // Navigate to the ChatScreen with the selected user
    //     navigation.navigate('ChatScreen', { user });
    // };

    // const renderItem = ({ item }) => (
    //     <Pressable onPress={() => handleChatPress(item.user)} style={styles.chatContainer}>
    //         <View style={styles.contactContainer}>
    //             <Image
    //                 style={styles.image}
    //                 source={userImage}
    //             />
    //             <View style={styles.contactInfo}>
    //                 <Text style={styles.contactName}>{item.name}</Text>
    //                 <Text style={styles.contactStatus}>{item.status}</Text>
    //             </View>
    //         </View>
    //     </Pressable>

    // );

    // return (
    //     <FlatList
    //         data={contacts}
    //         keyExtractor={(item) => item.id}
    //         renderItem={renderItem}
    //     />
    // );
    const UserList = ({ users }) => {
        const handleClick = async (id) => {
          console.log(id);
        };
      
        return (
          <View style={styles.userList}>
            <Text>User List</Text>
            <View>
              {users.map(user => (
                <TouchableOpacity key={user.id} onPress={() => handleClick(user.id)}>
                  <Text>{user.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );
      };
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