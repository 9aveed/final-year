import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import Favorite from '../favorite';
import BuyersCart from '../cart';
import BuyerHome from '../home';
import BuyersSettings from '../settings';
import BuyerNotification from '../BuyerNotification';

const Tab = createBottomTabNavigator();

const BuyerDashboard = () => {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#53B175',
            tabBarInactiveTintColor: '#ababab',
            tabBarShowIcon: true,
            tabBarPressColor: '#36A7E7',
            tabBarShowLabel: false,
            showIcon: true,
            tabStyle: {
                backgroundColor: 'white',
                borderRadius: 30,
                justifyContent: 'center',
                alignContent: 'center',
            },
            tabBarIconStyle: {
                margin: 0,
                padding: 0,
            },
            tabBarLabelStyle: {
                margin: 0,
                padding: 0,
                fontSize: 10,
            },
            tabBarIndicatorStyle: { height: 1, backgroundColor: '#53B175' },
            tabBarStyle: {
                height: 50,
                backgroundColor: 'white',
                borderColor: 'white',
                borderWidth: 0,
            },
        }}
        >
            <Tab.Screen
                name="Home"
                component={BuyerHome}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="home" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Cart"
                component={BuyersCart}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="shoppingcart" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="favorite"
                component={Favorite}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="favorite" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name="history"
                            color={color}
                            size={20}
                        />
                    ),
                }}
                name="buyernotification"
                component={BuyerNotification}
            />
            <Tab.Screen
                name="Settings"
                component={BuyersSettings}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="setting" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default BuyerDashboard;
