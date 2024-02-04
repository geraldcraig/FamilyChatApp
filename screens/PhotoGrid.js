import React from 'react'
import { Dimensions, FlatList, Image } from 'react-native'

import image1 from '../assets/images/tom.jpg';
import image2 from '../assets/images/frankie.jpg';
import image3 from '../assets/images/pete.jpg';
import image4 from '../assets/images/kellen.jpg';
import image5 from '../assets/images/marek.jpg';
import image6 from '../assets/images/nikhil.jpg';


export default function PhotoGrid({ photos, numColumns, onEndReached }) {
    const images = [
        image1,
        image2,
        image3,
        image4,
        image5,
        image6
    ];
    const { width } = Dimensions.get('window')

    const size = width / numColumns

    return (
        <FlatList
            data={photos}
            keyExtractor={(item) => item.id}
            numColumns={numColumns}
            onEndReached={onEndReached}
            renderItem={({ item }) => (
                <Image
                    source={{
                        width: size,
                        height: size,
                        source: {image1}
                    }}
                />
            )}
        />
    )
}
