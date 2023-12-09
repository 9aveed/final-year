import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { FetchCurrentUserProducts } from '../../../store/actions';
import Loader from '../../../components/Loader';
import { AntDesign } from '@expo/vector-icons';

const SellerHome = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const userData = useSelector((state) => state?.user?.user);
    const sellerProducts = useSelector((state) => state?.seller);
    useEffect(() => {
        dispatch(FetchCurrentUserProducts(userData));
    }, []);
    return sellerProducts?.loader ? <Loader /> : (
        <View style={{ flex: 1, paddingHorizontal: 29, paddingVertical: 40, gap: 20 }}>
            <Header userData={userData} />
            {!sellerProducts?.sellerProducts?.length &&
                <View style={{ alignItems: 'center', justifyContent: "center", backgroundColor: "white", paddingVertical: 40, borderRadius: 20, elevation: 1 }}>
                    <Image style={{ width: 100, height: 100 }} source={require('../../../../assets/lock.png')} />
                    <Text style={{ fontSize: 20, fontWeight: '500', color: "#000", marginTop: 35 }}>No Orders Yet?</Text>
                    <Text
                        style={{ color: '#8B8D97', fontSize: 14, fontWeight: '400', marginTop: 12, marginBottom: 24 }}
                    >Add products to your store and start {"\n"} selling to see orders here.</Text>
                    <TouchableOpacity
                        style={styles.addProductButton2}
                        onPress={() => { navigation.navigate('selleraddproduct') }}
                    >
                        <Text style={styles.addProductText}>ADD PRODUCT</Text>
                    </TouchableOpacity >
                </View>}
            {sellerProducts?.sellerProducts?.length > 0 && <View View style={{ alignItems: 'flex-end', justifyContent: "flex-end", paddingBottom: 0, borderRadius: 20 }}>
                <TouchableOpacity
                    style={styles.addProductButton}
                    onPress={() => { navigation.navigate('selleraddproduct') }}
                >
                    <Text style={styles.addProductText}>ADD PRODUCT</Text>
                    <AntDesign name='plus' size={18} color='white' />
                </TouchableOpacity >
            </View>
            }
            <ScrollView contentContainerStyle={{ gap: 10 }} showsVerticalScrollIndicator={false}>
                {sellerProducts && sellerProducts?.sellerProducts?.map((e, index) => {
                    return (
                        <TouchableOpacity
                            onPress={() => { navigation.navigate('productedit', { data: e }) }}
                            style={styles.card} key={index}>
                            <View style={{ flexDirection: 'row', gap: 20, }}>
                                <Image style={{ height: 60, width: 60, borderRadius: 20 }} source={e?.productImage ? { uri: e?.productImage } : require('../../../../assets/cod.jpg')} />
                                <View style={{ flexDirection: 'column', justifyContent: 'space-evenly' }}>
                                    <Text style={styles.productText}>{e?.productName}</Text>
                                    <Text style={styles.priceText}>1{e?.productWeight + ' ,  Rs ' + e?.productPrice}</Text>
                                </View>
                            </View>
                            <View style={{ paddingRight: 20 }}>
                                <Text style={styles.priceText}>{e?.stock} in stock</Text>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        </View >
    )
}

export default SellerHome
const Header = ({ userData }) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
                <Text style={styles.welcome}>Welcome Back, </Text>
                <Text style={styles.userName}>{userData?.displayName}</Text>
            </View>
            <View>
                <Image style={{ width: 60, height: 60, borderRadius: 100 }} source={userData?.profileImage ? { uri: userData?.profileImage } : require('../../../../assets/user.jpg')} />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    userName: {
        color: '#2F2E41',
        fontSize: 28,
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
    },
    addProductText: {
        color: 'white',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '800',
    },
    addProductButton: {
        backgroundColor: '#53B175', justifyContent: 'center', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5, flexDirection: 'row', gap: 10
    },
    addProductButton2: {
        backgroundColor: '#53B175', justifyContent: 'center', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5, flexDirection: 'row', gap: 10
    },
    card: {
        padding: 10,
        borderRadius: 20,
        flexDirection: 'row',
        elevation: 1,
        backgroundColor: 'white',

        alignItems: 'center',
        justifyContent: 'space-between'
    },
    welcome: {
        color: '#53B175',
        fontSize: 22,
        fontStyle: 'normal',
        fontWeight: '800',
    },
    productText: {
        color: '#06161C',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '800',
        textTransform: 'capitalize'
    },
    priceText: {
        color: 'black',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
    },
});