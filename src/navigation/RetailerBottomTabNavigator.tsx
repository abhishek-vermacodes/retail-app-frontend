import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import CustomTabBar from '../components/CustomTabBar';
import CreateProduct from '../screens/createProduct/CreateProduct';
import StoreProducts from '../screens/storeProducts/StoreProducts';
import RetailerHome from '../screens/retailerHome/RetailerHome';
import Orders from '../screens/orders/Orders';
import RetailerProfile from '../screens/retailerProfile/RetailerProfile';

const Tab = createBottomTabNavigator();

const RetailerBottomTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} role="retailer" />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={RetailerHome} />
      <Tab.Screen name="Products" component={StoreProducts} />
      <Tab.Screen name="Center" component={CreateProduct} />
      <Tab.Screen name="Orders" component={Orders} />
      <Tab.Screen name="Profile" component={RetailerProfile} />
    </Tab.Navigator>
  );
};

export default RetailerBottomTabNavigator;
