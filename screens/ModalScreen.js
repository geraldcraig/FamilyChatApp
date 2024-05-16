import { useState } from "react";
import {Alert, Button, StyleSheet, TextInput, View} from "react-native";
import {addDoc, collection, doc, setDoc} from "firebase/firestore";
import { auth, db } from '../firebaseConfig';

const ModalScreen = ({ route, navigation }) => {
    const [eventDate, setEventDate] = useState('')
    const [event, setEvent] = useState('')
    const { newDate } = route.params;

    const uid = auth.currentUser.uid;



    const addEvent = async () => {
        await addDoc(collection(db, 'events'), {
            userId: uid,
            // message: input,
            // timestamp: new Date(),
            // displayDate: new Date().toLocaleDateString()
            eventDate: newDate,
            event: event
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
                defaultValue={newDate}
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

export default ModalScreen;
