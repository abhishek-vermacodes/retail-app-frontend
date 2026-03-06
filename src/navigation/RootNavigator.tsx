import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import Signin from '../screens/signIn/Signin';
import AddLocation from '../screens/addLocation/AddLocation';

import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const { user, loading } = useContext(AuthContext);

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
          <Stack.Screen name="Signin" component={Signin} />
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
