import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import styles from './storeProducts.styles';
import API from '../../api/authApi';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { categories, Product } from '../../types/type';
import { useEffect, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const StoreProducts = () => {
  const navigation = useNavigation<any>();
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [products, setProducts] = useState<Product[] | null>([]);

  const getProducts = async () => {
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await API.get('/api/product/my-products', {
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
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} />

      <View style={styles.header}>
        <View style={styles.subHeader}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <FontAwesome6 name="arrow-left" size={18} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.pageTitle}>Products</Text>
        </View>
        <Feather
          name="search"
          size={22}
          color={'#000'}
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
            const isActive = selectedCategory === item.value;

            return (
              <TouchableOpacity
                onPress={() => setSelectedCategory(item.value)}
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
        <View style={styles.gridContainer}>
          {filteredProducts?.map(product => (
            <View key={product?.id} style={styles.productCard}>
              <TouchableOpacity
                style={styles.productImageContainer}
                onPress={() =>
                  navigation.navigate('StoreProductDetail', {
                    id: product.id,
                  })
                }
              >
                <Image
                  style={styles.productImage}
                  source={{
                    uri: `http://192.168.1.12:5000${product.image}`,
                  }}
                />
              </TouchableOpacity>
              <View style={styles.productContentContainer}>
                <Text style={styles.productName}>{product.productName}</Text>
                <Text style={styles.productcategory}>{product.category}</Text>
                <View style={styles.productSubContainer}>
                  <Text style={styles.productPrice}>₹{product.price}.00</Text>

                  {product.stock <= 30 ? (
                    <Text style={styles.outOfStockStatus}>Out of Stock</Text>
                  ) : product.stock > 30 && product.stock < 60 ? (
                    <Text style={styles.lowStockStatus}>Low Stock</Text>
                  ) : (
                    <Text style={styles.inStockStatus}>Active</Text>
                  )}
                </View>
              </View>
              <View style={styles.stockBadge}>
                <Text style={styles.stockText}>{product.stock} in stock</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default StoreProducts;
