import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../context/AuthContext';
import RetailerHomeScreen from '../screens/RetailerHome';
import CustomerHomeScreen from '../screens/CustomerHome';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user } = useContext(AuthContext);

  return (
    <Stack.Navigator>
      {user?.role === 'retailer' && (
        <Stack.Screen name="Retailer" component={RetailerHomeScreen} />
      )}

      {user?.role === 'customer' && (
        <Stack.Screen name="Customer" component={CustomerHomeScreen} />
      )}
    </Stack.Navigator>
  );
}
