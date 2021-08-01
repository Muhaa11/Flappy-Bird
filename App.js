import { setStatusBarBackgroundColor } from 'expo-status-bar'
import React, {useEffect, useState} from 'react'
import { Button, Dimensions,ImageBackground, StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import Bird from './components/Bird'
import Obstacles from './components/Obstacles'
import { GameEngine } from "react-native-game-engine"


export default function App() {


  const screenWidth = Dimensions.get("screen").width
  const screenHeight = Dimensions.get("screen").height
  const birdLeft = screenWidth / 2
  const [birdBottom, setBirdBottom] = useState(screenHeight/2) 
  const [obstaclesLeft, setObstaclesLeft] = useState(screenWidth)
  const [obstaclesLeftTwo, setObstaclesLeftTwo] = useState(screenWidth + screenWidth/2 + 30)
  const [obstaclesNegHeight, setObstaclesNegHeight] = useState(0)
  const [obstaclesNegHeightTwo, setObstaclesNegHeightTwo] = useState(0)
  const [score, setScore] = useState(1)
  const obstacleWidth = 60
  const obstacleHeight = 500
  const gap = 165
  const gravity = 5
  let gameTimerId
  let obsticlesLeftTimerId
  let obsticlesLeftTimerIdTwo
const [isGameOver, setIsGameOver] = useState(false)






  //start bird falling
  useEffect(() => {
    if (birdBottom > 0 ) {
      gameTimerId = setInterval(() => {
        setBirdBottom(birdBottom => birdBottom - gravity)
      }, 30)

      return () => {
        clearInterval(gameTimerId)
      }
    }

  }, [birdBottom])
  console.log(birdBottom)

  const jump = () => {
    if(!isGameOver && (birdBottom < screenHeight)) {
      setBirdBottom(birdBottom => birdBottom + 50)
      console.log('jumped')
    }

  }

  
  
  //start first obstacles
  
  useEffect(() => {
if (obstaclesLeft > -obstacleWidth) {
  obsticlesLeftTimerId = setInterval(() => {
    setObstaclesLeft(obstaclesLeft => obstaclesLeft - 3.5)

  },25)

  return () => {
    clearInterval(obsticlesLeftTimerId)
  } 

  }else {
    setObstaclesLeft(screenWidth)
    setObstaclesNegHeight( - Math.random() * 150)
    setScore(score => score + 1)
}
  }, [obstaclesLeft])



  //start second obstacles
  
  useEffect(() => {
    if (obstaclesLeftTwo > -obstacleWidth) {
      obsticlesLeftTimerIdTwo = setInterval(() => {
        setObstaclesLeftTwo(obstaclesLeftTwo => obstaclesLeftTwo - 3.5)
    
      },25)
    
      return () => {
        clearInterval(obsticlesLeftTimerIdTwo)
      } 
    
      }else {
        setObstaclesLeftTwo(screenWidth)
        setObstaclesNegHeightTwo( - Math.random() * 150)
        setScore(score => score + 1)
    }
      }, [obstaclesLeftTwo])
    
    
  
    //check for collisions
    useEffect(() => {
      console.log(obstaclesLeft)
      console.log(screenWidth/2)
      console.log(obstaclesLeft > screenWidth/2)
      if (
        ((birdBottom < (obstaclesNegHeight + obstacleHeight + 30) ||
        birdBottom > (obstaclesNegHeight + obstacleHeight + gap -30)) &&
        (obstaclesLeft > screenWidth/2 -30 && obstaclesLeft < screenWidth/2 + 30 )
        )
        || 
        ((birdBottom < (obstaclesNegHeightTwo + obstacleHeight + 30) ||
        birdBottom > (obstaclesNegHeightTwo + obstacleHeight + gap -30)) &&
        (obstaclesLeftTwo > screenWidth/2 -30 && obstaclesLeftTwo < screenWidth/2 + 30 )
        )
        ) 
        {
        console.log('game over')
        gameOver()
      }
    })


      const gameOver = () => {
        clearInterval(gameTimerId)
        clearInterval(obsticlesLeftTimerId)
        clearInterval(obsticlesLeftTimerIdTwo)
        setIsGameOver(true)
        
      }


      const resetGame = () => { 

        setIsGameOver(false)
       }



  return (
    <TouchableWithoutFeedback onPress={jump}>
    <View style={styles.container}>

    <ImageBackground source={require('./city.jpg')} resizeMode="cover" style={{width:screenWidth, flex: 1,justifyContent: "center",}}/>

    <Text  style={{fontSize: 40, color:'#1eafc9', position: 'absolute', left:20, top:20}}>Score: {score}</Text>

      
      <Bird
        birdBottom={birdBottom}
        birdLeft={birdLeft}
       />
          <Obstacles
          color={'green'}
          obstacleWidth={obstacleWidth}
          obstacleHeight={obstacleHeight}
          randomBottom={obstaclesNegHeight}
          gap={gap}
          obstaclesLeft={obstaclesLeft}
          />

          <Obstacles
          color={'yellow'}
            obstacleWidth={obstacleWidth}
            obstacleHeight={obstacleHeight}
            randomBottom={obstaclesNegHeightTwo}
            gap={gap}
            obstaclesLeft={obstaclesLeftTwo}
          />

{isGameOver && <Text  style={{fontSize: 45, color:'#000', position: 'absolute',}}>Game Over: {score}</Text>}                 
    </View>

    </TouchableWithoutFeedback>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
