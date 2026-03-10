import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  FlatList,
} from 'react-native';


import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

import API from '../../api/authApi';
import { getToken } from '../../utils/storage';
import { categories, Product } from '../../types/type';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from './shopForCustomer.styles';

const ShopForCustomer = () => {
  const route = useRoute();
  const { shop } = route.params as any;

  const navigation = useNavigation<any>();

  const [isVisible, setIsVisible] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [shopProducts, setShopProducts] = useState<Product[] | null>([]);

  useEffect(() => {
    const fetchMyProducts = async () => {
      const token = await getToken();
      try {
        const response = await API.get(
          `/api/products/getShopProducts/${shop.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setShopProducts(response.data.products);
      } catch (error) {
        console.log('Failed to Fetch My Products', error);
      }
    };

    fetchMyProducts();
  }, [shop.id]);

  const filteredProducts = useMemo(() => {
    return shopProducts?.filter(shopProduct => {
      const matchCategory =
        !selectedCategory || shopProduct.category === selectedCategory;

      const matchSearch =
        !searchQuery.trim() ||
        shopProduct.productName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        shopProduct.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [shopProducts, selectedCategory, searchQuery]);

  return (
    <LinearGradient
      start={{ x: 1.2, y: 0 }}
      end={{ x: 0, y: 0.6 }}
      colors={['#ff693299', '#ffffff']}
      locations={[0, 0.6]}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.navigate('CustomerHome')}
        >
          <Ionicons name="arrow-back" size={18} color="#000" />
        </TouchableOpacity>

        <Text style={styles.pageTitle}>{shop.storeName}</Text>
        <TouchableOpacity style={styles.searchBtn}>
          <Ionicons
            name="search"
            size={18}
            color={'#000'}
            onPress={() => setIsVisible(prev => !prev)}
          />
        </TouchableOpacity>
      </View>

      {isVisible && (
        <View style={styles.searchContainer}>
          <Feather name="search" color={'#000'} size={20} />
          <TextInput
            placeholder="Search for Products"
            placeholderTextColor={'#000'}
            style={styles.searchText}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.subContainer}>
          <View style={styles.storeBanner}>
            <View style={styles.storeImgContainer}>
              <Image
                source={{
                  uri: `http://192.168.1.12:5000${shop.image}`,
                }}
                style={styles.storeImg}
                resizeMode="cover"
              />
            </View>

            <View style={styles.storeContentContainer}>
              <View style={styles.storeContentSubContainer}>
                <Text style={styles.storeName}>{shop.storeName}</Text>

                <View style={styles.storeCategory}>
                  <Text style={styles.storeCatgoryText}>{shop.category}</Text>
                </View>
              </View>

              <View>
                <View style={styles.storeAddressContainer}>
                  <Ionicons
                    style={styles.storeLocationIcon}
                    name="location-outline"
                    size={18}
                    color="#ff6a32"
                  />
                  <Text style={styles.storeAddress}>{shop.address}</Text>
                </View>

                <View style={styles.storeAddressContainer}>
                  <Feather name="phone" size={14} color="#ff6a32" />
                  <Text style={styles.storeAddress}>+91 {shop.phone}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

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

        <View style={styles.gridContainer}>
          {filteredProducts?.map(product => (
            <View key={product?.id} style={styles.productCard}>
              <TouchableOpacity
                style={styles.productImageContainer}
                onPress={() =>
                  navigation.navigate('ShopProductDetail', { id: product.id })
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
    </LinearGradient>
  );
};

export default ShopForCustomer;
