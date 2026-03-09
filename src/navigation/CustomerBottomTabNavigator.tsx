import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import CustomTabBar from '../components/CustomTabBar';
import CustomerHome from '../screens/customerHome/CustomerHome';
import Cart from '../screens/cart/Cart';
import UserOrders from '../screens/userOrders/UserOrders';
import UserProfile from '../screens/userProfile/UserProfile';
import ShopProducts from '../screens/shopProducts/ShopProducts';
import ShopProductDetail from '../screens/shopProductDetail/ShopProductDetail';

const Tab = createBottomTabNavigator();

const CustomerBottomTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} role="user" />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={CustomerHome} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Orders" component={UserOrders} />
      <Tab.Screen name="Profile" component={UserProfile} />
      <Tab.Screen name="ShopProducts" component={ShopProducts} />
      <Tab.Screen name="ShopProductDetail" component={ShopProductDetail} />
    </Tab.Navigator>
  );
};

export default CustomerBottomTabNavigator;
