import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BuyerCategoryProducts } from '../../../store/actions/buyersActions';
import { Ionicons } from '@expo/vector-icons';
import Loader from '../../../components/Loader';
import AppBar from '../../../components/appBar';

const Favorite = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation()
  const favorite = useSelector((state) => state?.favorite?.favorites);

  const userData = useSelector((state) => state?.user?.user);
  const loader = useSelector((state) => state?.buyer?.loader);
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => {
      navigation.navigate('productdetails', {
        item
      })
    }}>
      <Image source={item?.productImage ? { uri: item?.productImage } : require('../../../../assets/user.jpg')} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{item?.productName}</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={styles.cardPrice}>${item?.productPrice + "/" + item?.productWeight}</Text>
        <TouchableOpacity style={{ width: 35, height: 35, backgroundColor: "#53B175", borderRadius: 10, marginTop: 0, alignItems: 'center', justifyContent: 'center' }}>
          <Ionicons name="add-outline" size={24} color={'white'} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return loader ? <Loader /> : (
    <ScrollView contentContainerStyle={{ flex: 1, gap: 20 }}>
      <AppBar showBackArrow={false} showProfile={false} title='FAVORITE PRODUCT' navigation={navigation} />
      <FlatList
        data={favorite}
        scrollEnabled={false}
        renderItem={renderItem}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.cardContainer}
        ListEmptyComponent={() => (
          <View style={{ marginTop: '50%' }}>
            <Text >No Favorite Products Yet!</Text>
          </View>
        )}
      />
    </ScrollView>
  )
}

export default Favorite
const gapSize = 10
const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20
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
    marginTop: 10,
    fontSize: 12,
    textTransform: 'capitalize'
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
})