import { getFirebaseApp } from '../firebaseHelper';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { child, getDatabase, ref, set } from 'firebase/database';

import {useState} from "react";
import {Button, StyleSheet, TextInput, View} from "react-native";

const SignUpTest = ({navigation}) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signUp = async (firstName, lastName, email, password) => {
        const app = getFirebaseApp();
        const auth = getAuth(app);
    
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            const { uid } = result.user;
    
            const userData = await createUser(firstName, lastName, email, uid);
    
            console.log(userData);
        } catch (error) {
            console.log(error);
            const errorCode = error.code;
    
            let message = "Something went wrong.";
    
            if (errorCode === "auth/email-already-in-use") {
                message = "This email is already in use";
            }
    
            throw new Error(message);
        }
    }
    
    const createUser = async (firstName, lastName, email, userId) => {
        const firstLast = `${firstName} ${lastName}`.toLowerCase();
        const userData = {
            firstName,
            lastName,
            firstLast,
            email,
            userId,
            signUpDate: new Date().toISOString()
        };
    
        const dbRef = ref(getDatabase());
        const childRef = child(dbRef, `users/${userId}`);
        await set(childRef, userData);
        return userData;
    }

    // const API_KEY = 'AIzaSyBXVOvznXFgKlr4csQ1HzthpvsG7HbEphM';

    // const handleSignUp = async () => {
    //     try {
    //         const response = await axios.post(
    //             'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + API_KEY, {
    //                 firstName: firstName,
    //                 lastName: lastName,
    //                 email: email,
    //                 password: password,
    //                 returnSecureToken: true,
    //             });
    //         console.log(response.data); // Handle successful sign-up
    //         navigation.replace('Home');
    //     } catch (error) {
    //         console.error('Sign-up error:', error.response.data.error.message);
    //         // Handle sign-up error
    //     }
    // };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="First Name"
                onChangeText={(newText) => setFirstName(newText)}
                defaultValue={firstName}
            />
            <TextInput
                style={styles.input}
                placeholder="Last Name"
                onChangeText={(newText) => setLastName(newText)}
                defaultValue={lastName}
            />
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
            <Button title="Submit" onPress={signUp} />
            <Button title="Go to Sign In" onPress={() => navigation.replace('Sign In')}/>
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

export default SignUpTest;