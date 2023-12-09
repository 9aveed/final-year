import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
} from "react-native";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { FetchCurrentUserNotifications } from "../../../store/actions";
import { useEffect } from "react";
import Loader from "../../../components/Loader";

const SellerHistory = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const userData = useSelector((state) => state?.user?.user);
    const orders = useSelector((state) => state?.seller?.orders);
    const loader = useSelector((state) => state?.seller?.loader);
    useEffect(() => {
        dispatch(FetchCurrentUserNotifications(userData));
    }, []);

    return loader ? <Loader /> : (
        <View style={{ flex: 1, padding: 29, }}>
            <Text style={styles.heading}>NOTIFICATIONS</Text>
            {orders?.length ?
                <ScrollView contentContainerStyle={styles.container}>
                    {orders?.map((e, index) => {
                        return (
                            <TouchableOpacity key={index} style={styles.buttons} onPress={() => {
                                navigation.navigate('notificationpreview', { data: e })
                            }}>
                                <View style={{ alignItems: 'center', gap: 10, marginBottom: 20 }}>
                                    <Image source={{ uri: e?.userDetails?.profileImage }} style={{ width: 50, height: 50, borderRadius: 100 }} />
                                    <Text style={styles.desc}>{e?.userDetails?.displayName}</Text>
                                </View>
                                {e?.orderItemDetails?.map((item, itemIndex) => {
                                    return (
                                        <View key={itemIndex} style={{ flexDirection: "row", alignItems: 'center', gap: 10 }}>
                                            <Text style={styles.desc}>PRODUCT NAME:   {item?.productName}</Text>
                                            <Text style={styles.address}>{' (' + item?.quantity + '' + item?.productWeight + ') '}</Text>
                                        </View>
                                    )
                                })}
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row', gap: 5, flexWrap: 'wrap' }}>
                                        <Text style={styles.desc}>Address:</Text>
                                        <Text style={styles.address}>{e?.address}</Text>
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                                    <Text style={styles.desc}>PHONE NUMBER:</Text>
                                    <Text style={styles.address}>{e?.userDetails?.phoneNumber}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                    }

                </ScrollView>
                :
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{}}>No Orders Yet !</Text>
                </View>
            }
        </View>
    );
};
export default SellerHistory;
const styles = StyleSheet.create({
    heading: {
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: 22,
        letterSpacing: 2,
        color: "#53B175",
        textAlign: "center",
        paddingTop: 20
    },
    title: {
        fontSize: 16,
        fontWeight: "800",
        color: "#000000",
        textTransform: "uppercase"
    },
    desc: {
        fontSize: 13,
        fontWeight: "800",
        color: "#000000",
        textTransform: "uppercase"
    },
    buttons: {
        marginVertical: 10,
        padding: 20,
        backgroundColor: "white",
        borderRadius: 10,
        elevation: 1,
        gap: 10
    },
    container: {
        backgroundColor: "#F4F3F4",
        gap: 20,
        marginTop: 20

    },
    shopName: { textAlign: 'center', fontWeight: 'bold', fontSize: 18, textTransform: "uppercase", marginVertical: 10 },
    address: {
        fontSize: 12,
        fontWeight: "300",
        color: "#000000",
        textTransform: "uppercase"
    }
});
