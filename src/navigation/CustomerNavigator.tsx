import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Store } from '../types/type';

import CustomerBottomTabNavigator from './CustomerBottomTabNavigator';
import Category from '../screens/category/Category';
import CustomerHelpCenter from '../screens/helpCenter/CustomerHelpCenter';

export type CustomerStackParamList = {
  CustomerHome: undefined;
  CategoryScreen: { categoryKey: string } | undefined;
  ProductDetails: { productId: string } | undefined;
  ShopDetails: { shop: Store };
  HelpCenter: undefined;
  ShopProductDetail: undefined;
};

const Stack = createNativeStackNavigator<CustomerStackParamList>();

export default function CustomerNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="CustomerHome"
        component={CustomerBottomTabNavigator}
      />
      <Stack.Screen name="CategoryScreen" component={Category} />
      {/* <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} /> */}
      {/* <Stack.Screen name="ShopDetails" component={ShopDetailScreen} /> */}
      <Stack.Screen name="HelpCenter" component={CustomerHelpCenter} />
      {/* <Stack.Screen name="ShopProductDetail" component={ShopProductDetail} /> */}
    </Stack.Navigator>
  );
}
