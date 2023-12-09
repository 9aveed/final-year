import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const Button = ({ onPress, title }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
    text: {
        color: '#FFF9FF',
        textAlign: 'center',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: 18,
    },
    button: {
        borderRadius: 19,
        backgroundColor: "#53B175",
        paddingVertical: 15,
        paddingHorizontal: 127,
        elevation: 3
    }
})