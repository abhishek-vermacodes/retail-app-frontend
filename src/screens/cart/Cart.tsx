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
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

import styles from './cart.styles';
import { useCart } from '../../context/CartContext';

function Cart() {
  const navigation = useNavigation<any>();
  const { cartItems, increaseQty, decreaseQty, removeItem } = useCart();

  const renderRightActions = (id: string) => {
    return (
      <Pressable onPress={() => removeItem(id)} style={styles.deleteAnimation}>
        <MaterialIcons name="delete-outline" size={28} color={'#dc3545'} />
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

      {/* Header bar */}
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
        {/* Cart Item Cards list */}
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
              {/* Product Thumbnail with warm background */}
              <View style={styles.productImageContainer}>
                <Image
                  source={{ uri: `http://192.168.1.4:3000${item.image}` }}
                  style={styles.productImage}
                />
              </View>

              {/* Product details */}
              <View style={styles.productInfo}>
                <Text style={styles.productName} numberOfLines={1}>
                  {item.productName}
                </Text>

                <Text style={styles.productPrice}>₹{item.price.toFixed(2)}</Text>

                {/* Unified Quantity Capsule Selector */}
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

              {/* Direct Card Trash can button */}
              <TouchableOpacity
                style={styles.cardTrashBtn}
                onPress={() => removeItem(item.id)}
              >
                <Ionicons name="trash-outline" size={18} color="#999" />
              </TouchableOpacity>
            </View>
          </Swipeable>
        ))}

        {/* Empty Landing View illustration */}
        {cartItems.length === 0 && (
          <View style={styles.emptyCartContainer}>
            <View style={styles.emptyIconWrapper}>
              <Ionicons name="bag-handle-outline" size={48} color="#ff5b27" />
            </View>
            <Text style={styles.emptyCartText}>Your Cart is Empty</Text>
            <Text style={styles.emptyCartSubtext}>
              Looks like you haven't added anything yet. Go back and discover some products!
            </Text>
            <TouchableOpacity
              style={styles.startShoppingBtn}
              onPress={() => navigation.navigate('CustomerHome')}
            >
              <Text style={styles.startShoppingText}>Start Shopping</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Bill Billing card */}
        {cartItems.length > 0 && (
          <View style={styles.summaryCard}>
            <View style={styles.row}>
              <Text style={styles.label}>Subtotal</Text>
              <Text style={styles.value}>₹{subtotal.toFixed(2)}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Delivery Fee</Text>
              <Text style={styles.value}>₹{deliveryFee.toFixed(2)}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.row}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>₹{total.toFixed(2)}</Text>
            </View>

            <TouchableOpacity
              style={styles.checkoutBtn}
              onPress={() => navigation.navigate('Checkout')}
            >
              <Text style={styles.checkoutText}>Checkout</Text>
              <FontAwesome6 name="arrow-right" size={14} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

export default Cart;
