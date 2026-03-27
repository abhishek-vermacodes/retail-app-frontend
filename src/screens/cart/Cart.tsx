import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Pressable,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import { Swipeable } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './cart.styles';
import { useCart } from '../../context/CartContext';


function Cart() {
  const navigation = useNavigation<any>();

  const { cartItems, increaseQty, decreaseQty, removeItem } = useCart();

  const renderRightActions = (id: string) => {
    return (
      <Pressable onPress={() => removeItem(id)} style={styles.deleteAnimation}>
        <MaterialIcons name="delete-outline" size={30} color={'#fff'} />
      </Pressable>
    );
  };

  const deliveryFee = 10;

  const subtotal = cartItems.reduce(
    (sum: number, item: any) => sum + (item.price || 0) * (item.quantity || 1),
    0,
  );

  const total = subtotal + deliveryFee;

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={18} color="#000" />
        </TouchableOpacity>

        <Text style={styles.pageTitle}>My Cart</Text>
        <TouchableOpacity style={styles.likeButton}>
          <Entypo name="dots-three-vertical" size={18} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewStyle}
      >
        {cartItems.map((item: any) => (
          <Swipeable
            key={item.id}
            renderRightActions={() => renderRightActions(item.id)}
            onSwipeableOpen={() => removeItem(item.id)}
            friction={4}
            rightThreshold={60}
            overshootRight={false}
          >
            <View style={styles.cartCard}>
              <View style={styles.productImageContainer}>
                <Image
                  source={{ uri: `http://192.168.1.15:5000${item.image}` }}
                  style={styles.productImage}
                />
              </View>

              <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.productName}</Text>

                <Text style={styles.productPrice}>₹{item.price}</Text>

                <View style={styles.qtyRow}>
                  <TouchableOpacity
                    onPress={() => decreaseQty(item.id)}
                    style={styles.qtyBtn}
                  >
                    <Text style={styles.qtyText}>-</Text>
                  </TouchableOpacity>

                  <Text style={styles.qtyValue}>{item.quantity}</Text>

                  <TouchableOpacity
                    onPress={() => increaseQty(item.id)}
                    style={styles.qtyBtn}
                  >
                    <Text style={styles.qtyText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Swipeable>
        ))}

        {cartItems.length === 0 && (
          <View style={styles.emptyCartContainer}>
            <Text style={styles.emptyCartText}>Your cart is empty 🛒</Text>
          </View>
        )}

        {cartItems.length > 0 && (
          <View style={styles.summaryCard}>
            <View style={styles.row}>
              <Text style={styles.label}>Subtotal</Text>
              <Text style={styles.value}>₹{subtotal.toFixed(2)}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Delivery</Text>
              <Text style={styles.value}>₹{deliveryFee.toFixed(2)}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.row}>
              <Text style={styles.total}>Total</Text>
              <Text style={styles.total}>₹{total.toFixed(2)}</Text>
            </View>

            <TouchableOpacity
              style={styles.checkoutBtn}
              onPress={() => navigation.navigate('Checkout')}
            >
              <Text style={styles.checkoutText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

export default Cart;
