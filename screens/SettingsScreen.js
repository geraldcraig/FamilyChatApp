import { useEffect, useState } from "react";
import { Button, Image, StyleSheet, TextInput, View } from "react-native";
import { signOut } from "firebase/auth";
import { auth, db } from '../firebaseConfig';
// import { onValue, ref } from "firebase/database";
import { useAuthContext } from "../hooks/useAuthContext";
import userImage from '../assets/images/userImage.jpeg';
import { doc, getDoc, getFirestore } from "firebase/firestore";

const SettingsScreen = ({ navigation }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [about, setAbout] = useState('');

    const { user } = useAuthContext();
    console.log('settings screen user:', user);

    useEffect(() => {
        getUserData();
    }, []);

    // function getUserData() {
    //     try {
    //         const { uid } = user;
    //         const userData = ref(db, `users/${uid}`);
    //         onValue(userData, (snapshot) => {
    //             const data = snapshot.val();
    //             console.log('data:', data);
    //             setFirstName(data.firstName);
    //             setLastName(data.lastName);
    //             setEmail(data.email);
    //             setAbout(data.about);
    //         });
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    async function getUserData() {
        try {
            const { uid } = user;
            const db = getFirestore();
            const userRef = doc(db, 'users', uid);

            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
                const data = userSnap.data();
                console.log('data:', data);
                setFirstName(data.firstName);
                setLastName(data.lastName);
                setEmail(data.email);
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
                console.log("about: ", about)
            }} />
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