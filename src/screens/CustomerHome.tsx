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

import HomeBanner from '../components/HomeBanner';
import { useContext, useEffect, useState } from 'react';
import NearbyShopCard from '../components/ShopCard';
import ProductCard from '../components/ProductCard';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Product, Store } from '../types/type';
import { AuthContext } from '../context/AuthContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';

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

function CustomerHomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const navigation = useNavigation<any>();
  const [shops, setShop] = useState<Store[] | null>(null);
  const [products, setProducts] = useState<Product[] | null>(null);
  const { user } = useContext(AuthContext);

  const fetchItems = async () => {
    const token = await AsyncStorage.getItem('token');
    try {
      const storeResponse = await axios.get(
        `http://192.168.1.5:5000/api/store/get-all-stores?limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const productResponse = await axios.get(
        `http://192.168.1.5:5000/api/products/get-all-products?limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log('prduct response', productResponse);
      setShop(storeResponse.data.stores);
      setProducts(productResponse.data.products);
    } catch (error) {
      console.log('Failed to fetch shops', error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <View>
          <View style={styles.locationContainer}>
            <Ionicons
              name="location"
              size={20}
              color="#ff6a32"
              style={styles.locationIcon}
            />
            <Text style={styles.priLocationText}>
              {user?.address?.split(',')[0]}
            </Text>
          </View>
          <Text style={styles.secLocationText}>{user?.address}</Text>
        </View>
        <View style={styles.profileContainer}>
          <Fontisto name="bell" size={20} color="#000" />
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{user?.username?.charAt(0)}</Text>
          </View>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewcontentContainerStyle}
      >
        <HomeBanner />

        <View>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <Text style={styles.sectionLink}>See All</Text>
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
                    onPress={() => {
                      setSelectedCategory(item.key);
                      navigation.navigate('CategoryScreen', {
                        categoryKey: item.key,
                        categoryLabel: item.label,
                      });
                    }}
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
            <Text style={styles.sectionLink}>View All</Text>
          </View>

          <FlatList
            data={shops}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.shopFlatListcontentContainerStyle}
            renderItem={({ item }) => (
              <NearbyShopCard
                image={item.image}
                storeName={item.storeName}
                category={item.category}
                address={item.address}
              />
            )}
          />
        </View>

        <View>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recommended</Text>
          </View>

          <FlatList
            data={products}
            keyExtractor={item => item.id}
            numColumns={2}
            scrollEnabled={false}
            removeClippedSubviews={false}
            columnWrapperStyle={styles.productFlatListColumnWrapperStyle}
            contentContainerStyle={styles.productFlatListcontentContainerStyle}
            renderItem={({ item }) => (
              <ProductCard
                image={item.image}
                name={item.productName}
                price={item.price}
              />
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
    gap: 2,
    paddingBottom: 26,
    backgroundColor: '#FFF5F0',
    zIndex: 10,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    left: -6,
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
  scrollViewcontentContainerStyle: {
    paddingBottom: 200,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  sectionLink: {
    fontSize: 12,
    color: '#ff6a32',
    fontFamily: 'Poppins-Medium',
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
  shopFlatListcontentContainerStyle: {
    marginTop: 16,
  },
  productFlatListColumnWrapperStyle: {
    gap: 16,
  },
  productFlatListcontentContainerStyle: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
});
