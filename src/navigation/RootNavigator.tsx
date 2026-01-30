import { NavigationContainer } from '@react-navigation/native';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';

const RootNavigator = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={styles.LoadingContainer}>
        <ActivityIndicator size="large" color={'#ff5b27'} />
      </View>
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
