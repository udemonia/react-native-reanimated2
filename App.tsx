import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated';

// https://www.youtube.com/watch?v=yz9E10Dq8Bg&list=PLjHsmVtnAr9TWoMAh-3QMiP7bPUqPFuFZ

export default function App() {

  const progress = useSharedValue(0)

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value

    }
  }, [])


  return (
    <View style={styles.container}>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});
