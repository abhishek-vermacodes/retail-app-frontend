import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import React, { useEffect, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { orderCategories } from '../../types/type';
import styles from './orders.styles';
import API, { API_BASE_URL } from '../../api/authApi';
import { getToken } from '../../utils/storage';

const Orders = () => {
  const navigation = useNavigation<any>();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectStatus, setSelectedStatus] = useState('');

  const fetchOrders = async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      const token = await getToken();
      const response = await API.get('/api/order/store', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(response.data.orders || []);
    } catch (error) {
      console.log('Failed to fetch store orders:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (orderId: string, action: 'accept' | 'ship' | 'deliver') => {
    try {
      const token = await getToken();
      const response = await API.patch(
        `/api/order/${orderId}/${action}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      Alert.alert('Success', response.data.message || `Order successfully updated.`);
      fetchOrders();
    } catch (error: any) {
      console.log(`Failed to ${action} order:`, error);
      Alert.alert('Error', error?.response?.data?.message || `Failed to update order.`);
    }
  };

  const filteredOrders = useMemo(() => {
    return orders?.filter(order => {
      const matchCategory = !selectStatus || order.status === selectStatus;

      const matchSearch =
        !searchQuery.trim() ||
        order.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (order.customer?.username || '').toLowerCase().includes(searchQuery.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [orders, selectStatus, searchQuery]);

  const getStatusStyle = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'placed':
        return { backgroundColor: '#FFE8D9', color: '#FF5B27', text: 'New Order' };
      case 'accepted':
        return { backgroundColor: '#FFF4CC', color: '#E6A700', text: 'Preparing' };
      case 'shipped':
        return { backgroundColor: '#E0F2FF', color: '#007BFF', text: 'Out for Delivery' };
      case 'delivered':
        return { backgroundColor: '#DFFFE0', color: '#28A745', text: 'Completed' };
      case 'cancelled':
        return { backgroundColor: '#FFEBEB', color: '#FF3B30', text: 'Cancelled' };
      default:
        return { backgroundColor: '#EEE', color: '#555', text: status };
    }
  };

  const getShortId = (id: string) => {
    if (!id) return '';
    return id.substring(0, 8).toUpperCase();
  };

  const getRelativeTime = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      if (diffMins < 1) return 'Just now';
      if (diffMins < 60) return `${diffMins}m ago`;
      const diffHours = Math.floor(diffMins / 60);
      if (diffHours < 24) return `${diffHours}h ago`;
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch {
      return '';
    }
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle={'dark-content'} />
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={18} color="#000" />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Orders</Text>
        <Feather
          name="search"
          size={22}
          color={'#000'}
          style={styles.searchBtn}
          onPress={() => setIsVisible(prev => !prev)}
        />
      </View>

      {isVisible && (
        <View style={styles.searchContainer}>
          <Feather name="search" color={'#000000a3'} size={20} />
          <TextInput
            placeholder="Search for Products..."
            placeholderTextColor={'#000000a3'}
            style={styles.searchText}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      )}

      <View>
        <FlatList
          data={orderCategories}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryContainer}
          renderItem={({ item }) => {
            const isActive = selectStatus === item.value;

            return (
              <TouchableOpacity
                onPress={() => setSelectedStatus(item.value)}
                style={[
                  styles.categoryBtn,
                  isActive && styles.categoryBtnActive,
                ]}
              >
                <Text
                  style={[
                    styles.categoryText,
                    isActive && styles.categoryTextActive,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {loading ? (
        <View style={styles.noDataContainer}>
          <ActivityIndicator size="large" color="#ff5b27" />
          <Text style={[styles.noDataText, { marginTop: 10 }]}>Loading orders...</Text>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => fetchOrders(true)}
              colors={['#ff5b27']}
              tintColor="#ff5b27"
            />
          }
        >
          <View style={styles.orderContainer}>
            {filteredOrders.length === 0 ? (
              <View style={styles.noDataContainer}>
                <Text style={styles.noDataText}>No Orders Found</Text>
              </View>
            ) : (
              filteredOrders.map(order => {
                const statusStyle = getStatusStyle(order.status);
                const itemsCount = order.items?.reduce((sum: number, it: any) => sum + (it.quantity || 1), 0) || 0;
                return (
                  <View style={styles.orderCardContainer} key={order.id}>
                    <View style={styles.orderCardSubContainer}>
                      <View style={styles.cardHeader}>
                        <Text style={styles.cardHeaderTitle}>
                          Order #{getShortId(order.id)}
                        </Text>
                        <Text style={styles.cardHeaderTime}>
                          {getRelativeTime(order.createdAt)}
                        </Text>
                      </View>

                      <View style={styles.cardProfileContainer}>
                        <View style={styles.cardProfile}>
                          <View style={styles.cardAvatarContainer}>
                            <Image
                              source={{
                                uri: `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                  order.customer?.username || 'User',
                                )}&background=ffe7dd&color=ff5b27&bold=true`,
                              }}
                              style={styles.cardAvatar}
                            />
                          </View>
                          <View>
                            <Text style={styles.profileName}>
                              {order.customer?.username || 'Customer'}
                            </Text>
                            <Text style={styles.items}>
                              {itemsCount} {itemsCount === 1 ? 'item' : 'items'}{' '}
                              <Entypo name="dot-single" size={10} color={'#aaa'} />{' '}
                              {order.paymentMethod?.toUpperCase() || 'COD'}
                            </Text>
                          </View>
                        </View>
                        <FontAwesome name="angle-right" size={22} color="#ff5b27" />
                      </View>
                    </View>

                    <View style={styles.line} />

                    <View style={styles.itemsList}>
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

                    <View style={styles.line} />

                    <View style={styles.cardFooter}>
                      <View
                        style={[
                          styles.orderStatusBadge,
                          {
                            backgroundColor: statusStyle.backgroundColor,
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.orderStatus,
                            {
                              color: statusStyle.color,
                            },
                          ]}
                        >
                          {statusStyle.text}
                        </Text>
                      </View>
                      <Text style={styles.price}>₹{Number(order.totalAmount || 0).toFixed(2)}</Text>
                    </View>

                    {['placed', 'accepted', 'shipped'].includes(order.status) && (
                      <>
                        <View style={styles.line} />
                        <View style={styles.actionContainer}>
                          <TouchableOpacity
                            style={styles.actionBtn}
                            onPress={() =>
                              handleUpdateStatus(
                                order.id,
                                order.status === 'placed'
                                  ? 'accept'
                                  : order.status === 'accepted'
                                  ? 'ship'
                                  : 'deliver',
                              )
                            }
                          >
                            <Text style={styles.actionBtnText}>
                              {order.status === 'placed'
                                ? 'Accept Order'
                                : order.status === 'accepted'
                                ? 'Ship Order'
                                : 'Deliver Order'}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </>
                    )}
                  </View>
                );
              })
            )}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default Orders;
