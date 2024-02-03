import {StyleSheet, Text, View} from "react-native";

const ContactsScreen = ({ user }) => {
    return (
        <View style={styles.container}>
            <Text numberOfLines={1}>
                {user.name}
            </Text>

            <Text numberOfLines={2}>
                {user.status}
            </Text>
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

export default ContactsScreen;