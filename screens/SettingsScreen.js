import {useState} from "react";
import {Button, Image, Pressable, StyleSheet, TextInput, View} from "react-native";
import {signOut} from "firebase/auth";
import {auth} from '../firebaseConfig';
import userImage from '../assets/images/userImage.jpeg';
import {launchImagePicker} from "../helpers/imagePickerHelper";

const SettingsScreen = ({navigation}) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [about, setAbout] = useState('');
    const [image, setImage] = useState('');

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                console.log('user signed out')
                navigation.replace('Sign In');
            }).catch((error) => {
            const errorMessage = error.message;
            console.log('Sign out error:', errorMessage)
            console.log('error:', error.message);
        });
    };

    const pickImage = async () => {
        try {
            const tempUri = await launchImagePicker();

            if (!tempUri) {
                return;
            }
            console.log('tempUri:', tempUri);
        } catch (error) {
            console.error('Error picking image: ', error);
        }


    }

    return (
        <View style={styles.container}>
            <Pressable onPress={pickImage}>
                <Image
                    style={styles.image}
                    source={userImage}
                />
            </Pressable>
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
            <Button title="Save" onPress={() => console.log('update pressed')}/>
            <Button title="Sign Out" onPress={handleSignOut}/>
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