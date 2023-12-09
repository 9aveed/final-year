import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native'
import React from 'react'
import Input from '../../../components/Input'
import Button from '../../../components/Button'
import { useDispatch, useSelector } from 'react-redux'
import { Formik } from 'formik';
import Loader from '../../../components/Loader'
import { BuyerLoginMethod } from '../../../store/actions/buyersActions'

const BuyerLogin = ({ navigation }) => {
  const dispatch = useDispatch();
  const loader = useSelector((state) => state?.user?.loader);
  return loader ? <Loader /> : (
    <ImageBackground source={require('../../../../assets/gobi.jpg')} blurRadius={250} style={{ flex: 1, justifyContent: 'center' }}>
      <Text style={{ fontSize: 40, color: 'white', textAlign: 'center', fontWeight: '900', marginBottom: 20 }}>SmartBasket App</Text>
      <Text style={{ fontSize: 14, color: 'white', textAlign: 'center', fontWeight: '400', marginBottom: 50 }}>
        Shop Smart, Shop Fresh!
      </Text>
      <Formik

        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={values => {
          dispatch(BuyerLoginMethod({ values, navigation }));
        }
        }>
        {({ handleChange, handleBlur, handleSubmit, values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <View style={{ padding: 20, gap: 20 }}>
            <View>

              <Text style={{ fontSize: 14, color: 'white', marginVertical: 5, fontWeight: '400', }}>Email Address</Text>
              <Input
                placeholderTextColor="#222430"
                placeholder="Email Address"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
              {touched.email && errors.email ? (
                <Text style={{ color: "red", fontSize: 12 }}>{errors.email}</Text>
              ) : null}
              <Text style={{ fontSize: 14, color: 'white', marginVertical: 5, fontWeight: '400', }}>Password</Text>
              <Input
                placeholderTextColor="#222430"
                placeholder="Password"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              {touched.password && errors.password ? (
                <Text style={{ color: "red", fontSize: 12, }}>{errors.password}</Text>
              ) : null}
            </View>
            <Button
              onPress={handleSubmit}
              title={'Login'} />
            <Button onPress={() => { navigation.navigate('buyerregister') }} title={'Register'} />
          </View>
        )}
      </Formik>
    </ImageBackground>
  )
}

export default BuyerLogin

const styles = StyleSheet.create({
  inputText: {
    color: '#53B175',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
  }
})