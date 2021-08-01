import React from 'react'
import { StyleSheet, Text, Image, View } from 'react-native'

const Obstacles = ({
    color, 
    obstaclesLeft, 
    obstacleWidth, 
    obstacleHeight, 
    gap,
    randomBottom,
}) => {


return (
    <>
    <View style={{
        position: 'absolute',
        backgroundColor: color,
        width: obstacleWidth,
        height: obstacleHeight,
        left: obstaclesLeft,
        bottom: randomBottom + obstacleHeight + gap,
    }} > 
    <Image style={{  width: obstacleWidth, height: obstacleHeight,}} source={require('./blocks.jpg')} />
    
    </View>

    <View style={{
        position: 'absolute',
        backgroundColor: color,
        width: obstacleWidth,
        height: obstacleHeight,
        left: obstaclesLeft,
        bottom: randomBottom,
    }} >

    <Image style={{  width: obstacleWidth, height: obstacleHeight,}} source={require('./blocks.jpg')} />    

    </View>

    </>
)
}

export default Obstacles