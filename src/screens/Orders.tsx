import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import React, { useMemo, useState } from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';

const categories = [
  { label: 'All', value: '' },
  { label: 'New Order', value: 'New Order' },
  { label: 'Preparing', value: 'Preparing' },
  { label: 'Out for Delivery', value: 'Out for Delivery' },
  { label: 'Completed', value: 'Completed' },
];

const orders = [
  {
    id: 2841,
    time: '2m ago',
    customer: {
      name: 'Priya Sharma',
      avatar: 'https://i.pravatar.cc/150?img=32',
    },
    itemsCount: 3,
    orderType: 'Delivery',
    status: 'New Order',
    totalPrice: 150.0,
  },
  {
    id: 2842,
    time: '5m ago',
    customer: {
      name: 'Rahul Verma',
      avatar: 'https://i.pravatar.cc/150?img=12',
    },
    itemsCount: 2,
    orderType: 'Pickup',
    status: 'Preparing',
    totalPrice: 320.0,
  },
  {
    id: 2843,
    time: '10m ago',
    customer: {
      name: 'Anjali Singh',
      avatar: 'https://i.pravatar.cc/150?img=45',
    },
    itemsCount: 5,
    orderType: 'Delivery',
    status: 'Out for Delivery',
    totalPrice: 540.0,
  },
  {
    id: 2844,
    time: '15m ago',
    customer: {
      name: 'Vikas Patel',
      avatar: 'https://i.pravatar.cc/150?img=22',
    },
    itemsCount: 1,
    orderType: 'Pickup',
    status: 'Completed',
    totalPrice: 80.0,
  },
  {
    id: 2845,
    time: '20m ago',
    customer: {
      name: 'Neha Gupta',
      avatar: 'https://i.pravatar.cc/150?img=30',
    },
    itemsCount: 4,
    orderType: 'Delivery',
    status: 'New Order',
    totalPrice: 260.0,
  },
];

const OrdersScreen = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigation = useNavigation<any>();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectStatus, setSelectedStatus] = useState('');

  const filteredProducts = useMemo(() => {
    return orders?.filter(order => {
      const matchCategory = !selectStatus || order.status === selectStatus;

      const matchSearch =
        !searchQuery.trim() ||
        order.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [selectStatus, searchQuery]);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'New Order':
        return { backgroundColor: '#FFE8D9', color: '#FF5B27' };

      case 'Preparing':
        return { backgroundColor: '#FFF4CC', color: '#E6A700' };

      case 'Out for Delivery':
        return { backgroundColor: '#E0F2FF', color: '#007BFF' };

      case 'Completed':
        return { backgroundColor: '#DFFFE0', color: '#28A745' };

      default:
        return { backgroundColor: '#EEE', color: '#555' };
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
          <FontAwesome6 name="arrow-left" size={18} color="#000000" />
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
          data={categories}
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

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
      >
        <View style={styles.orderContainer}>
          {filteredProducts.length === 0 ? (
            <View style={styles.noDataContainer}>
              <Text style={styles.noDataText}>No Orders Found</Text>
            </View>
          ) : (
            filteredProducts.map(order => (
              <View style={styles.orderCardContainer} key={order.id}>
                <View style={styles.orderCardSubContainer}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardHeaderTitle}>
                      Order #{order.id}
                    </Text>
                    <Text style={styles.cardHeaderTime}>{order.time}</Text>
                  </View>

                  <View style={styles.cardProfileContainer}>
                    <View style={styles.cardProfile}>
                      <View style={styles.cardAvatarContainer}>
                        <Image
                          source={{ uri: `${order.customer.avatar}` }}
                          style={styles.cardAvatar}
                        />
                      </View>
                      <View>
                        <Text style={styles.profileName}>
                          {order.customer.name}
                        </Text>
                        <Text style={styles.items}>
                          {order.itemsCount} item{' '}
                          <Entypo name="dot-single" size={10} color={'#aaa'} />{' '}
                          {order.orderType}
                        </Text>
                      </View>
                    </View>
                    <FontAwesome name="angle-right" size={22} color="#ff5b27" />
                  </View>
                </View>

                <View style={styles.line} />

                <View style={styles.cardFooter}>
                  <View
                    style={[
                      styles.orderStatusBadge,
                      {
                        backgroundColor: getStatusStyle(order.status)
                          .backgroundColor,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.orderStatus,
                        {
                          color: getStatusStyle(order.status).color,
                        },
                      ]}
                    >
                      {order.status}
                    </Text>
                  </View>
                  <Text style={styles.price}>₹{order.totalPrice}</Text>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff5f0',
    paddingHorizontal: 20,
    paddingVertical: 60,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    position: 'relative',
  },
  backBtn: {
    borderColor: '#bbb',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 50,
  },
  pageTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
  },
  searchBtn: {
    position: 'absolute',
    right: 0,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ffe3d9',
    borderRadius: 50,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginTop: 20,
  },
  searchText: {
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
  categoryContainer: {
    marginTop: 20,
    paddingBottom: 20,
  },
  categoryBtn: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ffe3d9',
  },
  categoryBtnActive: {
    backgroundColor: '#ff5b27',
    borderColor: '#ff5b27',
  },
  categoryText: {
    fontSize: 12,
    color: '#000000a3',
    fontFamily: 'Poppins-Regular',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  orderContainer: {
    flexDirection: 'column',
    gap: 16,
  },
  orderCardContainer: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#ffe3d9',
    borderWidth: 1,
    borderRadius: 16,
  },
  orderCardSubContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    flexDirection: 'column',
    gap: 20,
    marginBottom: 16,
  },
  cardHeader: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardHeaderTitle: {
    fontSize: 14,
    color: '#000',
    fontFamily: 'Poppins-SemiBold',
    marginTop: 2,
  },
  cardHeaderTime: {
    fontSize: 12,
    color: '#aaa',
    fontFamily: 'Poppins-Regular',
  },
  cardProfileContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  cardAvatarContainer: {
    height: 50,
    width: 50,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardAvatar: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  profileName: {
    fontSize: 14,
    color: '#000',
    fontFamily: 'Poppins-SemiBold',
  },
  items: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 12,
    color: '#aaa',
    fontFamily: 'Poppins-Regular',
  },
  cardFooter: {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    marginBottom: -2,
    fontSize: 16,
    color: '#000',
    fontFamily: 'Poppins-Bold',
  },
  orderStatusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#277a0022',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 6,
  },
  orderStatus: {
    fontSize: 12,
    color: '#277a00',
    fontFamily: 'Poppins-Medium',
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: '#ffe3d9',
  },
  scrollView: {
    paddingBottom: 200,
  },
  noDataContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },

  noDataText: {
    fontSize: 14,
    color: '#aaa',
    fontFamily: 'Poppins-Regular',
  },
});
