

import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Image,
} from 'react-native';

import API from '../../api/authApi';
import styles from './productDetailForCustomer.styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

import { useEffect, useState } from 'react';
import { getToken } from '../../utils/storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext'; 

const ProductDetailForCustomer = () => {
  const navigation = useNavigation<any>();
  const { addToCart } = useCart();

  const { addToWishlist, removeFromWishlist, isLiked } = useWishlist(); 

  const route = useRoute<any>();
  const { id } = route.params;

  const [product, setProduct] = useState<any | null>(null); 

  const liked = isLiked(product?.id); 

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
  }, [id]);

  const getOfferPrice = (price: number, offer: number) => {
    const offerAmount = (price * offer) / 100;
    const finalPrice = price - offerAmount;
    return finalPrice;
  };

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
          onPress={() => {
            if (!product) return;

            if (liked) {
              removeFromWishlist(product.id);
            } else {
              addToWishlist({
                id: product.id,
                productName: product.productName,
                price: Number(product.price),
                image: product.image,
              });
            }
          }}
        >
          {liked ? (
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
                uri: `http://192.168.1.4:3000${product?.image}`,
              }}
            />

            <View
              style={[
                styles.stockBadgeContainer,
                product?.stock === 0 && styles.outOfStockBadgeContainer,
              ]}
            >
              <Text
                style={[
                  styles.stockBadgeText,
                  product?.stock === 0 && styles.outOfStockBadgeText,
                ]}
              >
                {product?.stock === 0 ? 'Out of Stock' : 'In Stock'}
              </Text>
            </View>

            <View style={styles.offerContainer}>
              <View style={styles.offer}>
                <Text style={styles.offerText}>{product?.offers}% OFF</Text>
              </View>
            </View>
          </View>

          <View style={styles.productContentContainer}>
            <View style={styles.productSubContentContainer}>
              <View style={styles.productNameContainer}>
                <Text style={styles.categoryText}>{product?.category}</Text>
                <Text style={styles.productName}>{product?.productName}</Text>
              </View>

              <View style={styles.priceContainer}>
                <View style={styles.priceSubContainer}>
                  <Text style={styles.offerPriceText}>
                    ₹{' '}
                    {getOfferPrice(
                      Number(product?.price) || 0,
                      Number(product?.offers) || 0,
                    )}
                    .00
                  </Text>
                  <Text style={styles.priceText}>₹ {product?.price}.00</Text>
                </View>

                <View style={styles.ratingContainer}>
                  <FontAwesome name="star" size={16} color={'#ffc905'} />
                  <Text style={styles.ratingText}>4.9 (185)</Text>
                </View>
              </View>

              <View style={styles.descriptionContainer}>
                <Text style={styles.label}>Description</Text>
                <Text style={styles.descritpionText}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Omnis, impedit laudantium ipsam aut natus dolorem!
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.extraDetailContainer}>
            <View style={styles.infoContainer}>
              <FontAwesome
                name="user"
                color={'#ff5b27'}
                size={18}
                style={styles.infoIcon}
              />
              <Text style={styles.infoTitle}>24/7</Text>
              <Text style={styles.infoSubTitle}>Support</Text>
            </View>

            <View style={styles.verticalLine} />

            <View style={styles.infoContainer}>
              <FontAwesome6
                name="arrow-rotate-left"
                size={18}
                style={styles.infoIcon}
                color={'#ff5b27'}
              />
              <Text style={styles.infoTitle}>72 hours</Text>
              <Text style={styles.infoSubTitle}>Replacement</Text>
            </View>

            <View style={styles.verticalLine} />

            <View style={styles.infoContainer}>
              <FontAwesome6
                name="truck-fast"
                size={18}
                style={styles.infoIcon}
                color={'#ff5b27'}
              />
              <Text style={styles.infoTitle}>Fast</Text>
              <Text style={styles.infoSubTitle}>Delivery</Text>
            </View>
          </View>

          {product?.store && (
            <View>
              <Text style={styles.shopSectionTitle}>Sold By</Text>
              <TouchableOpacity
                style={styles.shopContainer}
                onPress={() =>
                  navigation.navigate('ShopForCustomer', {
                    shop: product?.store,
                  })
                }
              >
                <Image
                  style={styles.shopImage}
                  source={{
                    uri: `http://192.168.1.4:3000${product?.store?.image}`,
                  }}
                />

                <View style={styles.shopContentContainer}>
                  <Text style={styles.shopCategoryText}>
                    {product?.store?.category}
                  </Text>
                  <Text style={styles.shopNameText} numberOfLines={1}>
                    {product?.store?.storeName}
                  </Text>

                  <View style={styles.shopRatingLocationRow}>
                    <View style={styles.shopRatingContainer}>
                      <FontAwesome name="star" size={12} color={'#ffc905'} />
                      <Text style={styles.shopRatingText}>4.9 (185)</Text>
                    </View>
                    <View style={styles.bulletSeparator} />
                    <View style={styles.shopLocationContainer}>
                      <Ionicons name="location" size={12} color="#ff6a32" />
                      <Text style={styles.shopLocationText} numberOfLines={1}>
                        {product?.store?.address}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.visitStoreBtn}>
                  <FontAwesome6 name="angle-right" size={16} color="#ff5b27" />
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <View style={styles.priceInfoContainer}>
          <Text style={styles.priceLabel}>Total Price</Text>
          <Text style={styles.priceValue}>
            ₹
            {getOfferPrice(
              Number(product?.price) || 0,
              Number(product?.offers) || 0,
            ).toFixed(2)}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => {
            if (!product) return;

            addToCart({
              id: product.id,
              productName: product.productName,
              price: Number(product.price),
              image: product.image,
            });

            navigation.navigate('Cart');
          }}
        >
          <Ionicons
            name="bag-handle-outline"
            size={18}
            color="#fff"
            style={styles.cartIcon}
          />
          <Text style={styles.cartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetailForCustomer;