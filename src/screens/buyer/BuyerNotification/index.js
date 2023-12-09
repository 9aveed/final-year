import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppBar from '../../../components/appBar'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { FetchBuyerNotifications } from '../../../store/actions/buyersActions'

const BuyerNotification = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const userData = useSelector((state) => state?.user?.user);
    const notifications = useSelector((state) => state?.buyer?.notifications);
    useEffect(() => {
        dispatch(FetchBuyerNotifications({ id: userData?.uid }));
    }, [])
    console.log(notifications, 'notifications')
    return (
        <View style={{ flex: 1 }}>
            <AppBar showBackArrow={false} showProfile={false} title="Notifications" navigation={navigation} />
            <ScrollView contentContainerStyle={{ paddingHorizontal: 20, }}>
                {notifications?.map((e, index) => {
                    let totalAmount = 0;

                    return e?.type === "order" ? (
                        <View key={index} style={{ backgroundColor: "white", gap: 20, padding: 20, borderRadius: 20, elevation: 1 }}>
                            <View>

                                <Text style={{ fontSize: 16, fontWeight: "800", textTransform: 'uppercase', textAlign: "center", paddingBottom: 20 }}>Order</Text>
                                <Text style={{ fontSize: 14, fontWeight: "400", textTransform: 'uppercase' }}>{'your request is ' + e?.status}</Text>
                                <Text style={{ fontSize: 10, fontWeight: "300", textTransform: 'uppercase' }}>Delivery is on the way</Text>
                            </View>
                            <View style={{ gap: 5 }}>
                                <Text style={{ fontSize: 16, fontWeight: "800", textTransform: 'uppercase' }}>Products:</Text>

                                {e?.orderDetails?.map((item, index) => {
                                    const itemTotal = item?.quantity * item?.price;
                                    totalAmount += itemTotal;
                                    return (<View>
                                        <Text style={{ fontSize: 11, fontWeight: "300", textTransform: 'uppercase' }}>{item?.productName + " ( " + item?.quantity + " " + item?.productWeight + " )"}</Text>

                                    </View>)
                                })}
                                <Text>.</Text>
                                <Text>.</Text>
                                <Text style={{ fontSize: 11, fontWeight: "bold", textTransform: 'uppercase' }}>Total Amount: {totalAmount}</Text>

                            </View>
                        </View>
                    ) :
                        (
                            <View key={index} style={{ backgroundColor: "white", gap: 5, padding: 20, borderRadius: 20, elevation: 1 }}>
                                <Text style={{ fontSize: 16, fontWeight: "800", textTransform: 'uppercase' }}>shop name</Text>
                                <Text style={{ fontSize: 13, fontWeight: "400", textTransform: 'capitalize' }}>shop message</Text>
                            </View>
                        )
                })
                }

            </ScrollView>
        </View>
    )
}

export default BuyerNotification

const styles = StyleSheet.create({})