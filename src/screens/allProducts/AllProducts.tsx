import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  Pressable,
} from 'react-native';
import styles from './allProducts.styles';
import API from '../../api/authApi';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

import { categories, Product } from '../../types/type';
import { useEffect, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { getToken } from '../../utils/storage';

const AllProducts = () => {
  const navigation = useNavigation<any>();

  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [products, setProducts] = useState<Product[] | null>([]);

  const getProducts = async () => {
    const token = await getToken()
    try {
      const response = await API.get('/api/products/my-products', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
                  uri: `${API}${product.image}`,
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
