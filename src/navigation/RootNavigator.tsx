import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import SplashScreen from '../screens/SplashScreen';
// import IntroScreen from '../screens/IntroScreen';
// import SignupScreen from '../screens/SignupScreen';
// import SigninScreen from '../screens/SigninScreen';
// import VerificationScreen from '../screens/Verification';
// import ForgotPasswordScreen from '../screens/ForgotPassword';
// import CreateShopScreen from '../screens/CreateShop';
// import RetailerHomeScreen from '../screens/RetailerHome';
// import MyShopScreen from '../screens/MyShop';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ActivityIndicator, View } from 'react-native';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';

// const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <NavigationContainer>
      {/* <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Intro" component={IntroScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Signin" component={SigninScreen} />
        <Stack.Screen name="Verification" component={VerificationScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="RetailerHome" component={RetailerHomeScreen} />
        <Stack.Screen name="CreateShop" component={CreateShopScreen} />
        <Stack.Screen name="MyShop" component={MyShopScreen} />
      </Stack.Navigator> */}
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;
