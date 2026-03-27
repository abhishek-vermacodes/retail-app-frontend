import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { responsive } from '../theme/responsive';
import { useCart } from '../context/CartContext';

const screenWidth = Dimensions.get('screen').width;

const CustomTabBar = ({ state, navigation, role }: any) => {

  const { cartItems } = useCart();


  const cartCount = cartItems.reduce(
    (sum: number, item: any) => sum + (item.quantity || 1),
    0,
  );

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {state.routes.map((route: any, index: number) => {
          const isFocused = state.index === index;
          const onPress = () => navigation.navigate(route.name);
          const color = isFocused ? '#ff5b27' : '#888';

          if (role === 'retailer' && route.name === 'Center') {
            return (
              <TouchableOpacity
                key={index}
                onPress={onPress}
                style={styles.centerButton}
                activeOpacity={0.8}
              >
                <Feather name="plus" size={24} color="#fff" />
              </TouchableOpacity>
            );
          }

          const renderIcon = () => {
            if (route.name === 'Home')
              return <Icon name="home-outline" size={20} color={color} />;

            if (route.name === 'Products')
              return <Feather name="box" size={20} color={color} />;

            if (route.name === 'Cart')
              return (
                <View>
                  <Feather name="shopping-cart" size={20} color={color} />

                  {cartCount > 0 && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>
                        {cartCount > 99 ? '99+' : cartCount}
                      </Text>
                    </View>
                  )}
                </View>
              );

            if (route.name === 'Orders')
              return <Feather name="package" size={20} color={color} />;

            if (route.name === 'Profile')
              return <Icon name="person-outline" size={20} color={color} />;

            return null;
          };

          return (
            <TouchableOpacity key={index} onPress={onPress} style={styles.tab}>
              {renderIcon()}
              {isFocused && <Text style={styles.label}>{route.name}</Text>}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default CustomTabBar;

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
  },
  container: {
    marginHorizontal: 12,
    paddingHorizontal:
      screenWidth > 500
        ? responsive.paddingHorizontal(20)
        : responsive.paddingHorizontal(10),
    flexDirection: 'row',
    backgroundColor: '#ffe3d9',
    height: 80,
    gap: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    borderRadius: 50,
    borderColor: '#ff59275a',
    borderWidth: 1,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  label: {
    color: '#ff5b27',
    fontSize: 10,
    marginTop: 2,
    fontFamily: 'Poppins-Regular',
  },
  centerButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff5b27',
    width: 60,
    height: 60,
    borderRadius: 32,
    shadowColor: '#ff5b27',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 12,
  },

  // 🔥 Badge
  badge: {
    position: 'absolute',
    top: -6,
    right: -10,
    backgroundColor: '#ff5b27',
    borderRadius: 10,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
