import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../context/AuthContext';

import BottomTabNavigator from './BottomTabNavForCustomer';
import MyProducts from '../screens/MyProducts';
import MyProduct from '../screens/MyProduct';
import CreateShop from '../screens/CreateShop';
import UserBottomTabNavigator from './UserBottomTabNavigator';
import CategoryProductsScreen from '../screens/CategoryScreen';
import ProductDetailsScreen from '../screens/ProductDetails';

import RetailerHelpScreen from '../screens/RetailerHelpScreen';
import CustomerHelpScreen from '../screens/CustomerHelpScreen';
import AddLocation from '../screens/AddLocation';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user } = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AddLocation" component={AddLocation} />

      {user?.role === 'retailer' ? (
        <>
          <Stack.Screen name="Retailer" component={BottomTabNavigator} />
          <Stack.Screen name="CreateShop" component={CreateShop} />
          <Stack.Screen name="MyProducts" component={MyProducts} />
          <Stack.Screen name="MyProduct" component={MyProduct} />
          <Stack.Screen name="HelpCenter" component={RetailerHelpScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Customer" component={UserBottomTabNavigator} />
          <Stack.Screen
            name="CategoryScreen"
            component={CategoryProductsScreen}
          />
          <Stack.Screen
            name="ProductDetails"
            component={ProductDetailsScreen}
          />
          <Stack.Screen name="HelpCenter" component={CustomerHelpScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
