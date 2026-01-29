import {
  View,
  Text,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Product } from '../types/type';

const MyShopScreen = () => {
  const [products, setProducts] = useState<Product[] | null>(null);

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

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn}>
          <FontAwesome6 name="arrow-left" size={18} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Products</Text>
        <Ionicons
          name="settings-outline"
          size={24}
          color={'#000'}
          style={styles.settingIcon}
        />
      </View>

      {/* <View style={styles.shopContainer}>
        <View style={styles.shopImageContainer}>
          <Image
            source={require('../assets/images/intro.jpg')}
            style={styles.shopImage}
          />
        </View>
        <View style={styles.shopContentContainer}>
          <Text style={styles.shopTitle}>Green Vally Organics</Text>
          <View style={styles.shopAddress}>
            <Feather name="map-pin" size={18} color={'#888'} />
            <Text style={styles.shopContent}>123 Market St, Portland</Text>
          </View>
          <View style={styles.shopCategory}>
            <Feather name="tag" size={18} color={'#888'} />
            <Text style={styles.shopContent}>Groceries & produce</Text>
          </View>
        </View>
      </View> */}

      <View style={styles.itemContainer}>
        {/* <View style={styles.productHeader}>
          <Text style={styles.title}>Products</Text>
          <Text style={styles.productQty}>4 Items</Text>
        </View> */}

        {products?.map(product => (
          <View style={styles.productContainer} key={product.id}>
            <View style={styles.productImageContainer}>
              <Image
                style={styles.productImage}
                source={{
                  uri: `http://192.168.1.3:5000${product.image}`,
                }}
              />
            </View>

            <View style={styles.ProductContentContainer}>
              <Text style={styles.productTitle}>{product.productName}</Text>
              <Text style={styles.productPrice}>₹{product.price}</Text>
              <View style={styles.productStockBadge}>
                <Feather name="box" size={16} color={'#888'} />
                <Text style={styles.productStockText}>
                  In Stock: {product.stock}
                </Text>
              </View>
            </View>
            <Entypo
              name="dots-three-vertical"
              size={16}
              color={'#888'}
              style={styles.dots}
            />
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.button}>
        <Feather name="plus" color={'#fff'} size={20} />
        <Text style={styles.buttonText}>Add New Product</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default MyShopScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    paddingVertical: 60,
    position: 'relative',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    position: 'relative',
  },
  headerBtn: {
    borderWidth: 1,
    borderColor: '#bbb',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 30,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
  },
  settingIcon: {
    position: 'absolute',
    right: 0,
  },
  shopContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    padding: 20,
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#ffe3d9',
    backgroundColor: '#FFF5F0',
  },
  shopImageContainer: {
    width: 90,
    height: 90,
    borderRadius: 100,
    backgroundColor: '#fff',
    borderWidth: 1,
    padding: 4,
    borderColor: '#ffe3d9',
  },
  shopImage: {
    height: '100%',
    width: '100%',
    borderRadius: 100,
  },
  shopContentContainer: {
    flexDirection: 'column',
  },
  shopTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
  },
  shopAddress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  shopCategory: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  shopContent: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#888',
  },
  itemContainer: {
    flexDirection: 'column',
    marginTop: 26,
    gap: 12,
    width: '100%',
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
  },
  productQty: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: '#888',
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ffe3d9',
    borderRadius: 14,
    position: 'relative',
    marginBottom: 4,
  },
  productImageContainer: {
    height: 90,
    width: 90,
    borderColor: '#ffe3d9',
    borderWidth: 1,
    borderRadius: 12,
  },
  productImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  ProductContentContainer: {
    flexDirection: 'column',
  },
  productTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
  },
  productPrice: {
    fontFamily: 'Poppins-Bold',
    color: '#ff5b27',
  },
  productStockBadge: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 6,
    backgroundColor: '#eeeeee96',
    width: 100,
    borderRadius: 10,
    gap: 6,
    marginTop: 8,
  },
  productStockText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    color: '#888',
  },
  dots: {
    position: 'absolute',
    top: 14,
    right: 14,
  },
  button: {
    backgroundColor: '#ff5b27',
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 16,
    marginBottom: 30,
    position: 'absolute',
    width: '100%',
    bottom: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
});
