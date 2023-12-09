import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import Input from '../../../components/Input';
import { pickImage } from '../../../utils/pickImage';
import { Picker } from '@react-native-picker/picker';
import { SellerUploadProduct } from '../../../store/actions';
import { Ionicons } from '@expo/vector-icons';
import TextArea from "../../../components/TextArea"
import Loader from '../../../components/Loader';
const SellerAddProduct = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const userData = useSelector((state) => state?.user?.user);
    const loader = useSelector((state) => state?.seller?.loader);
    const [selectedCategory, setSelectedCategory] = useState("")
    const [description, setDescription] = useState("")
    return loader ? <Loader /> : (
        <ScrollView style={{ flex: 1, paddingHorizontal: 29, paddingVertical: 40, gap: 20 }}>
            <Header navigation={navigation} />
            <Formik

                initialValues={{
                    productName: '',
                    productImages: "",
                    price: 0,
                    stock: 0,
                    desc: ""
                }}
                onSubmit={values => {
                    dispatch(SellerUploadProduct({ values, selectedCategory, userData, navigation, description }));
                }
                }>
                {({ handleChange, handleBlur, handleSubmit, values,
                    errors,
                    touched,
                    setFieldValue,
                }) => (
                    <View style={{flex:1,marginBottom:10}}>
                        <Text style={{ fontSize: 14, color: 'black', marginVertical: 5, fontWeight: '400', }}>Product Name</Text>
                        <Input
                            placeholderTextColor="#222430"
                            placeholder="Product Name"
                            onChangeText={handleChange('productName')}
                            onBlur={handleBlur('productName')}
                            value={values.productName}
                        />
                        {touched.productName && errors.productName ? (
                            <Text style={{ color: "red", fontSize: 12 }}>{errors.productName}</Text>
                        ) : null}
                        <Text style={{ fontSize: 14, color: 'black', marginVertical: 5, fontWeight: '400', }}>Product Price</Text>

                        <Input
                            placeholderTextColor="#222430"
                            placeholder="Product Price"
                            onChangeText={handleChange('price')}
                            onBlur={handleBlur('price')}
                            keyboardType='decimal-pad'
                            value={values.price}
                        />
                        {touched.price && errors.price ? (
                            <Text style={{ color: "red", fontSize: 12 }}>{errors.price}</Text>
                        ) : null}
                        <Text style={{ fontSize: 14, color: 'black', marginVertical: 5, fontWeight: '400', }}>Product Description</Text>

                        <TextArea value={description}
                            handleChange={(e) => {
                                setDescription(e)
                            }} />
                        <View>
                            <Text style={{ fontSize: 12, color: 'black', marginVertical: 15, fontWeight: '400', marginBottom: 10 }}>Select Product Category</Text>
                            <View>

                                <Picker

                                    style={styles.picker}
                                    selectedValue={selectedCategory}
                                    dropdownIconColor="#000"
                                    placeholder="Select Category"
                                    itemStyle={styles.pickerItem}
                                    onValueChange={(value) => {
                                        setSelectedCategory(value)
                                    }}>
                                    {
                                        Categories.map((e, index) => {
                                            return (
                                                <Picker.Item
                                                    style={styles.pickerItem}
                                                    key={index} label={e.label} value={e.value} />
                                            );
                                        })
                                    }
                                </Picker>
                            </View>
                        </View>
                        <Text style={{ fontSize: 14, color: 'black', marginVertical: 10, fontWeight: '400', }}>Product Image (Select an Image)</Text>

                        <TouchableOpacity
                            onPress={async () => {
                                try {
                                    const image = await pickImage();
                                    if (image) {
                                        setFieldValue("productImages", image);
                                    }
                                } catch (error) {
                                    console.log("Error picking image: ", error);
                                }
                            }}
                        >
                            {!values.productImages ? (
                                <Image
                                    resizeMode='cover'
                                    resizeMethod='auto'
                                    style={{ height: 150, width: '100%', borderRadius: 10 }}
                                    blurRadius={2}
                                    source={require("../../../../assets/grocery.jpg")}
                                />
                            ) : (
                                <Image
                                    style={{ height: 150, width: '100%', borderRadius: 10 }}
                                    resizeMode='cover'
                                    resizeMethod='auto'

                                    source={{
                                        uri: values.productImages,
                                    }}
                                />
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.addProduct}
                            onPress={handleSubmit}
                        >
                            <Text style={styles.addProductText}>Add Product</Text>
                        </TouchableOpacity >
                    </View>
                )}
            </Formik>
        </ScrollView >
    )
}

export default SellerAddProduct
const Header = ({ navigation }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 40 }}>
            <TouchableOpacity style={{ padding: 4 }} onPress={() => navigation.goBack()}>
                <Ionicons
                    size={24}
                    name="arrow-back"
                    color='#53B175'
                />
            </TouchableOpacity>
            <Text style={styles.userName}>Add Grocery Product</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    userName: {
        color: '#53B175',
        fontSize: 22,
        fontStyle: 'normal',
        fontWeight: '900',
        letterSpacing: 0.28,
        textTransform: 'uppercase',
    },
    welcome: {
        color: '#999',
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: '800',
        textAlign: 'center'
    },
    addProductText: {
        color: 'white',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '800',
    },
    addProduct: {
        backgroundColor: '#53B175', justifyContent: 'center', alignItems: 'center', paddingVertical: 15, borderRadius: 35, elevation: 4,
        margin: 20
    },
    picker: {
        backgroundColor: "white",
        borderRadius: 80,
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

const Categories = [
    { label: "Product Category", value: "" },
    { label: "Dairy Product", value: "dairy" },
    { label: "Fruits", value: "fruits" },
    { label: "Vegetable", value: "vegetable" },
    { label: "Meat", value: "meat" },
];