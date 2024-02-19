import {Button, Image, StyleSheet, Text, TextInput, View} from "react-native";
import {useState} from "react";
import axios from 'axios';

import userImage from '../assets/images/userImage.jpeg';


const SettingsScreen = ({ navigation }) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [about, setAbout] = useState('');

    const API_KEY = 'AIzaSyBXVOvznXFgKlr4csQ1HzthpvsG7HbEphM';

    const signOut = async () => {
        try {
          // await axios.post(
          //   'https://identitytoolkit.googleapis.com/v1/accounts:signOut?key=' + API_KEY
          // );
          // Handle success, navigate to sign-in screen
          console.log("Logged out")
          navigation.replace('Sign In');
        } catch (error) {
          console.error(error);
        }
      };

    return (
        <View style={styles.container}>
            <View>
                <Image
                    style={styles.image}
                    source={userImage}
                />
            </View>
            <TextInput
                style={styles.input}
                placeholder="First Name"
                onChangeText={newText => setFirstName(newText)}
                defaultValue={firstName}
            />
            <TextInput
                style={styles.input}
                placeholder="Last Name"
                onChangeText={newText => setLastName(newText)}
                defaultValue={lastName}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                autoCapitalize="none"
                onChangeText={newText => setEmail(newText)}
                defaultValue={email}
            />
            <TextInput
                style={styles.input}
                placeholder="About"
                autoCapitalize="none"
                onChangeText={newText => setAbout(newText)}
                defaultValue={about}
            />
            <Button title="Save" onPress={() => {
                console.log("firstname : ", firstName);
                console.log("lastname : ", lastName);
                console.log("email: ", email);
                console.log("about: ", about)} }/>
            <Button title="Sign Out" onPress={signOut} />
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
    },
    image: {
        borderRadius: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        height: 80,
        width: 80,
        marginBottom: 12
    }
});

export default SettingsScreen;