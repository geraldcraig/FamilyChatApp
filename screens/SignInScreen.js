import { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebaseConfig';
import { useAuthContext } from "../components/useAuthContext";

const SignInScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { dispatch } = useAuthContext();

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                dispatch({ type: 'LOGIN', payload: userCredential.user });
                console.log('Signed in successfully:', user.email);
                navigation.replace('Home');
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log('Sign in error:', errorMessage)
            });
    };

    // const handleSignIn = async () => {
    //     try {
    //         const result = await signInWithEmailAndPassword(auth, email, password);
    //         console.log('Signed in successfully:', result.user.uid);
    //         navigation.replace('Home');
    //         console.log(result);
    //     } catch (error) {
    //         const errorMessage = error.message;
    //         console.log('Sign in error:', errorMessage)
    //     }
    // }

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
            <Button title="Submit" onPress={handleSignIn} />
            <Button title="Go to Sign Up" onPress={() => navigation.replace('Sign Up')} />
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