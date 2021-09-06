import { StatusBar } from 'expo-status-bar';
import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  withSpring,
  withRepeat,
} from 'react-native-reanimated';

//* Taken from the below video series
// https://www.youtube.com/watch?v=yz9E10Dq8Bg&list=PLjHsmVtnAr9TWoMAh-3QMiP7bPUqPFuFZ

const SIZE = 100

const LearningSession1 = () => {

  //* use shared value - create a value that can be handled from the ui thread
  const progress = useSharedValue(1)
  const scale = useSharedValue(2)

  const handleRotation = (progress : Animated.SharedValue<number>) => {
    'worklet';
    return `${progress.value * 2 * Math.PI}rad`
  }

  //* use animated style - similar to the stylesheet styles
  // https://docs.swmansion.com/react-native-reanimated/docs/api/useAnimatedStyle/
  // second argument is an empty array
  //
  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      borderRadius: (progress.value * SIZE) / 2,
      transform: [{ scale: scale.value }, {rotate: handleRotation(progress)}]

    }
  }, []) 

  useEffect(() => {

    //* withTiming to value + clock??
    progress.value = withRepeat(withSpring(0.5), 5, true)
    scale.value = withRepeat(withSpring(1), 3, true)

  }, [])

  return (
    <View style={styles.container}>
      <Animated.View style={[
        {height: SIZE, width: SIZE, backgroundColor: 'blue'}, 
        reanimatedStyle 
      ]}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',

  },
});

export default LearningSession1;