import {StyleSheet, Text, View} from "react-native";

const CalendarScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Calendar</Text>
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

export default CalendarScreen;