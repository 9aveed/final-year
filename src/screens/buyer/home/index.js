import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Input from '../../../components/Input';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { BuyerFetchProducts } from '../../../store/actions/buyersActions';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../components/Loader';

const BuyerHome = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const productsData = useSelector((state) => state?.buyer?.buyerProducts);
    const userData = useSelector((state) => state?.user?.user);
    const loader = useSelector((state) => state?.buyer?.loader);


    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => {
            navigation.navigate('productdetails', {
                item
            })
        }}>
            <Image source={item?.productImage ? { uri: item?.productImage } : require('../../../../assets/user.jpg')} style={styles.cardImage} />
            <View style={{ justifyContent: 'space-between', flexDirection: 'column', marginVertical: 8 }}>
                <Text style={styles.cardTitle}>{item?.productName}</Text>
                <Text style={styles.cartShop}>{item?.shopName}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={styles.cardPrice}>Rs {item?.productPrice + "/" + item?.productWeight}</Text>
                {/* <TouchableOpacity style={{ width: 20, height: 20, backgroundColor: "#53B175", borderRadius: 10, marginTop: 0, alignItems: 'center', justifyContent: 'center' }}>
                    <Ionicons name="add-outline" size={18} color={'white'} />
                </TouchableOpacity> */}
            </View>
        </TouchableOpacity>
    );

    useEffect(() => {
        dispatch(BuyerFetchProducts())
    }, [])
    return loader ? <Loader /> : (
        <ScrollView style={styles.container}>
            <View style={{ paddingHorizontal: 29, paddingTop: 40, gap: 30 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ fontSize: 18, fontWeight: '600', color: '#000' }}>Welcome</Text>
                        <Text style={{ fontSize: 24, fontWeight: '700', color: '#000' }}>{userData?.displayName}</Text>
                    </View>
                    <Image style={{ width: 60, height: 60, borderRadius: 100 }} source={userData?.profileImage ? { uri: userData?.profileImage } : require('../../../../assets/user.jpg')} />

                </View>
                <Input style={styles.input} label="Search store" handleChange={() => { }} />
            </View>
            <View style={{ paddingVertical: 20 }}>
                <Text style={{ paddingLeft: 29, fontSize: 18, fontWeight: '600', color: '#000', }}>Categories</Text>
                <ScrollView horizontal scrollEnabled contentContainerStyle={styles.cat} showsHorizontalScrollIndicator={false}>
                    {categorieslist.map((e, index) => {
                        return (
                            <TouchableOpacity key={index} onPress={() => {
                                navigation.navigate('buyercategorylist', {
                                    category: e?.type,
                                    cat: e?.title
                                })
                            }}>
                                <View style={{ backgroundColor: "white", padding: 10, borderRadius: 200, }}>
                                    <Image style={{ width: 60, height: 60, borderRadius: 100 }} source={e?.image} />
                                </View>
                                <Text style={{ fontSize: 14, fontWeight: '800', color: '#000', textAlign: "center", paddingTop: 5 }}>{e.title}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>
            </View>
            <FlatList
                data={productsData}
                scrollEnabled={false}
                renderItem={renderItem}
                numColumns={2}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.cardContainer}
            />
        </ScrollView>
    );
};

const gapSize = 10;

export default BuyerHome;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 20
    },
    title: {
        color: '#4C4F4D',
        textAlign: 'center',
        fontSize: 30,
        fontStyle: 'normal',
        fontWeight: '600',
    },
    cardContainer: {
        alignItems: 'center',
        justifyContent: "center",
        margin: -gapSize / 2,
    },
    card: {
        width: 180,
        margin: gapSize / 2,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 10,
        borderColor: '#E2E2E2',
        borderWidth: 1
    },
    cardImage: {
        width: 160,
        height: 150,
        resizeMode: 'cover',
        borderRadius: 10,
    },
    cardTitle: {
        fontWeight: '700',
        fontSize: 12,
        textTransform: 'uppercase'
    },
    cartShop: {
        fontWeight: '700',
        fontSize: 14,
        textTransform: 'uppercase'
    },
    cardPrice: {
        color: 'green',
        fontSize: 14,

    },
    cardSize: {
        color: '#7C7C7C',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '700',
    },
    input: {
        marginVertical: 10,
        fontSize: 14,
        color: "black",
        height: 45,
        padding: 10,
        paddingLeft: 20,
        backgroundColor: "#e2e2e2",
        width: 350,
        borderRadius: 10,
    },
    cat: { flexDirection: 'row', gap: 20, alignItems: 'center', paddingVertical: 20, paddingLeft: 29, }
});

const categorieslist = [
    {
        title: "Meat",
        type: "meat",
        image: require('../../../../assets/meat.png')
    },
    {
        title: "Vegetable",
        type: "vegetable",
        image: require('../../../../assets/veg.png')

    },
    {
        title: "Fruits",
        type: "fruits",
        image: require('../../../../assets/apple.png')

    },
    {
        type: "dairy",
        title: "Dairy Products",
        image: require('../../../../assets/dairy.png')

    },
    {
        type: "beverages",
        title: "dairy",
        image: require('../../../../assets/bev.png')
    },

]