import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    Dimensions,
    Animated,
    Image,
    Easing,
    ActivityIndicator
} from 'react-native';
import styles from './styles';
const Splash = ({ navigation }) => {
    const [formOpacity, setFormOpacity] = useState(new Animated.Value(0));
    const startAnimation = () => {
        Animated.sequence([
            Animated.timing(formOpacity, {
                delay: 300,
                useNativeDriver: true,
                easing: Easing.circle,
                toValue: 1,
                duration: 400,
            }),
        ]).start();
    };
    useEffect(() => {
        setTimeout(() => {
            startAnimation();
        }, 1000);
        setTimeout(() => {
            navigation.navigate('introscreen');
        }, 4000);
    }, []);

    return (
        <View style={styles.introView}>
            <Animated.View
                style={{
                    opacity: formOpacity,
                    flexDirection: 'row'
                }}>
                <Image style={{
                    width: 54.701,
                    height: 63.61,
                    marginRight: 15
                }} source={require('../../../assets/carrot.png')} />
                <View>
                    <Text style={styles.text}>SmartBasket{'\n'} APP</Text>
                    <Text style={styles.desc}>online groceriet</Text>
                </View>
            </Animated.View>
        </View >
    );
};

export default Splash;