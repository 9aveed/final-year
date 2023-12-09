import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AntIcon from 'react-native-vector-icons/AntDesign';
import SellerHome from '../Home';
import SellerProfile from '../profile';
import { AntDesign, Entypo, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import AddStock from '../AddStock';
import SellerSettings from '../settings';
import SellerHistory from '../History';


const Tab = createBottomTabNavigator();
const SellerDashboard = () => {
    return (
        <Tab.Navigator
            tabBarPosition="bottom"
            screenOptions={{
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
                name="sellerhome"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <AntIcon name="home" color={color} size={20} />
                    ),
                }}
                component={SellerHome}
            />
            <Tab.Screen
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name="cart"
                            color={color}
                            size={20}
                        />
                    ),
                }}
                name="addstock"
                component={AddStock}
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
                name="sellerhistory"
                component={SellerHistory}
            />
            <Tab.Screen
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <AntDesign
                            name="setting"
                            color={color}
                            size={20}
                        />
                    ),
                }}
                name="sellersetting"
                component={SellerSettings}
            />

        </Tab.Navigator>
    );
};

export default SellerDashboard;
