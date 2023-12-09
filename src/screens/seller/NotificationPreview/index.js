import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import { AcceptUserOrder, RejectUserOrder } from '../../../store/actions';
import Loader from '../../../components/Loader';

const NotificationPreview = () => {
    const { params } = useRoute();
    const dispatch = useDispatch();
    const navigation = useNavigation()
    let totalAmount = 0;
    const loader = useSelector((state) => state?.seller?.loader);
    const userData = useSelector((state) => state?.user?.user);
    console.log(params?.data, 'params?.dataparams?.dataparams?.data')
    const HandleAcceptOrder = () => {
        dispatch(AcceptUserOrder({ data: params?.data, navigation, userData }))
    }
    const HandleRejectOrder = () => {
        dispatch(RejectUserOrder({ data: params?.data, navigation, userData }))
    }
    return loader ? <Loader /> : (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView contentContainerStyle={{ padding: 20 }}>
                <Text style={{ textAlign: "center", paddingVertical: 20, fontSize: 20, fontWeight: '800', color: "#53B175", letterSpacing: 2 }}>ORDER DETAILS</Text>
                <View style={{ alignItems: 'center', gap: 10, marginBottom: 20 }}>
                    <Image source={{ uri: params?.data?.userDetails?.profileImage }} style={{ width: 50, height: 50, borderRadius: 100 }} />
                    <Text style={styles.desc}>{params?.data?.userDetails?.displayName}</Text>
                </View>
                {params?.data?.orderItemDetails?.map((e) => {
                    const itemTotal = e?.quantity * e?.price;
                    totalAmount += itemTotal;
                    return (
                        <View style={{ gap: 10 }}>
                            <Image source={{ uri: e?.productImage }} style={{ width: '100%', height: 150 }} />
                            <View style={styles.rowCard}>
                                <Text style={styles.heading}>PRODUCT NAME:</Text>
                                <Text style={styles.desc}>{e?.productName}</Text>
                            </View>
                            <View style={styles.rowCard}>
                                <Text style={styles.heading}>PRODUCT QUANTITY:</Text>
                                <Text style={styles.desc}>{e?.quantity + ' ' + e?.productWeight}</Text>
                            </View>
                            <View style={styles.rowCard}>
                                <Text style={styles.heading}>PRODUCT SHOP NAME:</Text>
                                <Text style={styles.desc}>{e?.shopName}</Text>
                            </View>
                            <View style={styles.rowCard}>
                                <Text style={styles.heading}>AMOUNT:</Text>
                                <Text style={styles.desc}>Rs {e?.quantity * e?.price}</Text>
                            </View>
                            <View style={{ borderColor: '#cfcfcf', borderWidth: 0.4, width: '100%', marginVertical: 20 }} />
                        </View>

                    )
                })
                }
                <View style={styles.rowCard}>
                    <Text style={styles.heading}>TOTAL AMOUNT:</Text>
                    <Text style={styles.desc}>Rs {totalAmount}</Text>
                </View>
                <View style={{ borderColor: '#cfcfcf', borderWidth: 0.4, width: '100%', marginVertical: 20 }} />
                <View style={{ gap: 5, marginVertical: 30 }}>
                    <Text style={styles.heading}>DELIVERY ADDRESS:</Text>
                    <Text style={{}}>{params?.data?.address}</Text>
                </View>
            </ScrollView>
            <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 30, marginVertical: 10 }}>
                <TouchableOpacity style={styles.addProductButton2} onPress={HandleRejectOrder} >
                    <Text style={styles.btnText}>REJECT</Text>
                </TouchableOpacity >
                <TouchableOpacity style={styles.addProductButton2} onPress={HandleAcceptOrder} >
                    <Text style={styles.btnText}>ACCEPT</Text>
                </TouchableOpacity >

            </View>
        </View>
    )
}

export default NotificationPreview

const styles = StyleSheet.create({
    rowCard: { justifyContent: "space-between", flexDirection: 'row' },
    addProductButton2: { backgroundColor: '#53B175', paddingVertical: 10, paddingHorizontal: 50, borderRadius: 5, flexDirection: 'row', gap: 10 },
    btnText: { color: "white" },
    heading: { fontSize: 14, fontWeight: 'bold', textTransform: "uppercase" },
    desc: { fontSize: 14, fontWeight: 'bold', textTransform: "uppercase" },
})