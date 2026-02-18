import { NavigationContainer } from '@react-navigation/native';
import { useContext } from 'react';

import { ActivityIndicator, StyleSheet, View } from 'react-native';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddLocation from '../screens/AddLocation';
import { AuthContext } from '../context/AuthContext';
import SigninScreen from '../screens/SigninScreen';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const { user, loading } = useContext(AuthContext);
  console.log('user on root', user);


  if (loading) {
    return (
      <View style={styles.LoadingContainer}>
        <ActivityIndicator size={'large'} color={'#ff5b27'} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {!user ? (
        <AuthNavigator />
      ) : !user.address ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="AddLocation" component={AddLocation} />
          <Stack.Screen name="Signin" component={SigninScreen} />
        </Stack.Navigator>
      ) : (
        <AppNavigator />
      )}
    </NavigationContainer>
  );
};

export default RootNavigator;

const styles = StyleSheet.create({
  LoadingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});
