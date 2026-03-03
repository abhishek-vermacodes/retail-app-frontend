import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RetailerBottomTabNavigator from './RetailerBottomTabNavigator';
import CreateShop from '../screens/createShop/CreateShop';
import MyProducts from '../screens/storeProducts/StoreProducts';
import MyProduct from '../screens/storeProductDetail/StoreProductDetail';
import RetailerHelpScreen from '../screens/retailerHelpScreen/RetailerHelpScreen';
import StoreProductDetail from '../screens/storeProductDetail/StoreProductDetail';

const Stack = createNativeStackNavigator();

export default function RetailerNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="RetailerHome"
        component={RetailerBottomTabNavigator}
      />
      <Stack.Screen name="CreateShop" component={CreateShop} />
      <Stack.Screen name="MyProducts" component={MyProducts} />
      <Stack.Screen name="MyProduct" component={MyProduct} />
      <Stack.Screen name="HelpCenter" component={RetailerHelpScreen} />
      <Stack.Screen name="StoreProductDetail" component={StoreProductDetail} />
    </Stack.Navigator>
  );
}
