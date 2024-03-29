import {StyleSheet, Text, View} from "react-native";

const Template = () => {
    return (
        <View style={styles.container}>
            <Text>Chat Settings!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Template;