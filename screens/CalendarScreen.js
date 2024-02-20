import {StyleSheet, View} from "react-native";
import { Calendar } from 'react-native-calendars';

const CalendarScreen = () => {
    return (
        <View style={styles.container}>
            <Calendar
                onDayPress={(day) => console.log('onDayPress', day) }
                onDayLongPress={(day) => console.log('onDayLongPress', day) }
                onMonthChange={(date) => console.log('onMonthChange', date) }
                onPressArrowLeft={(goToPreviousMonth) => {
                    console.log('onPressArrowLeft'); goToPreviousMonth();
                }}
                onPressArrowRight={(goToNextMonth) => {
                    console.log('onPressArrowRight'); goToNextMonth();
                }}
            />
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