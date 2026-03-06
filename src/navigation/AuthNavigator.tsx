import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AddLocation from '../screens/addLocation/AddLocation';
import Splash from '../screens/splashScreen/Splash';
import Intro from '../screens/intro/Intro';
import Signup from '../screens/signUp/Signup';
import Signin from '../screens/signIn/Signin';
import Verification from '../screens/verification/Verification';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Intro" component={Intro} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Signin" component={Signin} />
      {/* <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} /> */}
      <Stack.Screen name="Verification" component={Verification} />
      <Stack.Screen name="AddLocation" component={AddLocation} />
    </Stack.Navigator>
  );
}
