import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import CustomTabBar from '../components/CustomTabBar';
import CustomerHome from '../screens/customerHome/CustomerHome';
import Cart from '../screens/cart/Cart';
import UserOrders from '../screens/userOrders/UserOrders';
import UserProfile from '../screens/userProfile/UserProfile';

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
    </Tab.Navigator>
  );
};

export default CustomerBottomTabNavigator;
