import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../screens/splash';
import IntroScreen from '../screens/Intro';
import BuyerLogin from '../screens/buyer/login';
import BuyerDashboard from '../screens/buyer/dashboard';
import BuyerRegister from '../screens/buyer/register';
import SellerLogin from '../screens/seller/login';
import SellerDashboard from '../screens/seller/dashboard';
import SellerRegister from '../screens/seller/register';
import ProductDetails from '../screens/buyer/ProductDetail';
import SellerAddProduct from '../screens/seller/AddProduct';
import SellerTermsCondition from '../screens/seller/Terms';
import SellerPrivacy from '../screens/seller/PrivacyPolicy';
import About from '../screens/About';
import SellerProfile from '../screens/seller/profile';
import BuyerCategoryListing from '../screens/buyer/CategoriesListing';
import BuyersCart from '../screens/buyer/cart';
import ProductEdit from '../screens/seller/ProductEdit';
import Checkout from '../screens/buyer/Checkout';
import NotificationPreview from '../screens/seller/NotificationPreview';
import BuyerProfile from '../screens/buyer/Profile';
const Stack = createNativeStackNavigator();
const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='splashscreen'>
        <Stack.Screen options={{
          headerShown: false,
        }} name="splashscreen" component={Splash} />
        <Stack.Screen options={{
          headerShown: false,
        }} name="introscreen" component={IntroScreen} />
        <Stack.Screen options={{
          headerShown: false,
        }} name="about" component={About} />
        <Stack.Screen options={{
          headerShown: false,
        }} name="buyerlogin" component={BuyerLogin} />
        <Stack.Screen options={{
          headerShown: false,
        }} name="buyerregister" component={BuyerRegister} />
        <Stack.Screen options={{
          headerShown: false,
        }} name="buyerdashboard" component={BuyerDashboard} />
        <Stack.Screen options={{
          headerShown: false,
        }} name="buyerprofile" component={BuyerProfile} />
        <Stack.Screen options={{
          headerShown: false,
        }} name="productdetails" component={ProductDetails} />
        <Stack.Screen options={{
          headerShown: false,
        }} name="buyercategorylist" component={BuyerCategoryListing} />
        <Stack.Screen options={{
          headerShown: false,
        }} name="buyercart" component={BuyersCart} />
        <Stack.Screen options={{
          headerShown: false,
        }} name="checkout" component={Checkout} />


        <Stack.Screen options={{
          headerShown: false,
        }} name="sellerlogin" component={SellerLogin} />
        <Stack.Screen options={{
          headerShown: false,
        }} name="sellerregister" component={SellerRegister} />
        <Stack.Screen options={{
          headerShown: false,
        }} name="sellerdashboard" component={SellerDashboard} />
        <Stack.Screen options={{
          headerShown: false,
        }} name="selleraddproduct" component={SellerAddProduct} />
        <Stack.Screen options={{
          headerShown: false,
        }} name="sellerprofile" component={SellerProfile} />
        <Stack.Screen options={{
          headerShown: false,
        }} name="sellerterms" component={SellerTermsCondition} />
        <Stack.Screen options={{
          headerShown: false,
        }} name="sellerprivacy" component={SellerPrivacy} />
        <Stack.Screen options={{
          headerShown: false,
        }} name="productedit" component={ProductEdit} />
        <Stack.Screen options={{
          headerShown: false,
        }} name="notificationpreview" component={NotificationPreview} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
