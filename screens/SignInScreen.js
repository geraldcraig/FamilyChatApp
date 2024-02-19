import {useState} from "react";
import {Button, StyleSheet, TextInput, View} from "react-native";
import axios from 'axios';

const SignInScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const API_KEY = 'AIzaSyBXVOvznXFgKlr4csQ1HzthpvsG7HbEphM';

    const handleSignIn = async () => {
        try {
            const response = await axios.post(
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + API_KEY,
                {
                    email: email,
                    password: password,
                    returnSecureToken: true,
                });
            console.log(response.data); // Handle successful sign-in
            navigation.replace('Home');
        } catch (error) {
            console.error('Sign-in error:', error.response.data.error.message);
            // Handle sign-in error
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Email"
                autoCapitalize="none"
                onChangeText={(newText) => setEmail(newText)}
                defaultValue={email}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                autoCapitalize="none"
                onChangeText={(newText) => setPassword(newText)}
                defaultValue={password}
            />
            <Button title="Submit" onPress={handleSignIn}/>
            <Button title="Go to Sign Up" onPress={() => navigation.replace('Sign Up')}/>
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

export default SignInScreen;