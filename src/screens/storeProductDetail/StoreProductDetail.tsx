import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import styles from './storeProductDetail.styles';
import { useNavigation, useRoute } from '@react-navigation/native';

const StoreProductDetail = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { product } = route.params as any;
  console.log('product', product);
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
        <TouchableOpacity style={styles.likeButton}>
          <Entypo name="dots-three-vertical" size={18} color={'#000'} />
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
            <View style={styles.offerContainer}>
              <View style={styles.offer}>
                <Text style={styles.offerText}>50% OFF</Text>
              </View>
            </View>
          </View>

          <View style={styles.productContentContainer}>
            <Text style={styles.productCategory}>{product?.category}</Text>
            <Text style={styles.productName}>{product?.productName}</Text>

            <Text style={styles.descritpionText}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero sit
              ipsam laboriosam molestias doloribus sed fugiat a ducimus quo
              inventore quidem, architecto nam cupiditate, perspiciatis officiis
              enim mollitia, facere maiores!
            </Text>

            <View>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>Price</Text>
                <Text style={styles.label}>Ratings</Text>
              </View>
              <View style={styles.priceContainer}>
                <View style={styles.priceSubContainer}>
                  <Text style={styles.offerPrice}>$29.00</Text>
                  <Text style={styles.price}>$58.00</Text>
                </View>
                <Text style={styles.rating}>
                  <FontAwesome name="star" size={14} color={'#ffc905'} /> 4.9
                  (185 Reviews)
                </Text>
              </View>
            </View>

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
      {/* <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cartButton}>
          <Text style={styles.cartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default StoreProductDetail;
