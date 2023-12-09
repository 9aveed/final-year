import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { FetchCurrentUserProducts, updateSellerProductStockInDatabase } from '../../../store/actions';
import { AntDesign } from '@expo/vector-icons';
import Loader from "../../../components/Loader"
import { ScrollView } from 'react-native';
import { decreaseQuantity, increaseQuantity } from '../../../store/reducer/cartReducer';

const BuyersCart = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const cartData = useSelector((state) => state?.cart?.items);
    const removeFromCart = (productId) => {
        dispatch({
            type: 'REMOVE_FROM_CART',
            payload: productId,
        });
    }
    const decreaseStock = (productId) => {
        dispatch(decreaseQuantity(productId));
    }

    const increaseStock = (productId, stock) => {
        dispatch(increaseQuantity(productId, stock));
    }
    return false ? <Loader /> : (
        <View style={{ flex: 1, padding: 20, gap: 20, marginTop: 20, }}>
            <Header />
            {cartData?.length > 0 && <ScrollView contentContainerStyle={{ gap: 5, }} showsHorizontalScrollIndicator={false}>
                {cartData?.map((e, index) => {
                    return (
                        <View style={styles.card} key={index}>
                            <View style={{ flexDirection: 'row', gap: 30, }}>
                                <Image style={{ height: 70, width: 70, borderRadius: 20 }} source={e?.item?.productImage ? { uri: e?.item?.productImage } : require('../../../../assets/cod.jpg')} />
                                <View style={{ flexDirection: 'column', justifyContent: 'space-evenly' }}>
                                    <Text style={styles.productText}>{e?.item?.productName}</Text>
                                    <Text style={styles.priceText}>1{e?.item?.productWeight + ' ,  Rs ' + e?.item?.productPrice}</Text>
                                    <View style={{ flexDirection: 'row', gap: 20, paddingTop: 15, alignItems: 'center' }}>
                                        <TouchableOpacity
                                            style={styles.minus}
                                            onPress={() => e?.quantity > 1 && decreaseStock(e?.item?.id)}
                                        >
                                            <AntDesign color='#979899' name='minus' size={18} />
                                        </TouchableOpacity>
                                        <Text style={styles.price}>{e?.quantity}</Text>
                                        <TouchableOpacity
                                            style={styles.plus}
                                            onPress={() => increaseStock(e?.item?.id)}
                                        >
                                            <AntDesign color='white' name='plus' size={18} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View style={{ gap: 30, paddingRight: 10, alignItems: 'center', }}>
                                <TouchableOpacity
                                    style={{}}
                                    onPress={() => removeFromCart(e?.item?.id)}
                                >
                                    <AntDesign color='#979899' name='close' size={18} />
                                </TouchableOpacity>
                                <Text style={styles.price}>Rs {e?.quantity * e?.item?.productPrice}</Text>


                            </View>
                        </View>
                    )
                })
                }
            </ScrollView>
            }
            {cartData?.length === 0 && <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>

                <Text style={{}}>No Items in the cart</Text>
            </View>
            }
            {cartData?.length > 0 && <TouchableOpacity style={styles.checkoutBtn} onPress={() => { navigation.navigate('checkout') }}>
                <Text style={{ color: 'white' }}>CHECKOUT</Text>
            </TouchableOpacity>}
        </View>
    );
};

export default BuyersCart;
const Header = ({ }) => {
    return (
        <View style={{ alignItems: 'center', }}>
            <Text style={styles.welcome}>My Cart</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    stock: {
        fontSize: 18,
        fontWeight: '700'
    },
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
    card: {
        padding: 15,
        borderRadius: 20,
        flexDirection: 'row',
        elevation: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    welcome: {
        color: '#181725',
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: '400',
    },
    productText: {
        color: '#06161C',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '400',
        textTransform: 'capitalize'
    },
    priceText: {
        color: '#FF324B',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
    },
    price: {
        color: '#181725',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '600',
    },
    addProduct: {
        backgroundColor: '#53B175', justifyContent: 'center', alignItems: 'center', paddingVertical: 10, borderRadius: 30, elevation: 5
    },
    checkoutBtn: {
        backgroundColor: '#53B175', justifyContent: 'center', alignItems: 'center', paddingVertical: 13, paddingHorizontal: 40, borderRadius: 30, elevation: 5, alignSelf: 'center'
    }
});