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
} from 'react-native-reanimated';

//* Taken from the below video series
// https://www.youtube.com/watch?v=yz9E10Dq8Bg&list=PLjHsmVtnAr9TWoMAh-3QMiP7bPUqPFuFZ

//? PanGestures
//https://www.youtube.com/watch?v=4HUreYYoE6U&list=PLjHsmVtnAr9TWoMAh-3QMiP7bPUqPFuFZ&index=2

const SIZE = 100.0
const CIRCLE_RADIUS = SIZE * 2

type ContextType = {
  translateX : number,
  translateY : number
}

const SquareBounceRadius = () => {

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const panGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, ContextType >({
    onStart: (event, context) => {
      context.translateX = translateX.value
      context.translateY = translateY.value
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX
      translateY.value = event.translationY + context.translateY
    },
    onEnd: () => {
      const distance = Math.sqrt( translateY.value ** 2 + translateX.value ** 2)

      if ( distance < CIRCLE_RADIUS + SIZE / 2) {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    }
  })

  //* we need to create a animated style and transform our X with translate x value
  const rStyle = useAnimatedStyle(() => {

    return {
      transform: [
        {
          translateX: translateX.value
        },
        {
          translateY: translateY.value
        }
      ]
    }
  })

return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={panGestureEvent} >
        <Animated.View style={styles.circle}>
          <Animated.View 
            style={ [styles.square, rStyle ]}
          />
        </Animated.View>
      </PanGestureHandler>
    </View>

)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  square: {
    width: SIZE,
    height: SIZE,
    backgroundColor: 'rgba(0,0,256, 0.5)',
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
	    width: 0,
	    height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

elevation: 5,
  },
  circle: {
    borderWidth: 5,
    borderColor: 'rgba(0,0,256, 0.5)',
    height: CIRCLE_RADIUS * 2,
    width: CIRCLE_RADIUS * 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: CIRCLE_RADIUS

  }
});


export default SquareBounceRadius;