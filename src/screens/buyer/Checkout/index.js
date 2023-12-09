import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import TextArea from '../../../components/TextArea';
import { useState } from 'react';
import { BuyerCreateOrder } from '../../../store/actions/buyersActions';
import { useNavigation } from '@react-navigation/native';
import Loader from '../../../components/Loader';

const Checkout = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation()
    const cartData = useSelector((state) => state?.cart?.items);
    const userData = useSelector((state) => state?.user?.user);
    const [userAddress, setUserAddress] = useState(userData?.address);
    const loader = useSelector((state) => state?.buyer?.loader);
    console.log(loader, 'sdf')
    const removeFromCart = (productId) => {
        dispatch({
            type: 'REMOVE_FROM_CART',
            payload: productId,
        });
    }
    const totalPrice = cartData.reduce((total, cartItem) => {
        const itemPrice = parseInt(cartItem.item.productPrice);
        const itemQuantity = cartItem.quantity;
        return total + itemPrice * itemQuantity;
    }, 0);
    const HandleCreateOrder = () => {
        dispatch(BuyerCreateOrder({ navigation, userAddress, userData, cartData }))
    }
    return loader ? <Loader /> : (
        <ScrollView contentContainerStyle={{ padding: 20, gap: 20, backgroundColor: 'white' }}>
            <Text style={styles.title}>Checkout</Text>
            <View style={styles.orderSummary}>
                <Text style={styles.desc}>ORDER SUMMARY</Text>
                <View style={{ gap: 5, paddingVertical: 10 }} >
                    {cartData && cartData?.map((e, index) => {
                        return (
                            <View style={styles.card} key={index}>
                                <View style={{ flexDirection: 'row', gap: 30, }}>
                                    <Image style={{ height: 70, width: 70, borderRadius: 20 }} source={e?.item?.productImage ? { uri: e?.item?.productImage } : require('../../../../assets/cod.jpg')} />
                                    <View style={{ flexDirection: 'column', justifyContent: 'space-evenly' }}>
                                        <Text style={styles.productText}>{e?.item?.productName}</Text>
                                        <Text style={styles.priceText}>1{e?.item?.productWeight + ' ,  Rs ' + e?.item?.productPrice + " x " + e?.quantity}</Text>
                                    </View>
                                </View>
                                <View style={{ gap: 10, paddingRight: 10, alignItems: 'center' }}>
                                    <TouchableOpacity
                                        style={{}}
                                        onPress={() => removeFromCart(e?.item?.id)}
                                    >
                                        <AntDesign color='#979899' name='close' size={20} />
                                    </TouchableOpacity>
                                    <Text style={styles.productText}>Rs {e?.item?.productPrice * e?.quantity}</Text>
                                </View>

                            </View>
                        )
                    })}
                </View>
            </View>
            <View style={styles.orderSummary}>
                <Text style={styles.desc}>DELIVERY ADDRESS</Text>
                <View style={[styles.ticketCard, { justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }]}>
                    <View style={{ gap: 15, width: '90%' }}>

                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                            <Text style={[styles.addressText, { fontWeight: '700' }]}>{userData?.displayName}</Text>
                            <Text style={[styles.addressText, { fontWeight: '400' }]}>{'(' + userData?.phoneNumber + ')'}</Text>
                        </View>
                        <TextArea value={userAddress}
                            handleChange={(e) => {
                                setUserAddress(e)
                            }} />
                    </View>
                    <Ionicons name='chevron-forward-outline' />
                </View>
            </View>
            <View style={styles.orderSummary}>
                <Text style={styles.desc}>PAYMENT METHOD</Text>
                <TouchableOpacity style={[styles.ticketCard, { justifyContent: 'space-between', flexDirection: 'row' }]}>
                    <Text style={[styles.addressText, { fontWeight: '700' }]}>CASH ON DELIVERY</Text>
                    <Ionicons name='chevron-forward-outline' />
                </TouchableOpacity>
            </View>
            <View style={styles.feeCard}>
                <Text style={[styles.addressText, { fontWeight: '700' }]}>Sub-total</Text>
                <Text style={[styles.addressText, { fontWeight: '700' }]}>Rs {totalPrice}</Text>
            </View>

            <View style={styles.feeCard}>
                <Text style={[styles.addressText, { fontWeight: '700' }]}>Delivery Fee</Text>
                <Text style={[styles.addressText, { fontWeight: '700' }]}>Rs 100</Text>
            </View>

            <View style={styles.feeCard}>
                <Text style={[styles.addressText, { fontWeight: '700' }]}>Total</Text>
                <Text style={[styles.addressText, { fontWeight: '700' }]}>Rs {totalPrice + 100}</Text>
            </View>
            <TouchableOpacity style={styles.checkoutBtn} onPress={HandleCreateOrder}>
                <Text style={{ color: 'white' }}>CREATE ORDER</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default Checkout

const styles = StyleSheet.create({
    title: { alignSelf: 'center', paddingVertical: 30, fontSize: 28, fontWeight: '800' },
    desc: { fontSize: 11, fontWeight: '800', letterSpacing: 0.66 },
    orderSummary: {
        gap: 10
    },
    card: {
        padding: 5,
        borderRadius: 20,
        flexDirection: 'row',
        elevation: 1,
        backgroundColor: '#f6f6f6',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    ticketCard: { padding: 16, borderRadius: 16, borderColor: '#E7EAED', borderWidth: 1, gap: 10 },
    addressText: { color: '#031222', fontSize: 14, },
    feeCard: { justifyContent: 'space-between', flexDirection: 'row' },
    checkoutBtn: {
        backgroundColor: '#53B175', justifyContent: 'center', alignItems: 'center', paddingVertical: 13, paddingHorizontal: 40, borderRadius: 30, elevation: 5, alignSelf: 'center'
    }
})