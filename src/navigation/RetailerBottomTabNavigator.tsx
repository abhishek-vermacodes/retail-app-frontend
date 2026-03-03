import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import RetailerHomeScreen from '../screens/retailerHome/RetailerHome';
import CustomTabBar from '../components/CustomTabBar';

import OrdersScreen from '../screens/orders/Orders';
import RetailerProfileScreen from '../screens/retailerProfile/RetailerProfile';
import CreateProduct from '../screens/createProduct/CreateProduct';
import StoreProducts from '../screens/storeProducts/StoreProducts';

const Tab = createBottomTabNavigator();

const RetailerBottomTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} role="retailer" />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={RetailerHomeScreen} />
      <Tab.Screen name="Products" component={StoreProducts} />
      <Tab.Screen name="Center" component={CreateProduct} />
      <Tab.Screen name="Orders" component={OrdersScreen} />
      <Tab.Screen name="Profile" component={RetailerProfileScreen} />
    </Tab.Navigator>
  );
};

export default RetailerBottomTabNavigator;
