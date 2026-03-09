import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Image,
} from 'react-native';

import styles from './productDetailForCustomer.styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import API from '../../api/authApi';
import { getToken } from '../../utils/storage';

const ProductDetailForCustomer = () => {
  const navigation = useNavigation<any>();

  const route = useRoute<any>();
  const { id } = route.params;

  const [product, setProduct] = useState<any | null>();
  const [like, setLike] = useState(false);

  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     const token = await getToken();
  //     try {
  //       const response = await API.get(
  //         `/api/products/getProductForCustomerById/${id}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         },
  //       );
  //       console.log(response.data.product);
  //       setProduct(response.data.product);
  //     } catch (error) {
  //       console.log('Failed to Fetch Product', error);
  //     }
  //   };

  //   fetchProduct();
  // }, [id]);

  // const getStockStatus = (stock: any) => {
  //   if (stock <= 0) return 'Out of Stock';
  //   if (stock < 60) return 'Low Stock';
  //   return 'Active';
  // };

  useEffect(() => {
    const getProduct = async () => {
      const token = await getToken();
      try {
        const response = await API.get(
          `/api/product/getProductForCustomerById/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setProduct(response.data.product);
      } catch (error) {
        console.log('Failed to fetch product', error);
      }
    };
    getProduct();
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={18} color="#000" />
        </TouchableOpacity>

        <Text style={styles.pageTitle}>{product?.productName}</Text>
        <TouchableOpacity
          style={styles.likeButton}
          onPress={() => setLike(prev => !prev)}
        >
          {like ? (
            <Ionicons name="heart" size={18} color={'red'} />
          ) : (
            <Ionicons name="heart-outline" size={18} color={'red'} />
          )}
        </TouchableOpacity>
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
                uri: `http://192.168.1.12:5000${product?.image}`,
              }}
            />
          </View>

          <View style={styles.productContentContainer}>
            <View style={styles.productSubContentContainer}>
              <View style={styles.productNameContainer}>
                <Text style={styles.productName}>{product?.productName}</Text>
              </View>
              <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.decreamentBtn}>
                  <FontAwesome6 name="minus" size={14} color={'#000'} />
                </TouchableOpacity>
                <Text style={styles.quantityText}>1</Text>
                <TouchableOpacity style={styles.increamentBtn}>
                  <FontAwesome6 name="plus" size={14} color={'#fff'} />
                </TouchableOpacity>
              </View>
            </View>

            {/* <View style={styles.productSubContentContainer}>
              <Text></Text>
            </View> */}

            <Text style={styles.descritpionText}>{product?.description}</Text>

            {/* <View style={styles.nameContainer}>
              <Text style={styles.productTitle}>{product?.productName}</Text>

              <Text style={styles.productPrice}>₹ {product?.price}.00</Text>
            </View> */}

            {/* <View style={styles.stockContainer}>
              <View style={styles.stockStatusBadge}>
                <Text style={styles.stockStatusBadgeText}>
                  {getStockStatus(product?.stock)}
                </Text>
              </View>

              <View style={styles.stockBadge}>
                <Text style={styles.stockBadgeText}>
                  {product?.stock} in Stock
                </Text>
              </View>
            </View> */}

            {/* <View style={styles.infoGrid}>
              <View style={styles.infoCard}>
                <Text style={styles.infoLabel}>Category</Text>
                <Text style={styles.infoValue}>{product?.category}</Text>
              </View>

              <View style={styles.infoCard}>
                <Text style={styles.infoLabel}>SKU</Text>
                <Text style={styles.infoValue}>{product?.sku || 'N/A'}</Text>
              </View>

              <View style={styles.infoCard}>
                <Text style={styles.infoLabel}>Sold</Text>
                <Text style={styles.infoValue}>{product?.sold || 0}</Text>
              </View>

              <View style={styles.infoCard}>
                <Text style={styles.infoLabel}>Revenue</Text>
                <Text style={styles.infoValue}>
                  ₹ {(product?.sold || 0) * product?.price}
                </Text>
              </View>
            </View> */}

            {/* <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>
              {product?.description || 'No description available'}
            </Text> */}

            {/* {product.variants?.length > 0 && (
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
            )} */}

            {/* <View style={styles.actionRow}>
              <TouchableOpacity style={styles.moreBtn}>
                <Text style={styles.moreText}>More</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.editBtn}>
                <Text style={styles.editText}>Edit Product</Text>
              </TouchableOpacity>
            </View> */}
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cartButton}>
          <Text style={styles.cartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetailForCustomer;
