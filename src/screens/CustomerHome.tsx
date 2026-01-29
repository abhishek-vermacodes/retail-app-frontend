// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import { useEffect, useState } from 'react';
import {
  // Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const CustomerHomeScreen = () => {
  const { signOut } = useContext(AuthContext);
  // const [user, setUser] = useState<User | null>(null);
  // const [products, setProducts] = useState<Product[] | null>(null);

  const navigation = useNavigation<any>();

  // useEffect(() => {
  //   const getProfile = async () => {
  //     const token = await AsyncStorage.getItem('authToken');
  //     try {
  //       const response = await axios.get(
  //         'http://192.168.1.3:5000/api/auth/profile',
  //         {
  //           headers: { Authorization: `Bearer ${token}` },
  //         },
  //       );
  //       setUser(response.data.user);
  //     } catch (error) {
  //       console.log('error', error);
  //     }
  //   };

  //   const getProducts = async () => {
  //     const token = await AsyncStorage.getItem('authToken');
  //     try {
  //       const response = await axios.get(
  //         'http://192.168.1.3:5000/api/product/get-products',
  //         {
  //           headers: { Authorization: `Bearer ${token}` },
  //         },
  //       );

  //       const latestFive = response.data.data.slice(-5).reverse();

  //       setProducts(latestFive);
  //       console.log('response', latestFive);
  //     } catch (error) {
  //       console.log('Fetch products failed', error);
  //     }
  //   };

  //   getProfile();
  //   getProducts();
  // }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="dark-content" />

      <SafeAreaView style={styles.header}>
        <View style={styles.brandRow}>
          <Icon name="cart-shopping" color={'black'} size={24} />
          <Text style={styles.headerTitle}>Retail Pro</Text>
        </View>

        <View style={styles.headerRight}>
          <Icon name="bell" size={22} color="#000000" />

          <View style={styles.profile}>
            <Text style={styles.profileText}>
              {/* {user?.username?.charAt(0).toUpperCase()} */}
            </Text>
          </View>
        </View>
      </SafeAreaView>

      <View style={styles.greeting}>
        {/* <Text style={styles.greetingTitle}>Good morning, {user?.username}</Text> */}
        <Text style={styles.greetingSub}>
          Here is today’s snapshot of your store performance.
        </Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Today’s sales</Text>
          <Text style={styles.statValue}>$2,430</Text>
          <View style={styles.statBadge}>
            <Text style={styles.statBadgeText}>+18% vs yesterday</Text>
          </View>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Low stock items</Text>
          <Text style={styles.statValue}>7</Text>
          <TouchableOpacity>
            <Text style={styles.reviewText}>Review now</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Quick actions</Text>
        <View style={styles.quickRow}>
          <TouchableOpacity
            style={styles.primaryAction}
            // onPress={() => navigation.navigate('Product')}
            onPress={signOut}
          >
            <Ionicons name="add" size={18} color="#fff" />
            <Text style={styles.primaryActionText}>New product</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryAction}>
            <Ionicons name="scan-outline" size={18} color="#ff5b27" />
            <Text style={styles.secondaryActionText}>Scan barcode</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.sectionRow}>
        <Text style={styles.sectionTitle}>Top products</Text>
        <Text
          style={styles.link}
          onPress={() => navigation.navigate('Inventory')}
        >
          View all
        </Text>
      </View>

      {/* {products?.map(product => (
        <View key={product?.id} style={styles.productRow}>
          <View style={styles.productIcon}>
            {product.category === 'grocery' ? (
              <Image
                source={require('../assets/icons/grocery.png')}
                style={styles.categoryImage}
              />
            ) : product.category === 'fresh' ? (
              <Image
                source={require('../assets/icons/fresh-produce.png')}
                style={styles.categoryImage}
              />
            ) : product.category === 'personal' ? (
              <Image
                source={require('../assets/icons/personal-hygiene.png')}
                style={styles.categoryImage}
              />
            ) : product.category === 'home' ? (
              <Image
                source={require('../assets/icons/home.png')}
                style={styles.categoryImage}
              />
            ) : product.category === 'baby' ? (
              <Image
                source={require('../assets/icons/baby.png')}
                style={styles.categoryImage}
              />
            ) : product.category === 'health' ? (
              <Image
                source={require('../assets/icons/healthcare.png')}
                style={styles.categoryImage}
              />
            ) : product.category === 'fashion' ? (
              <Image
                source={require('../assets/icons/tshirt.png')}
                style={styles.categoryImage}
              />
            ) : product.category === 'electronic' ? (
              <Image
                source={require('../assets/icons/responsive.png')}
                style={styles.categoryImage}
              />
            ) : product.category === 'stationery' ? (
              <Image
                source={require('../assets/icons/stationery.png')}
                style={styles.categoryImage}
              />
            ) : (
              <Ionicons name="cube-outline" size={26} color={'#ff5b27'} />
            )}
          </View>

          <View style={styles.productCard}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productMeta}>{product.category}</Text>
          </View>

          <View style={styles.stockBadge}>
            <Text style={styles.stockText}>{product.stock} in stock</Text>
          </View>
        </View>
      ))} */}

      <View style={styles.sectionRow}>
        <Text style={styles.sectionTitle}>Today’s activity</Text>
        <Text style={styles.link}>See all</Text>
      </View>

      <View style={styles.activityCard}>
        <Ionicons name="cart-outline" color={'#ff5b27'} size={24} />
        <Text style={styles.activityText}>12 orders completed</Text>
        <Text style={styles.activityValue}>$640</Text>
      </View>

      <View style={styles.activityCard}>
        <Ionicons name="warning-outline" color={'#ff5b27'} size={24} />
        <Text style={styles.activityText}>3 items low in stock</Text>
        <Text style={styles.review}>Review</Text>
      </View>

      <View style={styles.screenView} />
    </ScrollView>
  );
};

export default CustomerHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 14,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 18,
    color: '#000000',
    fontFamily: 'Poppins-SemiBold',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  greeting: {
    paddingHorizontal: 16,
    marginTop: 12,
  },
  greetingTitle: {
    fontSize: 22,
    color: '#000000',
    fontFamily: 'Poppins-SemiBold',
  },
  greetingSub: {
    marginTop: -4,
    color: '#000000a3',
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 26,
    gap: 16,
  },
  statCard: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderColor: '#ffe3d9',
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
  },
  statLabel: {
    color: '#000000a3',
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
  },
  statValue: {
    fontSize: 22,
    fontFamily: 'Poppins-SemiBold',
    marginTop: 6,
  },
  statBadge: {
    marginTop: 6,
    backgroundColor: '#DCFCE7',
    alignSelf: 'flex-start',
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  statBadgeText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 11,
    color: '#166534',
  },
  reviewText: {
    color: '#ff5b27',
    fontWeight: '600',
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
  },
  sectionTitle: {
    marginTop: 22,
    marginBottom: 10,
    fontSize: 16,
    color: '#000000',
    fontFamily: 'Poppins-SemiBold',
  },
  quickRow: {
    flexDirection: 'row',
    gap: 16,
  },
  primaryAction: {
    flex: 1,
    backgroundColor: '#ff5927',
    borderRadius: 10,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  primaryActionText: {
    fontFamily: 'Poppins-SemiBold',
    color: '#ffffff',
  },
  secondaryAction: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ffe3d9',
    borderRadius: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#fff',
  },
  secondaryActionText: {
    color: '#ff5b27',
    fontFamily: 'Poppins-SemiBold',
  },
  sectionHeader: {
    paddingHorizontal: 16,
  },
  link: {
    color: '#ff5b27',
    fontFamily: 'Poppins-SemiBold',
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 10,
    padding: 8,
    borderRadius: 10,
    gap: 12,
    borderColor: '#ffe3d9',
    borderWidth: 1,
    position: 'relative',
  },
  productIcon: {
    backgroundColor: '#FFF5F0',
    padding: 14,
    borderRadius: 10,
  },
  productName: {
    color: '#000000',
    fontFamily: 'Poppins-SemiBold',
  },
  productMeta: {
    fontSize: 12,
    marginTop: -4,
    color: '#000000a3',
    fontFamily: 'Poppins-Regular',
  },
  stockBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  stockText: {
    fontSize: 10,
    fontFamily: 'Poppins-SemiBold',
    color: '#166534',
  },
  activityCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 10,
    padding: 14,
    borderRadius: 10,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    position: 'relative',
    borderColor: '#ffe3d9',
    borderWidth: 1,
  },
  activityText: {
    color: '#111827',
    fontFamily: 'Poppins-SemiBold',
  },
  activityValue: {
    fontFamily: 'Poppins-SemiBold',
    position: 'absolute',
    right: 14,
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  review: {
    position: 'absolute',
    right: 14,
    color: '#ff5b27',
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
  },
  screenView: {
    height: 160,
  },
  productCard: {
    flex: 1,
  },
  categoryImage: {
    width: 24,
    height: 24,
  },
  profile: {
    width: 50,
    height: 50,
    backgroundColor: '#ff5b27',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#ff5b27',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 12,
  },
  profileText: {
    fontSize: 18,
    fontFamily: 'Poppins_Regular',
    color: '#ffffff',
  },
});
