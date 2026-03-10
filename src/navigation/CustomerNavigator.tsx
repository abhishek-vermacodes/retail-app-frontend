import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { Store } from '../types/type';

import CustomerBottomTabNavigator from './CustomerBottomTabNavigator';
import Category from '../screens/category/Category';
import CustomerHelpCenter from '../screens/helpCenter/CustomerHelpCenter';
import ShopProductDetail from '../screens/productDetailForCustomer/ProductDetailForCustomer';
import ShopForCustomer from '../screens/shopForCustomer/ShopForCustomer';
import Cart from '../screens/cart/Cart';

// export type CustomerStackParamList = {
//   CustomerHome: undefined;
//   CategoryScreen: { categoryKey: string } | undefined;
//   ProductDetails: { productId: string } | undefined;
//   ShopDetails: { shop: Store };
//   HelpCenter: undefined;
//   ShopProductDetail: undefined;
//   ProductDetailForCustomer: { id: string } | undefined;
//   ShopForCustomer: { shop: any } | undefined;
// };

// const Stack = createNativeStackNavigator<CustomerStackParamList>();

const Stack = createNativeStackNavigator();

export default function CustomerNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="CustomerHome"
        component={CustomerBottomTabNavigator}
      />
      <Stack.Screen name="CategoryScreen" component={Category} />
      <Stack.Screen name="HelpCenter" component={CustomerHelpCenter} />
      <Stack.Screen
        name="ProductDetailForCustomer"
        component={ShopProductDetail}
      />
      <Stack.Screen name="ShopForCustomer" component={ShopForCustomer} />
      <Stack.Screen name="Cart" component={Cart} />
    </Stack.Navigator>
  );
}
