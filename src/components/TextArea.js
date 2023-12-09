
import React, { FC } from 'react';
import { TextInputProps, StyleSheet, View, ScrollView, TextInput, StyleProp, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const TextArea = ({
    icon,
    label,
    containerStyle,
    handleChange,
    backgroundColor,
    secureTextEntry,
    disabled,
    height = 114,
    autoFocus,
    ...restProps
}) => {
    return (
        <View style={[styles.container, containerStyle, { backgroundColor: backgroundColor ? backgroundColor : '#FFFFFF', height }]}>
            {icon && <Ionicons name={icon} style={styles.icon} />}
            <ScrollView
                contentContainerStyle={styles.textAreaContainer}
                keyboardShouldPersistTaps="handled"
            >
                <TextInput
                    style={styles.input}
                    onChangeText={handleChange}
                    placeholder={label}
                    multiline={true}
                    textAlignVertical="top"
                    autoFocus={autoFocus ? false : false}
                    {...restProps}
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
        paddingVertical: 8,
    },
    icon: {
        marginRight: 8,
        fontSize: 20,
        color: '#9D9AB2',
    },
    label: {
        fontSize: 13,
        fontWeight: '700',
        color: '#9D9AB2',
    },
    textAreaContainer: {
        flexGrow: 1,
    },
    input: {
        fontSize: 13,
        flex: 1,
        paddingLeft: 20
    },
});

export default TextArea;
