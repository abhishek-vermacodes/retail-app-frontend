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

import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome6';
import HomeBanner from '../components/HomeBanner';
import { useEffect, useState } from 'react';
import NearbyShopCard from '../components/ShopCard';
import ProductCard from '../components/ProductCard';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Product, Store } from '../types/type';

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

// const products = [
//   {
//     id: '1',
//     name: 'Fresh Red Apple (1kg)',
//     price: 3.5,
//     image: require('../assets/images/bag.jpeg'),
//   },
//   {
//     id: '2',
//     name: 'Organic Whole Milk',
//     price: 1.2,
//     image: require('../assets/images/bag.jpeg'),
//   },
//   {
//     id: '3',
//     name: 'Whole Wheat Bread',
//     price: 2.0,
//     image: require('../assets/images/bag.jpeg'),
//   },
//   {
//     id: '4',
//     name: 'Farm Fresh Eggs (12)',
//     price: 4.5,
//     image: require('../assets/images/bag.jpeg'),
//   },
// ];



function CustomerHomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const navigation = useNavigation<any>();
  const [shops, setShop] = useState<Store[] | null>(null);
  const [products, setProducts] = useState<Product[] | null>(null);
  const [userLocation, setUserLocation] = useState<any>(null);

  const fetchItems = async () => {
    const token = await AsyncStorage.getItem('token');
    try {
      const storeResponse = await axios.get(
        'http://192.168.1.3:5000/api/store/get-all-stores?limit=10',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const productResponse = await axios.get(
        'http://192.168.1.3:5000/api/products/get-all-products?limit=10',
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

   const loadUserLocation = async () => {
     try {
       const location = await AsyncStorage.getItem('userLocation');
       if (location) {
         const parsed = JSON.parse(location);
         setUserLocation(parsed);
         console.log('Loaded Location:', parsed);
       }
     // eslint-disable-next-line @typescript-eslint/no-unused-vars
     } catch (error) {
       console.log('Error loading location');
     }
   };


  useEffect(() => {
    fetchItems();
      loadUserLocation();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <SafeAreaView style={styles.header}>
        <View style={styles.brandRow}>
          <Icon name="cart-shopping" color="black" size={24} />
          <Text style={styles.headerTitle}>Retail Pro</Text>
          {userLocation && (
            <Text style={styles.locationText} numberOfLines={1}>
              📍 {userLocation.address}
            </Text>
          )}
        </View>

        <View style={styles.headerRight}>
          <Icon name="bell" size={22} color="#000" />
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
              style={styles.avatar}
            />
          </View>
        </View>
      </SafeAreaView>

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
                // onAddToCart={() => console.log(item.name)}
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 10,
    backgroundColor: '#FFF5F0',
    zIndex: 10,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 18,
    color: '#000',
    fontFamily: 'Poppins-SemiBold',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'center',
  },
  locationText: {
    fontSize: 11,
    color: '#666',
    fontFamily: 'Poppins-Regular',
    width: 220,
  },
  avatarContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    padding: 2,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#bbb',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  scrollViewcontentContainerStyle: {
    paddingBottom: 200,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
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
    marginTop: 20,
    paddingHorizontal: 20,
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
    width: 30,
    height: 30,
  },
  categoryText: {
    fontSize: 12,
    color: '#000000a3',
    fontFamily: 'Poppins-Regular',
  },
  shopFlatListcontentContainerStyle: {
    paddingHorizontal: 20,
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
