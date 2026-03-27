

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import styles from './Checkout.styles';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import RazorpayCheckout from 'react-native-razorpay';

import { AuthContext } from '../../context/AuthContext';
import { getCartItem, clearCart } from '../../utils/storage';

const API_URL = 'http://192.168.1.15:5000/api/payment'; 

const Checkout = () => {
  const navigation = useNavigation<any>();
  const { user } = useContext(AuthContext);

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
          // contact: user?.phone || '9999999999',
        },
        theme: { color: '#3399cc' },
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

        <View style={styles.card}>
          <View style={styles.itemRow}>
            <Text style={styles.sectionTitle}>Deliver to</Text>

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

      
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Order Summary</Text>

          {cartItems.length === 0 ? (
            <Text>No items in cart</Text>
          ) : (
            cartItems.map(item => (
              <View key={item.id} style={styles.itemRow}>
                <View style={styles.productImageContainer}>
                  <Image
                    source={{ uri: `http://192.168.1.15:5000${item.image}` }}
                    style={styles.productImage}
                  />
                </View>

                <Text style={styles.itemName}>{item.productName}</Text>

                <Text style={styles.itemQty}>Qty: {item.quantity || 1}</Text>

                <Text style={styles.itemPrice}>
                  ₹{Number(item.price) * (item.quantity || 1)}
                </Text>
              </View>
            ))
          )}
        </View>

    
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Price Details</Text>

          <View style={styles.priceRow}>
            <Text>Price</Text>
            <Text>₹{total}</Text>
          </View>

          <View style={styles.priceRow}>
            <Text>Delivery Charges</Text>
            <Text style={{ color: 'green' }}>FREE</Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.totalText}>Total Amount</Text>
            <Text style={styles.totalText}>₹{total}</Text>
          </View>
        </View>
      </ScrollView>

    
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalAmount}>₹{total}</Text>
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