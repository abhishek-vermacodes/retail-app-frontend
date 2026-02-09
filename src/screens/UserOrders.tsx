import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import React from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';

const orders = [
  {
    id: '#8291',
    date: 'Today, 10:30 AM',
    status: 'Processing',
    statusColor: '#ff7a1a',
    images: [
      require('../assets/images/bag.jpeg'),
      require('../assets/images/bag.jpeg'),
    ],
    extra: '+2',
    price: 24.5,
    action: 'Track Order',
    actionPrimary: true,
  },
  {
    id: '#7732',
    date: 'Oct 12, 2023',
    status: 'Delivered',
    statusColor: '#1dbf38',
    images: [
      require('../assets/images/bag.jpeg'),
      require('../assets/images/bag.jpeg'),
    ],
    price: 18.2,
    action: 'Reorder',
    actionPrimary: false,
  },
];

const UserOrdersScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.mainContainer}>
      {/* ✅ HEADER */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome6 name="arrow-left" size={18} color="#000" />
        </TouchableOpacity>

        <Text style={styles.pageTitle}>My Orders</Text>

        <Entypo
          name="dots-three-vertical"
          size={22}
          color="#000"
          style={styles.menuBtn}
        />
      </View>

      {/* ✅ ORDERS LIST */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {orders.map(order => (
          <View key={order.id} style={styles.orderCard}>
            {/* Top Row */}
            <View style={styles.rowBetween}>
              <Text style={styles.dateText}>{order.date}</Text>

              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: order.statusColor },
                ]}
              >
                <Text style={styles.statusText}>{order.status}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            {/* Images */}
            <View style={styles.imageRow}>
              {order.images.map((img, index) => (
                <Image key={index} source={img} style={styles.itemImage} />
              ))}

              {order.extra && (
                <View style={styles.extraBox}>
                  <Text style={styles.extraText}>{order.extra}</Text>
                </View>
              )}
            </View>

            {/* Bottom Row */}
            <View style={styles.bottomRow}>
              <View>
                <Text style={styles.orderText}>Order</Text>
                <Text style={styles.orderId}>{order.id}</Text>
              </View>

              <View style={styles.rightAlign}>
                <Text style={styles.price}>${order.price.toFixed(2)}</Text>

                <TouchableOpacity
                  style={[
                    styles.actionBtn,
                    order.actionPrimary
                      ? styles.primaryBtn
                      : styles.secondaryBtn,
                  ]}
                >
                  <Text
                    style={[
                      styles.actionText,
                      !order.actionPrimary && { color: '#000' },
                    ]}
                  >
                    {order.action}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
};

export default UserOrdersScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff5f0',
    paddingHorizontal: 20,
    paddingTop: 60,
  },

  /* Header */
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginBottom: 16,
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

  /* Order Card */
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ffe3d9',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 13,
    color: '#777',
    fontFamily: 'Poppins-Regular',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 12,
  },

  imageRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  extraBox: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#ffe3d9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  extraText: {
    fontFamily: 'Poppins-Medium',
    color: '#444',
  },

  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  orderId: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
  },
  rightAlign: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    marginBottom: 6,
  },
  actionBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
  },
  primaryBtn: {
    backgroundColor: '#ff5b27',
  },
  secondaryBtn: {
    borderWidth: 1,
    borderColor: '#ddd',
  },
  actionText: {
    color: '#fff',
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
  },
});
