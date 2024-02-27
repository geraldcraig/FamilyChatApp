import React from "react";
import {SafeAreaView,FlatList,StyleSheet, Text, View} from "react-native";


const users = [
    {
        id: "1",
        name: "John Doe",
        status: "Available"
    },
    {
        id: "2",
        name: "Jane Smith",
        status: "Busy"
    },
    {
        id: "3",
        name: "Bob Johnson",
        status: "Offline"
    },
    {
        id: "4",
        name: "Alice Williams",
        status: "Hey there"
    },
    {
        id: "5",
        name: "Robert Smith",
        status: "Hey there!"
    },
    {
        id: "6",
        name: "David Jones",
        status: "Hey there!"
    },
    {
        id: "7",
        name: "John Wilson",
        status: "Hey there!"
    },
    {
        id: "8",
        name: "Bob Smith",
        status: "Hey there!"
    },
    {
        id: "9",
        name: "Joe Jones",
        status: "Hey there!"
    }
];



export default function ChatList() {

    const itemSeparator = () => {
        return <View style={{height: 1, backgroundColor: "grey", marginHorizontal: 10}} />;
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
                    <Text style={{fontSize: 30, textAlign: "center", marginTop: 20, fontWeight: 'bold', textDecorationLine: 'underline'}}>
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