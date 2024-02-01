import {Button, StyleSheet, TextInput, View} from "react-native";
import {useState} from "react";

const SignInScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Email"
                autoCapitalize="none"
                onChangeText={newText => setEmail(newText)}
                defaultValue={email}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                autoCapitalize="none"
                onChangeText={newText => setPassword(newText)}
                defaultValue={password}
            />
            <Button title="Submit" onPress={() => {
                console.log("email: ", email);
                console.log("password: ", password)} }/>
            <Button title="Go to Sign Up" onPress={() => navigation.navigate('Sign Up')}/>
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