import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    introView: {
        justifyContent: 'flex-end',
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
        color: 'rgba(252, 252, 252, 0.70)',
        // fontFamily: 'Gilroy-Medium',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '400',
    }
});
export default styles;