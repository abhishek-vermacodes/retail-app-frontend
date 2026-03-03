import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import React from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import styles from './userOrders.styles';

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


