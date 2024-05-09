import { useEffect, useState } from "react";
import { Button, Image, StyleSheet, TextInput, View } from "react-native";
import { signOut } from "firebase/auth";
import { auth, db } from '../firebaseConfig';
import {addDoc, collection, doc, getDoc, updateDoc} from "firebase/firestore";
import userImage from '../assets/images/userImage.jpeg';

const SettingsScreen = ({ navigation }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('');
    const [about, setAbout] = useState('');

    const uid = auth.currentUser.uid;
    console.log('current user:', uid)
    const name = auth.currentUser.displayName;
    console.log('current user name:', name);

    useEffect(() => {
        getUserData().then(r => console.log('r:', r));
    }, []);

    async function getUserData() {
        try {
            const userRef = doc(db, `users/${uid}`);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
                const data = userSnap.data();
                setUserName(data.userName);
                setEmail(data.email);
                setStatus(data.status);
                setAbout(data.about);
            } else {
                console.log('No such document!');
            }
        } catch (error) {
            console.error(error);
        }
    }

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

    const updateProfile = async () => {
        const userRef = doc(db, 'users', uid)
        await updateDoc(userRef, {
            userName: userName,
            status: status,
            about: about
        });
    };

    return (
        <View style={styles.container}>
            <View>
                <Image
                    style={styles.image}
                    source={userImage}
                />
            </View>
            {/* <TextInput
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
            /> */}
            <TextInput
                style={styles.input}
                placeholder="User Name"
                onChangeText={newText => setUserName(newText)}
                defaultValue={userName}
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
                placeholder="Status"
                onChangeText={newText => setStatus(newText)}
                defaultValue={status}
            />
            <TextInput
                style={styles.input}
                placeholder="About"
                autoCapitalize="none"
                onChangeText={newText => setAbout(newText)}
                defaultValue={about}
            />
            <Button title="Save" onPress={() => console.log('update pressed')} />
            <Button title="Sign Out" onPress={handleSignOut} />
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