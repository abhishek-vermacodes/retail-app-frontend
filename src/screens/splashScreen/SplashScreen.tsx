import Icon from 'react-native-vector-icons/FontAwesome6';

import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar, Text, View } from 'react-native';
import styles from './splash.styles';

const SplashScreen = () => {
  const navigation = useNavigation<any>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Intro');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <View style={styles.iconWrapper}>
        <Icon name="cart-shopping" color={'white'} size={34} />
      </View>
      <Text style={styles.title}>Retail Pro</Text>
      <Text style={styles.subtitle} numberOfLines={3}>
        Manage inventory, tract sales, and grow your retail business in one
        place.
      </Text>
    </View>
  );
};

export default SplashScreen;
