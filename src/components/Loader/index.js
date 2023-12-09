import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

const Loader = ({ theme }) => (
    <View style={styles.container}>
        <ActivityIndicator size={50} color={"#53B175"} />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center"
    },

});

export default Loader;