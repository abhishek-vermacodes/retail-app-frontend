import { NavigationContainer } from '@react-navigation/native';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddLocation from '../screens/AddLocation';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={styles.LoadingContainer}>
        <ActivityIndicator size="large" color={'#ff5b27'} />
      </View>
    );
  }

  if (user?.address === null) {
    return (
      <Stack.Navigator>
        <Stack.Screen name="AddLocation" component={AddLocation} />
      </Stack.Navigator>
    );
  }
  return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <AuthNavigator />}
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
