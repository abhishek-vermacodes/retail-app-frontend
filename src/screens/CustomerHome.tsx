import {
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Store } from '../types/type';
import { AuthContext } from '../context/AuthContext';
import { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { CustomerStackParamList } from '../navigation/CustomerNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import API from '../api/authApi';
import HomeBanner from '../components/HomeBanner';
import NearbyShopCard from '../components/ShopCard';
import ProductCard from '../components/ProductCard';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const categories = [
  {
    label: 'Grocery',
    key: 'grocery',
    value: require('../assets/icons/grocery.png'),
  },
  { label: 'Fresh', key: 'fresh', value: require('../assets/icons/fresh.png') },
  {
    label: 'Personal',
    key: 'personal',
    value: require('../assets/icons/personal.png'),
  },
  {
    label: 'Household',
    key: 'household',
    value: require('../assets/icons/home.png'),
  },
  {
    label: 'Babycare',
    key: 'babycare',
    value: require('../assets/icons/baby.png'),
  },
  {
    label: 'Healthcare',
    key: 'healthcare',
    value: require('../assets/icons/health.png'),
  },
  {
    label: 'Fashion',
    key: 'fashion',
    value: require('../assets/icons/fashion.png'),
  },
  {
    label: 'Electronic',
    key: 'electronic',
    value: require('../assets/icons/electronic.png'),
  },
  {
    label: 'Stationery',
    key: 'stationery',
    value: require('../assets/icons/stationery.png'),
  },
];

const recommendedProducts = [
  {
    id: '1',
    productName: 'Fresh Apples',
    price: 120,
    image:
      'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=400&h=400&fit=crop',
  },
  {
    id: '2',
    productName: 'Basmati Rice',
    price: 450,
    image:
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop',
  },
  {
    id: '3',
    productName: 'Milk 1L',
    price: 60,
    image:
      'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=400&fit=crop',
  },
  {
    id: '4',
    productName: 'Shampoo',
    price: 199,
    image:
      'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400&h=400&fit=crop',
  },
  {
    id: '5',
    productName: 'Bread',
    price: 40,
    image:
      'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=400&h=400&fit=crop',
  },
  {
    id: '6',
    productName: 'Laptop ',
    price: 55000,
    image:
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
  },
];

function CustomerHomeScreen() {
  const { user } = useContext(AuthContext);

  const navigation = useNavigation<NavigationProp>();

  const [allShops, setAllShops] = useState<Store[]>([]);
  const [filteredShops, setFilteredShops] = useState<Store[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  type NavigationProp = NativeStackNavigationProp<
    CustomerStackParamList,
    'CustomerHome'
  >;

  const fetchShops = async () => {
    const token = await AsyncStorage.getItem('token');

    try {
      const response = await API.get('/store/get-all-stores?limit=10', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const stores = response.data.stores || [];
      setAllShops(stores);
      setFilteredShops(stores);
    } catch (error) {
      console.log('Failed to fetch shops', error);
    }
  };

  useEffect(() => {
    fetchShops();
  }, []);

  const handleCategorySelect = (categoryKey: string) => {
    if (selectedCategory === categoryKey) {
      setSelectedCategory(null);
      setFilteredShops(allShops);
      return;
    }

    setSelectedCategory(categoryKey);

    const filtered = allShops.filter(
      shop => shop.category?.toLowerCase() === categoryKey.toLowerCase(),
    );

    setFilteredShops(filtered);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity>
          <View style={styles.locationContainer}>
            <Ionicons name="location" size={20} color="#ff6a32" />
            <Text style={styles.priLocationText}>
              {user?.address?.split(',')[0]}
            </Text>
          </View>
          <Text style={styles.secLocationText}>{user?.address}</Text>
        </TouchableOpacity>

        <View style={styles.profileContainer}>
          <Fontisto name="bell" size={20} color="#000" />
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{user?.username?.charAt(0)}</Text>
          </View>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <HomeBanner />

        <View>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <Text style={styles.viewLink}>See All</Text>
          </View>

          <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryContainer}
            keyExtractor={item => item.key}
            renderItem={({ item }) => {
              const isActive = selectedCategory === item.key;

              return (
                <View style={styles.categoryBtnContainer}>
                  <TouchableOpacity
                    onPress={() => handleCategorySelect(item.key)}
                    style={[
                      styles.categoryBtn,
                      isActive && styles.categoryBtnActive,
                    ]}
                  >
                    <Image source={item.value} style={styles.categoryImage} />
                  </TouchableOpacity>
                  <Text style={styles.categoryText}>{item.label}</Text>
                </View>
              );
            }}
          />
        </View>

        <View>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nearby Shops</Text>
            <Text style={styles.viewLink}>See All</Text>
          </View>

          {filteredShops.length === 0 ? (
            <View
              style={{
                height: 100,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={styles.secLocationText}>No shops found</Text>
            </View>
          ) : (
            <FlatList
              data={filteredShops}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.shopFlatListcontentContainerStyle}
              renderItem={({ item }) => (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() =>
                    navigation.navigate('ShopDetails', { shop: item })
                  }
                >
                  <NearbyShopCard
                    image={item.image}
                    storeName={item.storeName}
                    category={item.category}
                    address={item.address}
                  />
                </TouchableOpacity>
              )}
            />
          )}
        </View>

        <View>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recommended</Text>
            <Text style={styles.viewLink}>See All</Text>
          </View>

          <FlatList
            data={recommendedProducts}
            keyExtractor={item => item.id}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={styles.productRow}
            contentContainerStyle={styles.productContainer}
            renderItem={({ item }) => (
              <View style={styles.productItem}>
                <ProductCard
                  image={item.image}
                  name={item.productName}
                  price={item.price}
                />
              </View>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
}

export default CustomerHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F0',
    paddingVertical: 70,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  locationContainer: {
    flexDirection: 'row',
    marginLeft: -6,
    gap: 4,
  },
  priLocationText: {
    fontFamily: 'Poppins-Bold',
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
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 30,
    backgroundColor: '#ff6a32',
  },
  avatarText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#ffe3d9',
    marginBottom: -2,
  },
  scrollContent: {
    paddingBottom: 200,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  viewLink: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#ff5b27',
    marginBottom: -2,
  },
  shopnotFound: {
    marginTop: 20,
  },
  shopFlatListcontentContainerStyle: {
    marginTop: 16,
  },
  categoryContainer: {
    marginTop: 14,
    gap: 20,
  },
  categoryBtnContainer: {
    alignItems: 'center',
    gap: 8,
  },
  categoryBtn: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#ffe3d9',
  },
  categoryBtnActive: {
    backgroundColor: '#ffe3d9',
    borderColor: '#ff5b27',
  },
  categoryImage: {
    width: 26,
    height: 26,
  },
  categoryText: {
    fontSize: 12,
    color: '#000000a3',
    fontFamily: 'Poppins-Regular',
  },
  productContainer: {
    marginTop: 16,
  },
  productRow: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  productItem: {
    width: '48%',
  },
});
