import { Button, StyleSheet, TextInput } from "react-native";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebaseConfig";

const CalendarEvent = ({ route, navigation }) => {
    const [eventDate, setEventDate] = useState('')
    const [event, setEvent] = useState('')
    const { newDate } = route.params;

    const handleAddEvent = () => {
        setEventDate(newDate)
        console.log('new event')
    }

    const addEvent = async () => {
        await addDoc(collection(db, 'events'), {
            eventDate: newDate,
            event: event
        });
        setEventDate('');
        setEvent('');
        navigation.navigate('Calendar')
    };

    return (
        <>
            <TextInput
                style={styles.input}
                placeholder="Email"
                autoCapitalize="none"
                onChangeText={(newText) => setEventDate(newText)}
                defaultValue={newDate}
            />
            <TextInput
                style={styles.input}
                placeholder="Event"
                autoCapitalize="none"
                onChangeText={(newText) => setEvent(newText)}
                defaultValue={event}
            />
            <Button title="Submit" onPress={addEvent} />
            <Button title="Go to Sign In" onPress={() => navigation.navigate('Calendar')} />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default CalendarEvent;