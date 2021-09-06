import React from 'react'
import { Dimensions, View, StyleSheet, Text } from 'react-native'
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'

const { height, width } = Dimensions.get('window')
const SIZE = width * 0.7

interface PageProps {
    title: string,
    index: number,
    translateX: Animated.SharedValue<number>
}

const Page: React.FC<PageProps> = ({ index, title, translateX }) => {
    const inputRange = [ (index - 1) * width, index * width, (index + 1) * width ];



    const rTextStyle = useAnimatedStyle(() => {

        const translateY = interpolate(translateX.value, 
            inputRange, 
            [ height / 2 ,1, -height / 2 ],
            Extrapolate.CLAMP)

        const opacity = interpolate(translateX.value, 
            inputRange,
            [-4,1,-4],
            Extrapolate.CLAMP)

        return {
            opacity,
            transform: [{
                translateY
            }]
        }
    })



    //* bring in the animated style 
    const rStyle = useAnimatedStyle(() => {

        //* interpolate value - input range, output range
        const scale = interpolate(
            translateX.value, inputRange, 
            [0,1,0], 
            Extrapolate.CLAMP)

        const borderRadius = interpolate(
            translateX.value, inputRange,
            [0, SIZE / 2, 0],
            Extrapolate.CLAMP)


        return {
            borderRadius,
            transform: [ { scale } ]
        }
    })

    return (<View style={ [ styles.pageContainer, {backgroundColor: `rgba(0,0,256, 0.${index + 2})`} ] }>
        <Animated.View style={[ styles.square, rStyle ]}>

        </Animated.View>
        <Animated.View style={[{position: 'absolute'}, rTextStyle]}>
            <Text style={styles.text}>{title}</Text>
        </Animated.View>


    </View>)
}


const styles = StyleSheet.create({
    pageContainer: {
        height: height,
        width: width,
        alignItems: 'center',
        justifyContent: 'center'
    },
    square: {
        height: SIZE,
        width: SIZE,
        backgroundColor: 'rgba(0,0,256, .4)',
    },
    text: {
        fontSize: 50,
        color: 'white',
        fontWeight: '700'
    }
})

export { Page }