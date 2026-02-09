import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, { useState } from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import CartItem from '../components/CartItem';

const initialCart = [
  {
    id: '1',
    name: 'Fresh Red Apple (1kg)',
    price: 3.5,
    quantity: 1,
    image: require('../assets/images/bag.jpeg'),
  },
  {
    id: '2',
    name: 'Organic Whole Milk',
    price: 1.2,
    quantity: 2,
    image: require('../assets/images/bag.jpeg'),
  },
  {
    id: '3',
    name: 'Organic Whole Milk',
    price: 1.2,
    quantity: 2,
    image: require('../assets/images/bag.jpeg'),
  },
  {
    id: '4',
    name: 'Organic Whole Milk',
    price: 1.2,
    quantity: 2,
    image: require('../assets/images/bag.jpeg'),
  },
  {
    id: '5',
    name: 'Organic Whole Milk',
    price: 1.2,
    quantity: 2,
    image: require('../assets/images/bag.jpeg'),
  },
  {
    id: '6',
    name: 'Organic Whole Milk',
    price: 1.2,
    quantity: 2,
    image: require('../assets/images/bag.jpeg'),
  },
];

function CartScreen() {
  const navigation = useNavigation<any>();
  const [cartItems, setCartItems] = useState(initialCart);

  const increaseQty = (id: string) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decreaseQty = (id: string) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  const deleteItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const deliveryFee = 1.0;
  const total = subtotal + deliveryFee;

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome6 name="arrow-left" size={18} color="#000" />
        </TouchableOpacity>

        <Text style={styles.pageTitle}>My Cart</Text>

        <Entypo
          name="dots-three-vertical"
          size={22}
          color="#000"
          style={styles.menuBtn}
        />
      </View>

      <ScrollView
        style={styles.scrollWrapper}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewStyle}
      >
        {cartItems.map(item => (
          <CartItem
            key={item.id}
            image={item.image}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            onIncrease={() => increaseQty(item.id)}
            onDecrease={() => decreaseQty(item.id)}
            onDelete={() => deleteItem(item.id)}
          />
        ))}

      
        <View style={styles.summaryCard}>
          <View style={styles.row}>
            <Text style={styles.label}>Subtotal</Text>
            <Text style={styles.value}>${subtotal.toFixed(2)}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Delivery</Text>
            <Text style={styles.value}>${deliveryFee.toFixed(2)}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.total}>Total</Text>
            <Text style={styles.total}>${total.toFixed(2)}</Text>
          </View>

          <TouchableOpacity style={styles.checkoutBtn}>
            <Text style={styles.checkoutText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

export default CartScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff5f0',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginBottom: 10,
    position: 'relative',
  },
  backBtn: {
    borderColor: '#000000a3',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 50,
  },
  pageTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#000',
  },
  menuBtn: {
    position: 'absolute',
    right: 0,
  },

  itemContainer: {
    height: '50%',
  },
  summaryCard: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ffe3d9',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#444',
  },
  value: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 12,
  },
  total: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
  checkoutBtn: {
    backgroundColor: '#ff5b27',
    marginTop: 16,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  scrollWrapper: {
    height: '54%',
  },
  scrollViewStyle: {
    paddingBottom: 200
  }
});
