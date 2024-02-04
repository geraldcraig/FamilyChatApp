import {StyleSheet, Text, View} from "react-native";
import { Calendar } from 'react-native-calendars';

const CalendarScreen = () => {
    return (
        <View style={styles.container}>
            <Calendar />
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
