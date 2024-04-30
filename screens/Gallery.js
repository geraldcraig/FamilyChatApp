import {Button, FlatList, Image, StatusBar, StyleSheet, Text, View} from "react-native";

export default function Gallery({ files }) {

    const Item = ({ name }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{name}</Text>
        </View>
    );

    return (
        <FlatList
            data={files}
            renderItem={({ item }) => <Item name={item.name} />}
            keyExtractor={(item) => item.name}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        padding: 8,
        marginVertical: 16,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 18,
    },
});