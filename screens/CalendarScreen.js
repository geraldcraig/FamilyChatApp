import {useEffect, useState} from "react";
import { FlatList, Pressable, StyleSheet, Text, View} from "react-native";
import { Calendar } from 'react-native-calendars';
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import CalendarModal from "./CalendarModal";


const CalendarScreen = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const ref = collection(db, 'events');

        const unsubscribe = onSnapshot(ref, (querySnapshot) => {
            let results = [];
            querySnapshot.docs.forEach((doc) => {
                results.push({id: doc.id, ...doc.data()})
            })
            setEvents(results);
        });
        return () => unsubscribe();
    }, []);

    const renderItem = ({item}) => (
        <Pressable onPress={() => console.log('event added')} style={styles.chatContainer}>
            <View style={styles.chatInfo}>
                <Text style={styles.userName}>{item.date}</Text>
                <Text style={styles.lastMessage}>{item.event}</Text>
            </View>
            {/*<Text style={styles.timestamp}>{item.timestamp.toDateString()}</Text>*/}
        </Pressable>
    );

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
            <View style={styles.container}>
                <FlatList
                    data={events}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                />
            </View>
            <View style={styles.container}>
                <CalendarModal />
            </View>
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