import React from 'react';
import {SafeAreaView, View, FlatList, Image, StyleSheet, Dimensions} from 'react-native';
import image1 from '../assets/images/tom.jpg';
import image2 from '../assets/images/frankie.jpg';
import image3 from '../assets/images/pete.jpg';
import image4 from '../assets/images/kellen.jpg';
import image5 from '../assets/images/marek.jpg';
import image6 from '../assets/images/nikhil.jpg';

const GalleryScreen1 = () => {
    const images = [
        image1,
        image2,
        image3,
        image4,
        image5,
        image6
        // Add more image URLs as needed
    ];

    const numColumns = 2;
    const itemWidth = Dimensions.get('window').width / numColumns;

    const renderItem = ({item}) => (
        <View style={styles.itemContainer}>
            <Image source={{uri: item}} style={styles.image}/>
        </View>
    );

    return (
        <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <FlatList
                data={images}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                numColumns={numColumns}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        height: 150,
        borderRadius: 8,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
});

export default GalleryScreen1;
