import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../context/AuthContext';

import RetailerNavigator from './RetailerNavigator';
import CustomerNavigator from './CustomerNavigator';
import AuthNavigator from './AuthNavigator';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user, loading } = useContext(AuthContext);


  if (loading) return null;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      ) : user.role === 'retailer' ? (
        <Stack.Screen name="RetailerApp" component={RetailerNavigator} />
      ) : (
        <Stack.Screen name="CustomerApp" component={CustomerNavigator} />
      )}
    </Stack.Navigator>
  );
}
