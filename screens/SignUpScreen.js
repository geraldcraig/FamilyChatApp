import { useState } from "react";
import {Alert, Button, StyleSheet, TextInput, View} from "react-native";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from '../firebaseConfig';

const SignUpScreen = ({ navigation }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // const handleSignUp = () => {
    //     createUserWithEmailAndPassword(auth, email, password)
    //         .then(async (userCredential) => {
    //             const user = userCredential.user;
    //             const { uid } = userCredential.user;
    //             const userData = await createUser(firstName, lastName, email, uid);
    //             console.log('Signed up successfully:', user);
    //             navigation.replace('Home');
    //         })
    //         .catch((error) => {
    //             const errorMessage = error.message;
    //             console.log('Sign up error:', errorMessage)
    //         });
    // };

    const handleSignUp = async () => {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            const { uid } = result.user;

            const userData = await createUser(userName, email, uid);

            updateProfile(auth.currentUser, {
                displayName: userName, photoURL: "https://example.com/user/profile.jpg"
            }).then(() => {
                console.log('profile updated')
            }).catch((error) => {
                console.log('error occurred', error)
            });

            console.log('Signed up successfully:', result);
            console.log("UserData: ", userData);
            navigation.replace('Home');
        } catch (error) {
            const errorMessage = error.message;
            Alert.alert('Error', errorMessage, [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]);
            console.log('Sign up error:', errorMessage)
        }
    }

    const createUser = async (userName, email, userId) => {
        const userData = {
            userName: userName,
            firstName: 'firstName',
            lastName: 'lastName',
            email: email,
            userId: userId,
            signUpDate: new Date(),
            status: 'Hey there!'
        };

        const userRef = doc(db, 'users', userId);

        await setDoc(userRef, userData);

        return userData;
    };

    return (
        <View style={styles.container}>
            {/* <TextInput
                style={styles.input}
                placeholder="First Name"
                onChangeText={(newText) => setFirstName(newText)}
                defaultValue={firstName}
            />
            <TextInput
                style={styles.input}
                placeholder="Last Name"
                onChangeText={(newText) => setFirstName(newText)}
                defaultValue={firstName}
            /> */}
            <TextInput
                style={styles.input}
                placeholder="User Name"
                onChangeText={(newText) => setUserName(newText)}
                defaultValue={userName}
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
            <Button title="Submit" onPress={handleSignUp} />
            <Button title="Go to Sign In" onPress={() => navigation.replace('Sign In')} />
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

export default SignUpScreen;