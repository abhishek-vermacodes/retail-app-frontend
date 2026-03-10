import Modal from 'react-native-modal';
import styles from './storeProductDetail.styles';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';

import React, { useEffect, useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { categories, Product } from '../../types/type';
import { getToken } from '../../utils/storage';
import API from '../../api/authApi';

const StoreProductDetail = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { id } = route.params as any;

  const [product, setProduct] = useState<Product | null>();

  const [openModal, setOpenModal] = useState(false);
  const [updateProduct, setUpdateProduct] = useState({
    productName: '',
    price: '',
    stock: '',
    category: '',
    description: '',
    image: null as any,
  });

  const pickImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.8,
      },
      response => {
        if (!response.didCancel && response.assets?.length) {
          setUpdateProduct({
            ...updateProduct,
            image: response.assets[0],
          });
        }
      },
    );
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = await getToken();
        const response = await API.get(`/api/product/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProduct(response.data.product);
        console.log('res', response.data.product);
      } catch (error) {
        console.log('Failed to fetch product', error);
      }
    };

    fetchProduct();
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
            setUpdateProduct({
              productName: product?.productName || '',
              price: product?.price?.toString() || '',
              stock: product?.stock?.toString() || '',
              category: product?.category || '',
              description: product?.description || '',
              image: null,
            });
            setOpenModal(true);
          }}
        >
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
                <Text style={styles.offerText}>{product?.offers}% OFF</Text>
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

            <View style={styles.productSubContentContainer}>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>Stock</Text>
              </View>
              <View style={styles.priceContainer}>
                <View style={styles.priceSubContainer}>
                  <Text style={styles.offerPrice}>{product?.stock}</Text>
                </View>
              </View>
            </View>

            <View style={styles.productSubContentContainer}>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>Price</Text>
                {/* <Text style={styles.label}>Ratings</Text> */}
              </View>
              <View style={styles.priceContainer}>
                <View style={styles.priceSubContainer}>
                  <Text style={styles.offerPrice}>
                    ₹
                    {getOfferPrice(
                      Number(product?.price) || 0,
                      Number(product?.offers) || 0,
                    )}
                    .00
                  </Text>
                  <Text style={styles.price}>₹{product?.price}.00</Text>
                </View>
                {/* <Text style={styles.rating}>
                  <FontAwesome name="star" size={14} color={'#ffc905'} /> 4.9
                  (185 Reviews)
                </Text> */}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <Modal
        isVisible={openModal}
        onBackdropPress={() => setOpenModal(false)}
        style={styles.modal}
      >
        <View style={styles.drawer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.modalScrollView}
          >
            <TouchableOpacity
              style={styles.imageUploadCard}
              onPress={pickImage}
            >
              {updateProduct.image ? (
                <Image
                  source={{ uri: updateProduct.image.uri }}
                  style={styles.previewImage}
                />
              ) : (
                <>
                  <View style={styles.iconContainer}>
                    <Ionicons name="camera-outline" size={22} color="#ff5b27" />
                  </View>
                  <Text style={styles.cardTitle}>Upload Product Image</Text>
                  <Text style={styles.cardSubTitle}>
                    Tap to select an image from gallery
                  </Text>
                </>
              )}
            </TouchableOpacity>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Name</Text>
              <View style={styles.inputSubContainer}>
                <Feather
                  name="box"
                  size={20}
                  color="#00000061"
                  style={styles.icon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="e.g. Parle-G"
                  placeholderTextColor="#00000061"
                  value={updateProduct.productName}
                  onChangeText={text =>
                    setUpdateProduct({ ...updateProduct, productName: text })
                  }
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Price</Text>
              <View style={styles.inputSubContainer}>
                <MaterialIcons
                  name="currency-rupee"
                  size={20}
                  color="#00000061"
                  style={styles.icon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="200"
                  placeholderTextColor="#00000061"
                  autoCapitalize="none"
                  value={updateProduct.price}
                  onChangeText={number =>
                    setUpdateProduct({ ...updateProduct, price: number })
                  }
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Stock</Text>
              <View style={styles.inputSubContainer}>
                <Feather
                  name="grid"
                  size={20}
                  color="#00000061"
                  style={styles.icon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="20"
                  placeholderTextColor="#00000061"
                  autoCapitalize="none"
                  value={updateProduct.stock}
                  onChangeText={number =>
                    setUpdateProduct({ ...updateProduct, stock: number })
                  }
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Category</Text>

              <View style={styles.categoryRow}>
                {categories.slice(1).map(item => (
                  <TouchableOpacity
                    key={item.value}
                    style={[
                      styles.categoryBtn,
                      updateProduct.category === item.value &&
                        styles.categoryBtnActive,
                    ]}
                    onPress={() =>
                      setUpdateProduct({
                        ...updateProduct,
                        category: item.value,
                      })
                    }
                  >
                    <Text
                      style={[
                        styles.categoryText,
                        updateProduct.category === item.value &&
                          styles.categoryTextActive,
                      ]}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Description</Text>
              <View
                style={[styles.inputSubContainer, styles.textAreaContainer]}
              >
                <TextInput
                  style={styles.textArea}
                  placeholder="Write product description..."
                  placeholderTextColor="#00000061"
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  value={updateProduct.description}
                  onChangeText={text =>
                    setUpdateProduct({ ...updateProduct, description: text })
                  }
                />
              </View>
            </View>

            <TouchableOpacity
              style={styles.button}
              // onPress={handleUpdateProduct}
            >
              <Text style={styles.buttonText}>Update Product</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default StoreProductDetail;
