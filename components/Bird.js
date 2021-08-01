import React from 'react';
import { View, Image } from 'react-native';

const Bird = ({birdBottom, birdLeft}) => {
    const birdWidth = 50
    const birdHeight = 60
        

    return (
        <View style={{
            position: 'absolute',
            width: birdWidth,
            height: birdHeight,
            left: birdLeft - (birdWidth/2),
            bottom: birdBottom - (birdHeight/2),
        }}> 
            <Image style={{  width: birdWidth, height: birdHeight,}} source={require('./bird.png')} />

        </View>
    )
}

export default Bird