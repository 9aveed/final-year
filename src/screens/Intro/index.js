import React from 'react';
import {
    Text,
    View,
    Image,
    ImageBackground,
} from 'react-native';
import styles from './styles';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
const IntroScreen = () => {
    const navigation = useNavigation()
    return (
        <ImageBackground source={require('../../../assets/bgImage.png')}   style={styles.introView}>
            <View
                style={{
                    gap: 15,
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 90
                }}>
                <Image style={{
                    width: 54.701,
                    height: 63.61,
                }} source={require('../../../assets/carrot.png')} />
                <View>
                    <Text style={styles.text}>Welcome {'\n'} to SmartBasket app</Text>
                    <Text style={styles.desc}>Ger your groceries in as fast as one hour</Text>
                </View>
                <Button onPress={() => { navigation.navigate('buyerlogin') }} title="Buyer" />
                <Button onPress={() => { navigation.navigate('sellerlogin') }} title="Seller" />
            </View>
        </ImageBackground >
    );
};

export default IntroScreen;