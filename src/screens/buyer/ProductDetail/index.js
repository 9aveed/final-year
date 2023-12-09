import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToFavorites, removeFromFavorites } from '../../../store/reducer/favoriteReducer'

const ProductDetails = () => {
    const { params } = useRoute();
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState(1);
    const favorite = useSelector((state) => state?.favorite?.favorites);
    console.log(favorite, 'favoritefavoritefavorite')

    const HandleAddToCart = () => {
        const data = {
            quantity,
            item: params?.item
        }
        dispatch({
            type: 'CART_ITEM',
            payload: data,
        });
        navigation.navigate('buyercart')
    }
    const HandleFavorite = () => {
        if (isFavorite) {
            dispatch(removeFromFavorites(params.item.id));
        } else {
            dispatch(addToFavorites(params.item));
        }
    }
    const isFavorite = favorite.some((favItem) => favItem.id === params.item.id);

    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            <ScrollView contentContainerStyle={{ gap: 10, }}>
                <Image style={{ width: '100%', height: 300, }} source={params?.item?.productImage ? { uri: params?.item?.productImage } : require('../../../../assets/user.jpg')} />
                <View style={{ gap: 10, padding: 20, }}>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                            <Text style={{ fontSize: 11, fontWeight: '700', letterSpacing: 0.66, color: '#031222', textTransform: 'uppercase' }}>{params?.item?.shopName}</Text>
                            <Text style={{ fontSize: 16, fontWeight: '700', color: '#031222', textTransform: 'uppercase' }}>{params?.item?.productName}</Text>
                        </View>

                        <TouchableOpacity style={{}} onPress={HandleFavorite}>
                            <MaterialIcons color={isFavorite ? '#FF5733' : '#7C7C7C'} name={isFavorite ? 'favorite' : 'favorite-border'} size={30} />
                        </TouchableOpacity>

                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 0, alignItems: 'center' }}>
                        <Text style={{ fontSize: 21, fontWeight: 'bold', color: '#181725', letterSpacing: 0.1 }}>Rs {params.item.productPrice * quantity}</Text>
                    </View>
                    <View style={styles.line}></View>
                    <View style={{ gap: 10 }} >
                        <Text style={{ fontSize: 11, fontWeight: '700', color: '#031222' }}>PRODUCT DESCRIPTION</Text>
                        <Text style={{ fontSize: 13, fontWeight: '400', color: '#7C7C7C' }}>
                            Apples are nutritious. Apples may be good for weight loss.
                            apples may be good for your heart. As part of a healtful and varied diet.
                        </Text>

                    </View>
                    <View style={styles.line}></View>

                </View>
            </ScrollView>
            <TouchableOpacity style={styles.button} onPress={HandleAddToCart}>
                <Text style={{ fontSize: 16, fontWeight: '600', color: '#fff' }}>Add to cart</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ProductDetails

const styles = StyleSheet.create({
    plus: {
        padding: 8,
        backgroundColor: '#53B175',
        borderRadius: 30
    },
    minus: {
        padding: 8,
        backgroundColor: '#F3F5F7',
        borderRadius: 30
    },
    line: { borderColor: 'rgba(226, 226, 226, 0.70)', borderWidth: 0.5, marginVertical: 20 },
    button: {
        backgroundColor: '#53B175',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        borderRadius: 50,
        margin: 20
    }
})