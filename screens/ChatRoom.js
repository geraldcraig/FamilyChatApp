import { useContext, useEffect, useRef, useState } from 'react';
import { db } from '../firebaseConfig';
import {collection, getDocs, onSnapshot, query, where} from 'firebase/firestore';
import { AuthContext } from "../context/AuthContext";
import { useAuthContext } from "../hooks/useAuthContext";
import {FlatList, StyleSheet, View} from "react-native";


const useCollection = (c) => {
    const [documents, setDocuments] = useState(null);

    useEffect(() => {
        let ref = collection(db, c);

        const unsub = onSnapshot(ref, (snapshot) => {
            let results = []
            snapshot.docs.forEach(doc => {
                results.push({...doc.data(), id: doc.id})
                console.log('results', results)
            })
            setDocuments(results)
            console.log('results', results)
        })
        return () => unsub()
    }, [c])

    return { documents }
}

export default function ChatRoom() {

    const { documents: chatroom1 } = useCollection('chatroom1')

    const renderItem = ({ item }) => (

        <View style={styles.container}>
            <View style={styles.content}>
                {/*<Text style={styles.name}>{item.firstName} {item.lastName}</Text>*/}
                <Text style={styles.message}>{item.message}</Text>
            </View>
        </View>
    );

    return (
        <FlatList
            data={chatroom1}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
        />
    );
}

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