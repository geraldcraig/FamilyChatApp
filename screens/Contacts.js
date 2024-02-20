import {FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import users from '../assets/data/users.json';
import ContactsScreen from '../screens/ContactsScreen';

const ContactList = ({item}) => {
    const users = [
        {
            id: '1',
            firstName: 'John',
            lastName: 'Doe',
            status: 'Hey there!',
            image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/8.png"
        },
        {
            id: '2',
            firstName: 'Jane',
            lastName: 'Smith',
            status: 'Hey there!',
            image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/8.png"
        },
        {
            id: '3',
            firstName: 'Bob',
            lastName: 'Johnson',
            status: 'Hey there!',
            image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/8.png"
        },
        {
            id: '4',
            firstName: 'Alice',
            lastName: 'Williams',
            status: 'Hey there!',
            image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/8.png"
        },
        {
            id: '5',
            firstName: 'Charlie',
            lastName: 'Brown',
            status: 'Hey there!',
            image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/8.png"
        },
    ];

    return (
        <Pressable style={styles.container}>
            <Image source={{uri: item.image}} style={styles.image}/>
            <View style={styles.content}>
                <Text style={styles.name} numberOfLines={1}>
                    {`${item.firstName} ${item.lastName}`}
                </Text>

                <Text style={styles.name} numberOfLines={2}>
                    {`${item.status}`}</Text>
            </View>
        </Pressable>
    );
};

const Contacts = () => {
    return (
        <FlatList
            data={users}
            renderItem={({item}) => ContactList(`${item.id}`)}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: 10,
        marginVertical: 5,
        height: 70,
        alignItems: 'center',
    },
    name: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 10,
    },
    subTitle: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    }
});

export default Contacts;