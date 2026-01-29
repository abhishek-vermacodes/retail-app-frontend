import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import RetailerHomeScreen from '../screens/RetailerHome';
import CustomTabBar from '../components/CustomTabBar';
// import RetailerProductsScreen from '../screens/RetailerProducts';
import AddProductScreen from '../screens/AddProduct';
import OrdersScreen from '../screens/Orders';
import RetailerProfileScreen from '../screens/RetailerProfile';
import MyShopScreen from '../screens/MyShop';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={RetailerHomeScreen} />
      <Tab.Screen name="Products" component={MyShopScreen} />
      <Tab.Screen name="Center" component={AddProductScreen} />
      <Tab.Screen name="Orders" component={OrdersScreen} />
      <Tab.Screen name="Profile" component={RetailerProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
