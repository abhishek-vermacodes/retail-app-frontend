import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Image,
  StatusBar,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import styles from './userOrders.styles';
import API, { API_BASE_URL } from '../../api/authApi';
import { getToken } from '../../utils/storage';

const UserOrders = () => {
  const navigation = useNavigation<any>();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchOrders = async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      const token = await getToken();
      const response = await API.get('/api/order/customer', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(response.data.orders || []);
    } catch (error) {
      console.log('Failed to fetch user orders:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusBadgeStyle = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'placed':
        return { bg: '#e3f2fd', text: '#0d47a1' };
      case 'accepted':
        return { bg: '#efebe9', text: '#5d4037' };
      case 'shipped':
        return { bg: '#fff8e1', text: '#f57f17' };
      case 'delivered':
        return { bg: '#e8f5e9', text: '#1b5e20' };
      case 'cancelled':
        return { bg: '#ffebee', text: '#b71c1c' };
      default:
        return { bg: '#f5f5f5', text: '#616161' };
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const renderOrderItem = ({ item: order }: { item: any }) => {
    const badge = getStatusBadgeStyle(order.status);
    return (
      <View style={styles.orderCard}>
        <View style={styles.orderHeader}>
          <Text style={styles.orderDate}>{formatDate(order.createdAt)}</Text>
          <View style={[styles.statusBadge, { backgroundColor: badge.bg }]}>
            <Text style={[styles.statusText, { color: badge.text }]}>
              {order.status}
            </Text>
          </View>
        </View>

        <View style={styles.storeSection}>
          <Ionicons name="storefront-outline" size={16} color="#ff5b27" />
          <Text style={styles.storeName}>
            {order.store?.storeName || 'Store'}
          </Text>
        </View>

        <View style={styles.divider} />

        <View>
          {order.items?.map((item: any) => (
            <View key={item.id} style={styles.itemRow}>
              <View style={styles.itemImageContainer}>
                {item.product?.image ? (
                  <Image
                    source={{ uri: `${API_BASE_URL}${item.product.image}` }}
                    style={styles.itemImage}
                  />
                ) : (
                  <Ionicons name="image-outline" size={20} color="#ccc" />
                )}
              </View>
              <View style={styles.itemDetails}>
                <Text style={styles.itemName} numberOfLines={1}>
                  {item.product?.productName || 'Product'}
                </Text>
                <Text style={styles.itemQtyPrice}>
                  {item.quantity} x ₹{Number(item.price || 0).toFixed(2)}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.divider} />

        <View style={styles.orderFooter}>
          <Text style={styles.paymentMethod}>{order.paymentMethod}</Text>
          <View style={styles.totalSection}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalAmount}>
              ₹{Number(order.totalAmount || 0).toFixed(2)}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyStateContainer}>
      <View style={styles.emptyIconWrapper}>
        <Ionicons name="bag-handle-outline" size={48} color="#ff5b27" />
      </View>
      <Text style={styles.emptyStateTitle}>No Orders Yet</Text>
      <Text style={styles.emptyStateSubtitle}>
        Looks like you haven't placed any orders yet. Explore our products and order something delicious or useful!
      </Text>
      <TouchableOpacity
        style={styles.shopNowBtn}
        onPress={() => navigation.navigate('CustomerHome')}
      >
        <Text style={styles.shopNowText}>Shop Now</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={18} color="#000" />
        </TouchableOpacity>

        <Text style={styles.pageTitle}>My Orders</Text>

        <TouchableOpacity style={styles.likeButton}>
          <Entypo name="dots-three-vertical" size={18} />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#ff5b27" />
          <Text style={styles.loaderText}>Loading your orders...</Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={renderOrderItem}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderEmptyState}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => fetchOrders(true)}
              colors={['#ff5b27']}
              tintColor="#ff5b27"
            />
          }
        />
      )}
    </View>
  );
};

export default UserOrders;
