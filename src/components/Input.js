// import React from 'react';
// import { TextInput, View, StyleSheet } from 'react-native';

// const Input = ({ value, onChangeText, placeholder, secureTextEntry }) => {
//     return (
//         <View style={styles.container}>
//             <TextInput
//                 style={styles.input}
//                 value={value}
//                 onChangeText={onChangeText}
//                 placeholder={placeholder}
//                 secureTextEntry={secureTextEntry}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         marginBottom: 10,
//     },
//     input: {
//         borderWidth: 1,
//         borderColor: '#53B175',
//         borderRadius: 20,
//         paddingVertical: 8,
//         paddingHorizontal: 20,
//     },
// });

// export default Input;
import React, { FC, useState } from 'react';
import { TextInputProps, StyleSheet, View, TextInput, StyleProp, ViewStyle, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// import SearchIcon from '../../assets/svg/Search';


const Input = ({
    icon,
    label,
    containerStyle,
    labelColor,
    style,
    handleChange,
    backgroundColor,
    secureTextEntry,
    disabled,
    ...restProps
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <View style={[styles.container, containerStyle, { backgroundColor: backgroundColor ? backgroundColor : '#FFFFFF' }]}>
            {/* {icon &&
                <SearchIcon width={20} height={20} color={labelColor ? labelColor : '#9D9AB2'} />
            } */}
            <TextInput

                autoCapitalize='none'
                onChangeText={handleChange}
                placeholder={label}
                placeholderTextColor={labelColor ? labelColor : '#9D9AB2'}
                style={[styles.input, style, , { backgroundColor: backgroundColor ? backgroundColor : '#FFFFFF' }]}
                secureTextEntry={secureTextEntry && !showPassword}
                {...restProps}
                editable={!disabled}
            />
            {secureTextEntry && (
                <TouchableOpacity onPress={handleTogglePasswordVisibility}>
                    <Ionicons
                        name={showPassword ? 'eye' : 'eye-off'}
                        style={styles.icon}
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
        paddingHorizontal: 18,
        paddingVertical: 8,
        height: 42,
        marginBottom: 10,

    },
    icon: {
        marginRight: 8,
        fontSize: 20,
    },
    label: {
        fontSize: 13,
        fontWeight: '700',
        color: '#9D9AB2',
    },
    input: {
        fontSize: 13,
        flex: 1,
        marginHorizontal: 8,
    },
});

export default Input;