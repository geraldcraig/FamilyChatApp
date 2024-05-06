import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, TextInput, Pressable, View } from 'react-native';
import {auth, db} from "../firebaseConfig";
import {addDoc, collection, doc, setDoc} from "firebase/firestore";

const CalendarModal = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [event, setEvent] = useState('');
    const [date, setDate] = useState('');
    const [input, setInput] = useState('');

    const uid = auth.currentUser.uid;
    console.log('current user:', uid)
    const name = auth.currentUser.displayName;
    console.log('current user:', name);
    //
    // const handleCreateEvent = async () => {
    //     try {
    //         const userData = await createEvent(event, date, uid);
    //         setModalVisible(!modalVisible)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    //
    // const createEvent = async (event, date, uid) => {
    //     const userData = {
    //         uid: uid,
    //         event: event,
    //         date: date
    //     };
    //     const userRef = doc(db, 'events', uid);
    //
    //     await setDoc(userRef,userData);
    //
    //     console.log(userData)
    // };

    const postMessage = async () => {
        const newEventRef = doc(collection(db, "events"));
        const data = {
            uid: uid,
            event: event,
            date: date
        };

        await setDoc(newEventRef, data);
        console.log("Message posted: " + input);
        setEvent('');
        setDate('');
        setModalVisible(!modalVisible)
    };

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Add Event Date</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Date"
                            onChangeText={(newText) => setDate(newText)}
                            defaultValue={date}
                        />
                        <Text style={styles.modalText}>Add Event Details</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Event"
                            onChangeText={(newText) => setEvent(newText)}
                            defaultValue={event}
                        />
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={postMessage}>
                            {/*onPress={() => setModalVisible(!modalVisible)}>*/}
                            <Text style={styles.textStyle}>Submit</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(true)}>
                <Text style={styles.textStyle}>Add Event</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
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

export default CalendarModal;