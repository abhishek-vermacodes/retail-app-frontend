import {
  Alert,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import React from 'react';
import API from '../../api/authApi';
import styles from './CreateProduct.styles';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useState } from 'react';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import { categories, productOffers } from '../../types/type';

const CreateProduct = () => {
  const navigation = useNavigation<any>();

  const [product, setProduct] = useState({
    productName: '',
    price: '',
    stock: '',
    category: '',
    offers: '',
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
          setProduct({
            ...product,
            image: response.assets[0],
          });
        }
      },
    );
  };

  const handleCreateProduct = async () => {
    const formData = new FormData();

    formData.append('productName', product.productName);
    formData.append('price', product.price);
    formData.append('stock', product.stock);
    formData.append('category', product.category);
    formData.append('offers', product.offers);
    formData.append('description', product.description);
    formData.append('image', {
      uri: product.image.uri,
      type: product.image.type || 'image/jpeg',
      name: product.image.fileName || 'product.jpg',
    } as any);

    const token = await AsyncStorage.getItem('token');
    console.log('token', token);

    if (
      !product.category ||
      !product.description ||
      !product.image ||
      !product.price ||
      !product.productName ||
      !product.stock ||
      !product.offers
    ) {
      Alert.alert('Warning', 'All Field are Required');
      return;
    }
    try {
      await API.post('/api/product', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setProduct({
        productName: '',
        price: '',
        stock: '',
        category: '',
        description: '',
        image: '',
        offers: '',
      });
      Alert.alert('Success', 'Product created successfully');
      setTimeout(() => {
        navigation.navigate('MyProducts');
      }, 3000);
    } catch (error) {
      console.error('Product creation failed', error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
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
        <View style={styles.form}>
          <TouchableOpacity style={styles.imageUploadCard} onPress={pickImage}>
            {product.image ? (
              <Image
                source={{ uri: product.image.uri }}
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
            <Text style={styles.inputLabel}>Product Name</Text>
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
                value={product.productName}
                onChangeText={text =>
                  setProduct({ ...product, productName: text })
                }
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Total Price</Text>
            <View style={styles.inputSubContainer}>
              <Icon
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
                value={product.price}
                onChangeText={number =>
                  setProduct({ ...product, price: number })
                }
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Offers</Text>

            <View style={styles.categoryRow}>
              {productOffers.map(offer => (
                <TouchableOpacity
                  key={offer.value}
                  style={[
                    styles.categoryBtn,
                    product.offers === offer.value && styles.categoryBtnActive,
                  ]}
                  onPress={() =>
                    setProduct({ ...product, offers: offer.value })
                  }
                >
                  <Text
                    style={[
                      styles.categoryText,
                      product.offers === offer.value &&
                        styles.categoryTextActive,
                    ]}
                  >
                    {offer.label}
                  </Text>
                </TouchableOpacity>
              ))}
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
                value={product.stock}
                onChangeText={number =>
                  setProduct({ ...product, stock: number })
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
                    product.category === item.value && styles.categoryBtnActive,
                  ]}
                  onPress={() =>
                    setProduct({ ...product, category: item.value })
                  }
                >
                  <Text
                    style={[
                      styles.categoryText,
                      product.category === item.value &&
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
            <View style={[styles.inputSubContainer, styles.textAreaContainer]}>
              <TextInput
                style={styles.textArea}
                placeholder="Write product description..."
                placeholderTextColor="#00000061"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                value={product.description}
                onChangeText={text =>
                  setProduct({ ...product, description: text })
                }
              />
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleCreateProduct}>
            <Text style={styles.buttonText}>Create Product</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default CreateProduct;
