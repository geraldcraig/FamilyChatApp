import {Button, StyleSheet, TextInput, View} from "react-native";
import {useState} from "react";

const SignUpScreen = ({navigation}) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.container}>
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
                placeholder="Password"
                secureTextEntry
                autoCapitalize="none"
                onChangeText={newText => setPassword(newText)}
                defaultValue={password}
            />
            <Button title="Submit" onPress={() => {
                console.log("firstname : ", firstName);
                console.log("lastname : ", lastName);
                console.log("email: ", email);
                console.log("password: ", password)} }/>
            <Button title="Go to Sign In" onPress={() => navigation.navigate('Sign In')}/>
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
