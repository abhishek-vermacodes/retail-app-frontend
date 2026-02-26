import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Store } from '../types/type';

import CustomerBottomTabNavigator from './CustomerBottomTabNavigator';
import CategoryProductsScreen from '../screens/CategoryScreen';
import ProductDetailsScreen from '../screens/ProductDetail/ProductDetail';
import CustomerHelpScreen from '../screens/helpCenter/CustomerHelpScreen';
import ShopDetailScreen from '../screens/shopDetail/ShopDetailsScreen';

export type CustomerStackParamList = {
  CustomerHome: undefined;
  CategoryScreen: { categoryKey: string } | undefined;
  ProductDetails: { productId: string } | undefined;
  ShopDetails: { shop: Store };
  HelpCenter: undefined;
};

const Stack = createNativeStackNavigator<CustomerStackParamList>();

export default function CustomerNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="CustomerHome"
        component={CustomerBottomTabNavigator}
      />
      <Stack.Screen name="CategoryScreen" component={CategoryProductsScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
      <Stack.Screen name="ShopDetails" component={ShopDetailScreen} />
      <Stack.Screen name="HelpCenter" component={CustomerHelpScreen} />
    </Stack.Navigator>
  );
}
