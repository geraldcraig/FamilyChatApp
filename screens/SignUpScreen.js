import { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { child, getDatabase, ref, set } from "firebase/database";
import { auth } from '../firebaseConfig';
import { useAuthContext } from "../hooks/useAuthContext";

const SignUpScreen = ({ navigation }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { dispatch } = useAuthContext();

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
            dispatch({ type: 'LOGIN', payload: result.user });

            const userData = await createUser(firstName, lastName, email, uid);

            console.log('Signed up successfully:', result);
            console.log("UserData: ", userData);
            navigation.replace('Home');
        } catch (error) {
            const errorMessage = error.message;
            console.log('Sign up error:', errorMessage)
        }
    }

    const createUser = async (firstName, lastName, email, userId) => {
        const userData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            userId: userId,
            signUpDate: new Date().toISOString(),
            status: 'Hey there!'
        };
        const dbRef = ref(getDatabase());
        const childRef = child(dbRef, `users/${userId}`);
        await set(childRef, userData);
        return userData;
    };

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