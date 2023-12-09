import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, Image, ScrollView, ToastAndroid } from "react-native";
import React from 'react'
import Loader from '../../../components/Loader';
import { Formik } from 'formik';
import { pickImage } from '../../../utils/pickImage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Input from "../../../components/Input";
import { Ionicons } from "@expo/vector-icons";
import { SellerSignUpMethod } from "../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
const SellerRegister = ({ navigation }) => {
    const dispatch = useDispatch();
    const loader = useSelector((state) => state?.user?.loader);
    return loader ? <Loader /> : (
        <ScrollView style={styles.container}>
            <View style={styles.innerContainer}>
                {loader ?
                    <Loader /> :
                    <Formik
                        initialValues={{
                            email: '',
                            shopName: '',
                            name: '',
                            password: '',
                            phone: '',
                            profileImage: ''
                        }}
                        onSubmit={values => {
                            if (values?.profileImage?.length) {
                                dispatch(SellerSignUpMethod({ values, navigation }));

                            } else {
                                ToastAndroid.show('Please Upload Profile Pictuer!', ToastAndroid.showWithGravity);
                            }
                        }
                        }>
                        {({ handleChange, handleBlur, handleSubmit, values,
                            errors,
                            touched,
                            setFieldValue,
                        }) => (
                            <KeyboardAvoidingView style={{ paddingHorizontal: 20, flex: 1, justifyContent: 'center', marginTop: '5%' }} >
                                <View style={{ alignItems: 'center', flexDirection: "row", justifyContent: "space-between" }}>
                                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                                        <Ionicons
                                            name="arrow-back"
                                            fill="#111"
                                            size={20}
                                        />
                                    </TouchableOpacity>
                                    <Text style={styles.authTitle}>Register</Text>
                                    <Text style={styles.authTitle}></Text>
                                </View>
                                <View style={{ justifyContent: 'center', width: '100%', alignItems: 'center', marginBottom: 20 }}>

                                    <TouchableOpacity
                                        style={styles.imageComponent}
                                        onPress={async () => {
                                            try {
                                                const image = await pickImage();
                                                console.log(image, 'image')
                                                if (image) {
                                                    setFieldValue("profileImage", image);
                                                }
                                            } catch (error) {
                                                console.log("Error picking image: ", error);
                                            }
                                        }}
                                    >
                                        {!values.profileImage ? (
                                            <Image
                                                style={{ height: 60, width: 60, borderRadius: 200 }}
                                                source={require("../../../../assets/user.jpg")}
                                            />
                                        ) : (
                                            <Image
                                                style={{ height: 60, width: 60, borderRadius: 200 }}
                                                source={{
                                                    uri: values.profileImage,
                                                }}
                                            />
                                        )}

                                        <View style={styles.add}>
                                            <TouchableOpacity>
                                                <FontAwesome5
                                                    name="user-edit"
                                                    width={20}
                                                    height={20}
                                                    fill="#111"
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </TouchableOpacity>

                                </View>
                                <Text style={{ fontSize: 12, color: 'black', marginVertical: 15, fontWeight: '400', }}>Name</Text>
                                <Input
                                    placeholderTextColor="#222430"
                                    placeholder="Name"
                                    onChangeText={handleChange('name')}
                                    onBlur={handleBlur('name')}
                                    value={values.name}
                                    keyboardType="email-address"
                                />
                                {touched.name && errors.name ? (
                                    <Text style={{ color: "red", fontSize: 12 }}>{errors.name}</Text>
                                ) : null}
                                <Text style={{ fontSize: 12, color: 'black', marginVertical: 15, fontWeight: '400', }}>Shop Name</Text>
                                <Input
                                    placeholderTextColor="#222430"

                                    placeholder="Name"
                                    onChangeText={handleChange('shopName')}
                                    onBlur={handleBlur('shopName')}
                                    value={values.shopName}
                                    keyboardType="email-address"
                                />
                                {touched.name && errors.name ? (
                                    <Text style={{ color: "red", fontSize: 12 }}>{errors.shopName}</Text>
                                ) : null}
                                <Text style={{ fontSize: 12, color: 'black', marginVertical: 15, fontWeight: '400', }}>Email Address</Text>
                                <Input
                                    placeholderTextColor="#222430"
                                    placeholder="Email Address"
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                />
                                {touched.email && errors.email ? (
                                    <Text style={{ color: "red", fontSize: 12 }}>{errors.email}</Text>
                                ) : null}
                                <Text style={{ fontSize: 12, color: 'black', marginVertical: 15, fontWeight: '400', }}>Password</Text>
                                <Input
                                    placeholderTextColor="#222430"
                                    placeholder="Password"
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                />
                                {touched.password && errors.password ? (
                                    <Text style={{ color: "red", fontSize: 12 }}>{errors.password}</Text>
                                ) : null}
                                <Text style={{ fontSize: 12, color: 'black', marginVertical: 15, fontWeight: '400', }}>Phone Number</Text>
                                <Input
                                    placeholderTextColor="#222430"
                                    placeholder="Phone"
                                    onChangeText={handleChange('phone')}
                                    onBlur={handleBlur('phone')}
                                    value={values.phone}
                                    keyboardType="number-pad"
                                />
                                {touched.phone && errors.phone ? (
                                    <Text style={{ color: "red", fontSize: 12 }}>{errors.phone}</Text>
                                ) : null}
                                <View>

                                </View>
                                <TouchableOpacity
                                    style={styles.containedButton}
                                    onPress={handleSubmit}
                                >
                                    <Text
                                        style={styles.text1}
                                    >Sign Up</Text>
                                </TouchableOpacity>
                            </KeyboardAvoidingView>
                        )}
                    </Formik>
                }
            </View>
        </ScrollView>
    );
};
export default SellerRegister;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    innerContainer: {
        marginVertical: 20,
        flex: 1,
        justifyContent: 'center',
    },
    input: {
        marginBottom: 5,
    },
    button: {
        marginTop: 10,
        paddingVertical: 10,
        backgroundColor: '#53B175'
    },
    containedButton: {
        backgroundColor: '#53B175',
        paddingVertical: 15,
        alignItems: 'center',
        borderRadius: 50,
        marginVertical: 20
    },

    outlineButton: {
        backgroundColor: 'white',
        paddingVertical: 15,
        borderColor: '#53B175',
        borderWidth: 1,
        alignItems: 'center',
        borderRadius: 50
    },
    text1: {
        color: 'white'
    },
    text2: {
        color: '#53B175'
    },
    authTitle: {
        fontWeight: '700',
        fontSize: 24,
        color: '#53B175',
        textAlign: 'center',
        paddingBottom: 20
    },
    authDesc: {
        fontWeight: '400',
        fontSize: 14,
        color: '#2F2D2D',
        paddingBottom: 20
    },
    input: {
        width: '100%',
        backgroundColor: 'white',
        marginTop: '3%',
        borderRadius: 5,
        elevation: 5,
        paddingLeft: 20,
        color: '#5c14ec',
        height: 55,
    },
    picker: {
        backgroundColor: "#fff",
        elevation: 5,
        borderRadius: 8,
        padding: 8,
        borderColor: "black",
        borderWidth: 1,
        marginBottom: 16,
    },
    pickerItem: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000",
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        padding: 8,
    },
});
