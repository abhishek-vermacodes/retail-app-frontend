import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CustomerBottomTabNavigator from './CustomerBottomTabNavigator';
import CategoryProductsScreen from '../screens/CategoryScreen';
import ProductDetailsScreen from '../screens/ProductDetails';
import CustomerHelpScreen from '../screens/CustomerHelpScreen';

const Stack = createNativeStackNavigator();

export default function CustomerNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="CustomerHome"
        component={CustomerBottomTabNavigator}
      />
      <Stack.Screen name="CategoryScreen" component={CategoryProductsScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
      <Stack.Screen name="HelpCenter" component={CustomerHelpScreen} />
    </Stack.Navigator>
  );
}
