import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RetailerBottomTabNavigator from './RetailerBottomTabNavigator';
import CreateShop from '../screens/CreateShop';
import MyProducts from '../screens/MyProducts';
import MyProduct from '../screens/MyProduct';
import RetailerHelpScreen from '../screens/RetailerHelpScreen';

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
    </Stack.Navigator>
  );
}
