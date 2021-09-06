import { StatusBar } from 'expo-status-bar';
import React, { Component, Context, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  withSpring,
  withRepeat,
  useAnimatedGestureHandler,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import LearningSession1 from './src/LearningAnimation1';
import SquareBounceRadius from './src/squareBounceRadius';
import { Page } from './components/Page';

const words= ['It\'s', 'Brandon\'s', 'Animation!!!', '🥳']


export default function App() {

  const translateX = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateX.value = event.contentOffset.x

    //* access the amount of scroll -> 
    console.log(translateX.value)
  })

  return (
      <Animated.ScrollView 
        pagingEnabled
        scrollEventThrottle={16} //! 16 allows for a 60fps animation
        horizontal={true} 
        onScroll={scrollHandler}
        style={styles.container}>
        {words.map((title, index) => {
          return <Page 
                  key={index.toString()} 
                  title={title}
                  translateX={translateX} 
                  index={index}/>
        })}

      </Animated.ScrollView>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
