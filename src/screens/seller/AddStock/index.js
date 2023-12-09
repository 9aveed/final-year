import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { FetchCurrentUserProducts, updateSellerProductStockInDatabase } from '../../../store/actions';
import { AntDesign } from '@expo/vector-icons';
import Loader from "../../../components/Loader"
import { ScrollView } from 'react-native';

const AddStock = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [updatedStock, setUpdatedStock] = useState({});

    const userData = useSelector((state) => state?.user?.user);
    const sellerProducts = useSelector((state) => state?.seller);
    console.log(sellerProducts, 'sdf')
    useEffect(() => {
        setUpdatedStock({});
        dispatch(FetchCurrentUserProducts(userData));
    }, []);



    const handleStockChange = (productId, value) => {
        setUpdatedStock((prevStock) => ({
            ...prevStock,
            [productId]: (prevStock[productId] || 0) + value,
        }));
    };

    const updateStockInDatabase = () => {
        for (const productId in updatedStock) {
            dispatch(updateSellerProductStockInDatabase(productId, updatedStock[productId]));
        };
    };
    return sellerProducts?.loader ? <Loader /> : (
        <View style={{ flex: 1, padding: 29, gap: 10, marginTop: 20, }}>
            <Header />
            {sellerProducts && sellerProducts?.sellerProducts?.length > 0 ?
                <ScrollView contentContainerStyle={{ gap: 20, }}>
                    {sellerProducts?.sellerProducts?.map((e, index) => {
                        return (
                            <View style={styles.card} key={index}>
                                <View style={{ flexDirection: 'row', gap: 20, }}>
                                    <Image style={{ height: 60, width: 60, borderRadius: 20 }} source={e?.productImage ? { uri: e?.productImage } : require('../../../../assets/cod.jpg')} />
                                    <View style={{ flexDirection: 'column', justifyContent: 'space-evenly' }}>
                                        <Text style={styles.productText}>{e?.productName}</Text>
                                        <Text style={styles.priceText}>1{e?.productWeight + ' ,  Rs ' + e?.productPrice}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', gap: 20, paddingRight: 20, alignItems: 'center' }}>
                                    <TouchableOpacity
                                        style={styles.minus}
                                        onPress={() => updatedStock[e.id] > 0 && handleStockChange(e.id, -1)}
                                    >
                                        <AntDesign color='#979899' name='minus' size={18} />
                                    </TouchableOpacity>
                                    <Text style={styles.stock}>{(updatedStock[e.id] ? updatedStock[e.id] : e?.stock || 0)}</Text>
                                    <TouchableOpacity
                                        style={styles.plus}
                                        onPress={() => handleStockChange(e.id, 1)}
                                    >
                                        <AntDesign color='white' name='plus' size={18} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    })}
                </ScrollView>
                : <View style={{ flex: 1, justifyContent: "center", alignItems: 'center' }}>
                    <Text style={{ fontSize: 11 }}>NO PRODUCTS ADDED YET</Text>
                </View>
            }
            {sellerProducts?.sellerProducts?.length > 0 && <TouchableOpacity style={[styles.addProduct, { alignSelf: 'center', paddingHorizontal: 40 }]} onPress={updateStockInDatabase}>
                <Text style={{ color: 'white' }}>UPDATE STOCK</Text>
            </TouchableOpacity>}
        </View>
    );
};

export default AddStock;
const Header = ({ }) => {
    return (
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
            <Text style={{
                color: '#53B175',
                fontWeight: "600",
                fontSize: 22,
                letterSpacing: 1,
            }}>ADD PRODUCT'S STOCK</Text>
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
        padding: 5,
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
        color: '#FF324B',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '800',
    },
    addProduct: {
        backgroundColor: '#53B175', justifyContent: 'center', alignItems: 'center', paddingVertical: 15, borderRadius: 30, elevation: 5
    }
});