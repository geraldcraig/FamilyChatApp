import { useState } from "react";
import {Alert, Button, StyleSheet, TextInput, View} from "react-native";
import {addDoc, collection, doc, setDoc} from "firebase/firestore";
import { auth, db } from '../firebaseConfig';

const CalendarModalScreen = ({ route, navigation }) => {
    const [eventDate, setEventDate] = useState('')
    const [event, setEvent] = useState('')
    const { newDate, stringDate } = route.params;

    const uid = auth.currentUser.uid;



    const addEvent = async () => {
        // const str = new Date(newDate.timestamp).toUTCString()
        // const date = str.substring(0, 16)
        await addDoc(collection(db, 'events'), {
            userId: uid,
            // message: input,
            // timestamp: new Date(),
            // displayDate: new Date().toLocaleDateString()
            eventDate: stringDate,
            event: event,
            timestamp: new Date(newDate)
        });
        setEventDate('');
        setEvent('');
        navigation.navigate('Calendar')
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Event Date"
                onChangeText={(newText) => setEventDate(newText)}
                defaultValue={stringDate}
            />
            <TextInput
                style={styles.input}
                placeholder="Event"
                autoCapitalize="none"
                onChangeText={(newText) => setEvent(newText)}
                defaultValue={event}
            />
            <Button title="Submit" onPress={addEvent}/>
            <Button onPress={() => navigation.goBack()} title="Cancel" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
    },
    input: {
        height: 60,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 10,
        borderRadius: 8,
        fontSize: 16,
    }
});

export default CalendarModalScreen;