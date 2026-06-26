import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  StatusBar,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import styles from './Checkout.styles';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import RazorpayCheckout from 'react-native-razorpay';

import { AuthContext } from '../../context/AuthContext';
import { getCartItem } from '../../utils/storage';
import { useCart } from '../../context/CartContext';

const API_URL = 'http://192.168.1.4:3000/api/payment';

const Checkout = () => {
  const navigation = useNavigation<any>();
  const { user } = useContext(AuthContext);
  const { clearCart } = useCart();

  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const address = user?.address || 'No address selected';
  const shortAddress = address.split(',')[0];

  const loadCart = async () => {
    const data = await getCartItem();
    if (data) {
      setCartItems(data);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * (item.quantity || 1),
    0,
  );

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      return Alert.alert('Cart is empty');
    }

    try {
      setLoading(true);

      const orderRes = await fetch(`${API_URL}/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: total * 100,
          userId: user?.id,
          cartItems: cartItems.map(item => ({
            id: item.id,
            price: Number(item.price),
            quantity: item.quantity || 1,
          })),
        }),
      });

      const order = await orderRes.json();

      if (!order?.id) {
        throw new Error(order?.error || 'Order creation failed');
      }

      const options = {
        key: order.key_id,
        amount: order.amount,
        currency: 'INR',
        name: 'Retail App',
        description: 'Order Payment',
        order_id: order.id,
        prefill: {
          name: user?.username || 'Guest',
          email: user?.email || 'test@email.com',
        },
        theme: { color: '#ff5b27' },
      };

      const paymentData = await RazorpayCheckout.open(options);

      const verifyRes = await fetch(`${API_URL}/verify-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          razorpay_order_id: paymentData.razorpay_order_id,
          razorpay_payment_id: paymentData.razorpay_payment_id,
          razorpay_signature: paymentData.razorpay_signature,
        }),
      });

      const verifyResult = await verifyRes.json();

      if (verifyResult.success) {
        Alert.alert('Success', 'Payment successful 🎉');

        setCartItems([]);
        await clearCart();

        navigation.navigate('OrderSuccess');
      } else {
        throw new Error(verifyResult?.error || 'Payment verification failed');
      }
    } catch (error: any) {
      console.log('Payment Error:', error);

      if (error?.description) {
        Alert.alert('Payment Failed', error.description);
      } else {
        Alert.alert('Error', error?.message || 'Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" />

      {/* Header bar */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Ionicons name="arrow-back" size={18} color="#000" />
        </TouchableOpacity>

        <Text style={styles.pageTitle}>Checkout</Text>

        <TouchableOpacity style={styles.likeButton}>
          <Entypo name="dots-three-vertical" size={18} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewStyle}
      >
        {/* Card 1: Deliver Address info */}
        <View style={styles.card}>
          <View style={styles.itemRow}>
            <View style={styles.addressHeader}>
              <Ionicons name="location" size={18} color="#ff5b27" />
              <Text style={styles.sectionTitle}>Deliver to</Text>
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate('CustomerHome')}
            >
              <Text style={styles.changeText}>Change</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.addressName}>
            {user?.username} • {shortAddress}
          </Text>

          <Text style={styles.addressText}>{address}</Text>
        </View>

        {/* Card 2: Order Items Summary Checklist */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.divider} />

          {cartItems.length === 0 ? (
            <Text style={styles.addressText}>No items in cart</Text>
          ) : (
            cartItems.map((item, index) => (
              <View key={item.id}>
                <View style={styles.itemRow}>
                  <View style={styles.productImageContainer}>
                    <Image
                      source={{ uri: `http://192.168.1.4:3000${item.image}` }}
                      style={styles.productImage}
                    />
                  </View>

                  <View style={styles.itemDetails}>
                    <Text style={styles.itemName} numberOfLines={1}>
                      {item.productName}
                    </Text>
                    <Text style={styles.itemQty}>Qty: {item.quantity || 1}</Text>
                  </View>

                  <Text style={styles.itemPrice}>
                    ₹{(Number(item.price) * (item.quantity || 1)).toFixed(2)}
                  </Text>
                </View>
                {index < cartItems.length - 1 && <View style={styles.divider} />}
              </View>
            ))
          )}
        </View>

        {/* Card 3: Price Billings Details */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Price Details</Text>
          <View style={styles.divider} />

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Price ({cartItems.length} items)</Text>
            <Text style={styles.priceValue}>₹{total.toFixed(2)}</Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Delivery Charges</Text>
            <Text style={styles.freeText}>FREE</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.priceRow}>
            <Text style={styles.totalText}>Total Amount</Text>
            <Text style={styles.totalValueText}>₹{total.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Payment Bar Panel */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalAmount}>₹{total.toFixed(2)}</Text>
        </View>

        <TouchableOpacity
          style={styles.payBtn}
          onPress={handlePlaceOrder}
          disabled={loading}
        >
          <Text style={styles.payText}>
            {loading ? 'Processing...' : 'Place Order'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Checkout;