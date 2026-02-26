import React, { useCallback, useEffect, useState } from 'react';
import API from '../../api/authApi';
import styles from './StoreProductDetail.styles';

import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

import { getToken } from '../../utils/storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';

const BASE_URL = 'http://192.168.1.12:5000';

const StoreProductDetail = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { id } = route.params;

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchProduct = useCallback(async () => {
    try {
      const token = await getToken();

      const res = await API.get(`/api/products/product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProduct(res.data.product || res.data);
    } catch (error: any) {
      console.log('STATUS:', error.response?.status);
      console.log('ERROR:', error.response?.data);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const getStockStatus = (stock: number) => {
    if (stock <= 0) return 'Out of Stock';
    if (stock < 60) return 'Low Stock';
    return 'Active';
  };

  if (loading) {
    return (
      <View style={styles.mainContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.mainContainer}>
        <Text>Product not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome6 name="arrow-left" size={18} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Product</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
      >
        <View style={styles.productMainContainer}>
          <View style={styles.productImgContainer}>
            <Image
              style={styles.productImg}
              source={{
                uri: `${BASE_URL}${product.image}`,
              }}
            />
          </View>

          <View style={styles.productContentContainer}>
            <View style={styles.nameContainer}>
              <Text style={styles.productTitle}>{product.productName}</Text>

              <Text style={styles.productPrice}>₹ {product.price}.00</Text>
            </View>

            <View style={styles.stockContainer}>
              <View style={styles.stockStatusBadge}>
                <Text style={styles.stockStatusBadgeText}>
                  {getStockStatus(product.stock)}
                </Text>
              </View>

              <View style={styles.stockBadge}>
                <Text style={styles.stockBadgeText}>
                  {product.stock} in Stock
                </Text>
              </View>
            </View>

            <View style={styles.infoGrid}>
              <View style={styles.infoCard}>
                <Text style={styles.infoLabel}>Category</Text>
                <Text style={styles.infoValue}>{product.category}</Text>
              </View>

              <View style={styles.infoCard}>
                <Text style={styles.infoLabel}>SKU</Text>
                <Text style={styles.infoValue}>{product.sku || 'N/A'}</Text>
              </View>

              <View style={styles.infoCard}>
                <Text style={styles.infoLabel}>Sold</Text>
                <Text style={styles.infoValue}>{product.sold || 0}</Text>
              </View>

              <View style={styles.infoCard}>
                <Text style={styles.infoLabel}>Revenue</Text>
                <Text style={styles.infoValue}>
                  ₹ {(product.sold || 0) * product.price}
                </Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>
              {product.description || 'No description available'}
            </Text>

            {product.variants?.length > 0 && (
              <>
                <Text style={styles.sectionTitle}>Variants & Stock</Text>

                {product.variants.map((item: any, index: number) => (
                  <View key={index} style={styles.variantRow}>
                    <Text style={styles.variantText}>
                      {item.size} - {item.color}
                    </Text>

                    <Text
                      style={[
                        styles.variantStock,
                        item.stock === 0 && { color: 'red' },
                      ]}
                    >
                      {item.stock} units
                    </Text>
                  </View>
                ))}
              </>
            )}

            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.moreBtn}>
                <Text style={styles.moreText}>More</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.editBtn}>
                <Text style={styles.editText}>Edit Product</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default StoreProductDetail;
