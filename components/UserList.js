import React, {useState} from "react";
import {SafeAreaView, FlatList, StyleSheet, Text, View} from "react-native";
import {collection, addDoc, getDocs} from "firebase/firestore";
import {db} from '../firebaseConfig';


// const users = [
//     {
//         id: "1",
//         name: "John Doe",
//         status: "Available"
//     },
//     {
//         id: "2",
//         name: "Jane Smith",
//         status: "Busy"
//     },
//     {
//         id: "3",
//         name: "Bob Johnson",
//         status: "Offline"
//     },
//     {
//         id: "4",
//         name: "Alice Williams",
//         status: "Hey there"
//     },
//     {
//         id: "5",
//         name: "Robert Smith",
//         status: "Hey there!"
//     },
//     {
//         id: "6",
//         name: "David Jones",
//         status: "Hey there!"
//     },
//     {
//         id: "7",
//         name: "John Wilson",
//         status: "Hey there!"
//     },
//     {
//         id: "8",
//         name: "Bob Smith",
//         status: "Hey there!"
//     },
//     {
//         id: "9",
//         name: "Joe Jones",
//         status: "Hey there!"
//     }
// ];


export default function UserList() {

    // try {
    //     const docRef = addDoc(collection(db, "users"), {
    //         name: "Paul Smith",
    //         status: "online"
    //     });
    //     console.log("Document written with ID: ", docRef.id);
    // } catch (e) {
    //     console.error("Error adding document: ", e);
    // }

    async function query() {
        const [users, setUsers] = useState(null)

        const querySnapshot = await getDocs(collection(db, "users"));
        let results = []
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
            results.push({id: doc.id})
        });
        setUsers(results)
    }

    query();


    const itemSeparator = () => {
        return <View style={{height: 1, backgroundColor: "grey", marginHorizontal: 10}}/>;
    };

    const emptyList = () => {
        return (
            <View style={{alignItems: "center"}}>
                <Text style={styles.item}>No data found</Text>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={users}
                renderItem={({item}) => <Text style={styles.item}>{item.name}{"\n"}{item.status}</Text>}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={itemSeparator}
                ListEmptyComponent={emptyList}
                ListHeaderComponent={() => (
                    <Text style={{
                        fontSize: 30,
                        textAlign: "center",
                        marginTop: 20,
                        fontWeight: 'bold',
                        textDecorationLine: 'underline'
                    }}>
                        List of Users
                    </Text>
                )}
                ListFooterComponent={() => (
                    <Text style={{fontSize: 30, textAlign: "center", marginBottom: 20, fontWeight: 'bold'}}>
                        Thank you
                    </Text>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 5,
        fontSize: 30
    },
    item: {
        padding: 20,
        marginTop: 5,
        fontSize: 15
    }
})