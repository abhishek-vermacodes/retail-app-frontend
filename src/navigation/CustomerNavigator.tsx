import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { Store } from '../types/type';

import CustomerBottomTabNavigator from './CustomerBottomTabNavigator';
import Category from '../screens/category/Category';
import CustomerHelpCenter from '../screens/helpCenter/CustomerHelpCenter';
import ShopProductDetail from '../screens/productDetailForCustomer/ProductDetailForCustomer';
import ShopForCustomer from '../screens/shopForCustomer/ShopForCustomer';
import Cart from '../screens/cart/Cart';
import Checkout from '../screens/checkout/Checkout';
import AddLocation from '../screens/addLocation/AddLocation';
import MyWishlist from '../screens/wishlist/MyWishlist';



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
      <Stack.Screen name="MyWishlist" component={MyWishlist} />
      <Stack.Screen
        name="ProductDetailForCustomer"
        component={ShopProductDetail}
      />
      <Stack.Screen name="ShopForCustomer" component={ShopForCustomer} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="AddLocation" component={AddLocation} />
    </Stack.Navigator>
  );
}
