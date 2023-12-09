import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    introView: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#53B175'
    },
    text: {
        fontWeight: 'bold',
        fontSize: 40,
        textAlign: 'center',
        color: 'white',
        fontFamily: 'Gilroy-ExtraBold',
    },
    desc: {
        fontFamily: 'Gilroy-Light',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 18,
        letterSpacing: 5.5,
        textAlign: 'center',
        color: 'white'
    }
});
export default styles;