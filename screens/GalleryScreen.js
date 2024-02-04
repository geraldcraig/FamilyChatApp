import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image } from 'react-native';

const PlaceholderImage = require('../assets/images/tom.jpg');

export default function GalleryScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={PlaceholderImage} style={styles.image} />
                <Image source={PlaceholderImage} style={styles.image} />
                <Image source={PlaceholderImage} style={styles.image} />
                <Image source={PlaceholderImage} style={styles.image} />
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        alignItems: 'center',
    },
    imageContainer: {
        flex: 1,
        paddingTop: 20,
    },
    image: {
        width: 160,
        height: 220,
        borderRadius: 18,
        paddingVertical: 10
    },
});
