import RazorpayCheckout from 'react-native-razorpay';
import { Alert } from 'react-native';

const API_URL = 'http://192.168.1.15:5000/api/payment';

export const startPayment = async ({
  amount,
  user,
}: {
  amount: number;
  user: {
    name: string;
    email: string;
    contact: string;
  };
}) => {
  try {
    // 🔹 1. Create Order from Backend
    const orderRes = await fetch(`${API_URL}/create-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
    });

    const order = await orderRes.json();

    if (!order?.id) {
      throw new Error('Order creation failed');
    }

    // 🔹 2. Open Razorpay Checkout
    const options = {
      key: 'RAZORPAY_KEY_ID', // 🔴 replace
      amount: order.amount,
      currency: 'INR',
      name: 'Retail App',
      description: 'Order Payment',
      order_id: order.id,
      prefill: {
        name: user.name,
        email: user.email,
        contact: user.contact,
      },
      theme: { color: '#3399cc' },
    };

    const paymentData = await RazorpayCheckout.open(options);

    // 🔹 3. Verify Payment (IMPORTANT)
    const verifyRes = await fetch(`${API_URL}/verify-payment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(paymentData),
    });

    const verifyResult = await verifyRes.json();

    if (verifyResult.success) {
      Alert.alert('Success', 'Payment successful 🎉');
      return { success: true };
    } else {
      throw new Error('Verification failed');
    }
  } catch (error: any) {
    console.log('Payment Error:', error);

    // 🔻 Razorpay failure
    if (error?.description) {
      Alert.alert('Payment Failed', error.description);
    } else {
      Alert.alert('Error', 'Something went wrong');
    }

    return { success: false };
  }
};
