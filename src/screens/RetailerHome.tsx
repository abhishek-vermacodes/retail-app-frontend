import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Store } from '../types/type';
import { AuthContext } from '../context/AuthContext';
import Fontisto from 'react-native-vector-icons/Fontisto';

const RetailerHomeScreen = () => {
  const navigation = useNavigation<any>();
  const [store, setStore] = useState<Store | null>(null);
  const { user } = useContext(AuthContext);

  const getStore = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(
        `http://192.168.1.5:5000/api/store/my-store`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setStore(response.data.store);
    } catch (error) {
      console.log('Failed to fetch', error);
    }
  };

  const address = user?.address || '';
  const minLength = 5;
  const maxlength = 20;

  const displayAddress =
    address.length > maxlength
      ? address.slice(0, maxlength) + '...'
      : address.length < minLength
      ? address
      : address;

  useEffect(() => {
    getStore();
  }, []);
  return (
    <LinearGradient
      start={{ x: 1.2, y: 0 }}
      end={{ x: 0, y: 0.6 }}
      colors={['#ff693299', '#ffffff']}
      locations={[0, 0.6]}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <View style={styles.locationContainer}>
              <Ionicons
                name="location"
                size={20}
                color="#ff6a32"
                style={styles.locationIcon}
              />
              <Text style={styles.priLocationText}>Home</Text>
            </View>
            <Text style={styles.secLocationText}>{displayAddress}</Text>
          </View>
          <View style={styles.profileContainer}>
            <Fontisto name="bell" size={20} color="#000" />
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>{user?.username?.charAt(0)}</Text>
            </View>
          </View>
        </View>

        {store === null ? (
          <View style={styles.banner}>
            <View style={styles.badge}>
              <Ionicons name="sparkles-outline" size={14} color="#fff" />
              <Text style={styles.badgeText}>New Feature</Text>
            </View>

            <Text style={styles.bannerTitle}>
              Launch your{'\n'}online store
            </Text>
            <Text style={styles.bannerDesc}>
              Start selling products directly to{'\n'}customers with zero
              commission.
            </Text>

            <TouchableOpacity
              style={styles.bannerBtn}
              onPress={() => navigation.navigate('CreateShop')}
            >
              <Text style={styles.bannerBtnText}>Create Shop</Text>
              <Ionicons name="arrow-forward" size={16} color="#ff6a32" />
            </TouchableOpacity>

            <View style={styles.circle} />
            <Image
              source={require('../assets/images/bag.jpeg')}
              style={styles.bagImage}
            />
          </View>
        ) : (
          <View style={styles.banner}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{store.category}</Text>
            </View>

            <Text style={styles.storeTitle}>{store.storeName}</Text>
            <Text style={styles.storeDesc}>{store.description}</Text>

            <View style={styles.storeContainer}>
              <View style={styles.storeBadge}>
                <Feather name="map-pin" size={14} color="#fff" />
                <Text style={styles.storeAddress}>{store.address}</Text>
              </View>
              <View style={styles.storeBadge}>
                <Feather name="phone" size={14} color={'#fff'} />

                <Text style={styles.storeNumber}>+91 {store.phone}</Text>
              </View>
            </View>

            <View style={styles.storeCircle} />
            <Image
              source={{
                uri: `http://192.168.1.12:5000${store.image}`,
              }}
              style={styles.bagImage}
            />
          </View>
        )}

        {/* Overview */}
        <View style={styles.overviewHeader}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <Text style={styles.viewReport}>View Report</Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Ionicons name="people-outline" size={22} />
            <Text style={styles.statNumber}>128</Text>
            <Text style={styles.statLabel}>Store Visitors</Text>
            <Text style={styles.growth}>+12%</Text>
          </View>

          <View style={styles.statCard}>
            <Feather name="shopping-bag" size={22} />
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Total Orders</Text>
            <Text style={styles.muted}>--</Text>
          </View>
        </View>

        <View style={styles.overviewHeader}>
          <Text style={styles.sectionTitle}>Get Started</Text>
        </View>

        <View style={styles.getStartedSection}>
          <TouchableOpacity style={styles.actionCard}>
            <View style={styles.iconBox}>
              <Feather name="box" size={20} color="#ff6a32" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.actionTitle}>Add your first product</Text>
              <Text style={styles.actionDesc}>
                Upload images and set prices to start selling.
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <View style={styles.iconBoxGray}>
              <Feather name="credit-card" size={20} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.actionTitle}>Set up payments</Text>
              <Text style={styles.actionDesc}>
                Link your bank account to receive payouts.
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default RetailerHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 2,
    paddingBottom: 26,
    zIndex: 10,
    paddingHorizontal: 20,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    left: -6,
    zIndex: 9999,
  },
  priLocationText: {
    fontFamily: 'Poppins-Bold',
    marginBottom: -2,
    fontSize: 14,
  },
  secLocationText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
  },
  profileContainer: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'center',
  },
  avatarContainer: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
    padding: 2,
    backgroundColor: '#ff6a32',
  },
  avatarText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    marginBottom: -4,
    color: '#ffe3d9',
  },
  banner: {
    borderRadius: 22,
    backgroundColor: '#ff6a32',
    padding: 20,
    marginBottom: 24,
    position: 'relative',
    overflow: 'hidden',
    marginHorizontal: 20,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: { color: '#fff', fontSize: 10, fontFamily: 'Poppins-Medium' },
  bannerTitle: {
    fontSize: 26,
    color: '#fff',
    marginTop: 14,
    fontFamily: 'Poppins-Bold',
    lineHeight: 32,
  },
  bannerDesc: {
    color: '#ffe7dd',
    fontSize: 12,
    marginTop: 10,
    lineHeight: 18,
    fontFamily: 'Poppins-Medium',
  },
  bannerBtn: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'flex-start',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 14,
    marginTop: 16,
  },
  bannerBtnText: {
    color: '#ff6a32',
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
  },
  circle: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    height: 160,
    width: 160,
    borderRadius: 100,
    position: 'absolute',
    top: -40,
    right: -40,
  },
  bagImage: {
    height: 100,
    width: 100,
    position: 'absolute',
    bottom: -6,
    right: -14,
    transform: [{ rotate: '-14deg' }],
  },
  storeTitle: {
    width: '75%',
    fontSize: 24,
    color: '#fff',
    marginTop: 14,
    fontFamily: 'Poppins-Bold',
    lineHeight: 32,
  },
  storeDesc: {
    width: '80%',
    color: '#ffe7dd',
    fontSize: 12,
    marginTop: 10,
    lineHeight: 18,
    fontFamily: 'Poppins-Medium',
  },
  storeContainer: {
    flexDirection: 'column',
    gap: 4,
  },
  storeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  storeAddress: {
    fontSize: 12,
    color: '#fff',
    fontFamily: 'Poppins-Regular',
  },
  storeNumber: {
    fontSize: 12,
    color: '#fff',
    fontFamily: 'Poppins-Regular',
  },
  storeCircle: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    height: 160,
    width: 160,
    borderRadius: 100,
    position: 'absolute',
    top: -50,
    right: -50,
  },
  overviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  viewReport: {
    fontSize: 12,
    color: '#ff6a32',
    fontFamily: 'Poppins-Medium',
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 14,
    marginBottom: 24,
    marginTop: 12,
  },
  statCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 16,
    padding: 16,
  },
  statNumber: { fontSize: 22, fontFamily: 'Poppins-SemiBold', marginTop: 8 },
  statLabel: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
    fontFamily: 'Poppins-Regular',
  },
  growth: {
    fontSize: 14,
    color: 'green',
    marginTop: 6,
    fontFamily: 'Poppins-Medium',
  },
  muted: {
    fontSize: 14,
    color: '#bbb',
    marginTop: 6,
    fontFamily: 'Poppins-Medium',
  },
  getStartedSection: {
    marginTop: 12,
    flexDirection: 'column',
    paddingHorizontal: 20,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 12,
    gap: 14,
  },
  iconBox: {
    backgroundColor: '#ffe7dd',
    padding: 16,
    borderRadius: 12,
  },
  actionTitle: { fontSize: 13, fontFamily: 'Poppins-Medium' },
  actionDesc: { fontSize: 11, color: '#888', fontFamily: 'Poppins-Regular' },
  iconBoxGray: {
    backgroundColor: '#f3f3f3',
    padding: 16,
    borderRadius: 12,
  },
});
