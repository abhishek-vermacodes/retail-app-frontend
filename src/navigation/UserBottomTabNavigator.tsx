import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import CustomTabBar from '../components/CustomTabBar';

import CustomerHomeScreen from '../screens/CustomerHome';
import UserOrdersScreen from '../screens/UserOrders';

import CartScreen from '../screens/Cart';
import UserProfileScreen from '../screens/UserProfile';

const Tab = createBottomTabNavigator();

const UserBottomTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} role="user" />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={CustomerHomeScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Orders" component={UserOrdersScreen} />
      <Tab.Screen name="Profile" component={UserProfileScreen} />
    </Tab.Navigator>
  );
};

export default UserBottomTabNavigator;
