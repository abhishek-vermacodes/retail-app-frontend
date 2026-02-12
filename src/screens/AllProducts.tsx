import {
  View,
  Text,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  Pressable,
} from 'react-native';

import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useEffect, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Product } from '../types/type';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const categories = [
  { label: 'All', value: '' },
  { label: 'Grocery', value: 'grocery' },
  { label: 'Fresh', value: 'fresh' },
  { label: 'Personal', value: 'personal' },
  { label: 'Household', value: 'home' },
  { label: 'Babycare', value: 'baby' },
  { label: 'Healthcare', value: 'health' },
  { label: 'Fashion', value: 'fashion' },
  { label: 'Electronic', value: 'electronic' },
  { label: 'Stationery', value: 'stationery' },
];

const AllProducts = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigation = useNavigation<any>();
  const [products, setProducts] = useState<Product[] | null>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const getProducts = async () => {
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await axios.get(
        'http://192.168.1.3:5000/api/products/my-products',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setProducts(response.data.products);
    } catch (error) {
      console.log('Failed to fetch products', error);
    }
  };

  const filteredProducts = useMemo(() => {
    return products?.filter(product => {
      const matchCategory =
        !selectedCategory || product.category === selectedCategory;

      const matchSearch =
        !searchQuery.trim() ||
        product.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <ScrollView
      style={styles.mainContainer}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar barStyle={'dark-content'} />

      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome6 name="arrow-left" size={18} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>My Products</Text>
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

      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryContainer}
        renderItem={({ item }) => {
          const isActive = selectedCategory === item.value;

          return (
            <TouchableOpacity
              onPress={() => setSelectedCategory(item.value)}
              style={[styles.categoryBtn, isActive && styles.categoryBtnActive]}
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

      <View style={styles.gridContainer}>
        {filteredProducts?.map(product => (
          <Pressable
            key={product?.id}
            style={styles.productCard}
            onPress={() => navigation.navigate('MyProduct', { id: product.id })}
          >
            <EvilIcons
              name="heart"
              size={22}
              color="#000000a3"
              style={styles.like}
            />
            <View style={styles.productImageContainer}>
              <Image
                style={styles.productImage}
                source={{
                  uri: `http://192.168.1.3:5000${product.image}`,
                }}
              />
            </View>
            <View style={styles.productContentContainer}>
              <Text style={styles.productName}>{product.productName}</Text>
              <Text style={styles.productcategory}>{product.category}</Text>
              <View style={styles.productSubContainer}>
                <Text style={styles.productPrice}>₹{product.price}</Text>
                <TouchableOpacity style={styles.addButton}>
                  <Ionicons name="cart-outline" size={20} color="#ff5b27" />
                </TouchableOpacity>
              </View>
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

export default AllProducts;

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
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
  },
  searchText: {
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
  categoryContainer: {
    marginTop: 20,
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
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  productCard: {
    backgroundColor: '#ffffff',
    width: '48%',
    borderRadius: 12,
    padding: 10,
    elevation: 0,
    borderWidth: 1,
    borderColor: '#ffe3d9',
    gap: 10,
    marginTop: 16,
    position: 'relative',
  },
  like: {
    position: 'absolute',
    top: 6,
    left: 6,
    zIndex: 999,
  },
  productImageContainer: {
    alignItems: 'center',
    borderRadius: 10,
  },
  productImage: {
    width: '100%',
    height: 168,
    resizeMode: 'center',
    borderRadius: 10,
  },
  productContentContainer: {
    flexDirection: 'column',
  },
  productName: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#ff5b27',
  },
  productcategory: {
    fontSize: 10,
    fontFamily: 'Poppins-SemiBold',
    color: '#000000a3',
    marginTop: -2,
  },
  productSubContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  productPrice: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#ff5b27',
  },
  addButton: {
    backgroundColor: '#FFF5F0',
    padding: 10,
    borderRadius: 30,
  },
});
