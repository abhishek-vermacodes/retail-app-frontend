import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../context/AuthContext';
import CustomerHomeScreen from '../screens/CustomerHome';

import BottomTabNavigator from './BottomTabNavForCustomer';
import MyProducts from '../screens/MyProducts';
import MyProduct from '../screens/MyProduct';
import CreateShop from '../screens/CreateShop';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user } = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user?.role === 'retailer' && (
        <>
          <Stack.Screen name="Retailer" component={BottomTabNavigator} />
          <Stack.Screen name="CreateShop" component={CreateShop} />
          <Stack.Screen name="MyProducts" component={MyProducts} />
          <Stack.Screen name="MyProduct" component={MyProduct} />
        </>
      )}

      {user?.role === 'customer' && (
        <Stack.Screen name="Customer" component={CustomerHomeScreen} />
      )}
    </Stack.Navigator>
  );
}
