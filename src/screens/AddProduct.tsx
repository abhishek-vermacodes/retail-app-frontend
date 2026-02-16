import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary } from 'react-native-image-picker';
import { Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import API from '../api/authApi';

const categories = [
  { label: 'Select category', value: '' },
  { label: 'Grocery', value: 'grocery' },
  { label: 'Fresh Items', value: 'fresh' },
  { label: 'Personalcare', value: 'personal' },
  { label: 'Household', value: 'home' },
  { label: 'Babycare', value: 'baby' },
  { label: 'Healthcare', value: 'health' },
  { label: 'Fashion', value: 'fashion' },
  { label: 'Electronic', value: 'electronic' },
  { label: 'Stationery', value: 'stationery' },
];

const AddProductScreen = () => {
  const navigation = useNavigation<any>();

  const [product, setProduct] = useState({
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
          setProduct({
            ...product,
            image: response.assets[0],
          });
        }
      },
    );
  };

  const createProduct = async () => {
    const formData = new FormData();

    formData.append('productName', product.productName);
    formData.append('price', product.price);
    formData.append('stock', product.stock);
    formData.append('category', product.category);
    formData.append('description', product.description);
    formData.append('image', {
      uri: product.image.uri,
      type: product.image.type || 'image/jpeg',
      name: product.image.fileName || 'product.jpg',
    } as any);

    const token = await AsyncStorage.getItem('token');
    console.log('token', token);
    try {
      await axios.post(`${API}/api/products`, formData, {
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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle={'dark-content'} />
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome6 name="arrow-left" size={18} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Create Product</Text>
      </View>

      <TouchableOpacity style={styles.card} onPress={pickImage}>
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
            <Text style={styles.cardText}>
              Tap to select an image from gallery
            </Text>
          </>
        )}
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <View style={styles.inputWrapper}>
          <Feather name="box" size={20} color="#00000061" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="e.g. Parle-G"
            placeholderTextColor="#00000061"
            value={product.productName}
            onChangeText={text => setProduct({ ...product, productName: text })}
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Price</Text>
        <View style={styles.inputWrapper}>
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
            onChangeText={number => setProduct({ ...product, price: number })}
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Stock</Text>
        <View style={styles.inputWrapper}>
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
            onChangeText={number => setProduct({ ...product, stock: number })}
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Category</Text>

        <View style={styles.categoryRow}>
          {categories.slice(1).map(item => (
            <TouchableOpacity
              key={item.value}
              style={[
                styles.categoryBtn,
                product.category === item.value && styles.categoryBtnActive,
              ]}
              onPress={() => setProduct({ ...product, category: item.value })}
            >
              <Text
                style={[
                  styles.categoryText,
                  product.category === item.value && styles.categoryTextActive,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Description</Text>
        <View style={[styles.inputWrapper, styles.textAreaWrapper]}>
          <TextInput
            style={styles.textArea}
            placeholder="Write product description..."
            placeholderTextColor="#00000061"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            value={product.description}
            onChangeText={text => setProduct({ ...product, description: text })}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={createProduct}>
        <Text style={styles.buttonText}>Create Product</Text>
      </TouchableOpacity>

      <View style={styles.screenView} />
    </ScrollView>
  );
};

export default AddProductScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 60,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    position: 'relative',
  },
  backBtn: {
    borderColor: '#bbb',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 50,
  },
  pageTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
  },
  card: {
    backgroundColor: '#FFF5F0',
    marginTop: 20,
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ffe3d9',
  },
  previewImage: {
    width: '100%',
    height: 120,
    borderRadius: 12,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
    backgroundColor: '#ffe3d9',
    padding: 12,
    borderRadius: 100,
  },
  cardTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    marginTop: 16,
    color: '#ff5b27',
  },
  cardText: {
    fontSize: 12,
    color: '#000000a3',
    textAlign: 'center',
    marginTop: -2,
    fontFamily: 'Poppins-Regular',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 5,
    fontFamily: 'Poppins-Medium',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#00000061',
    paddingHorizontal: 14,
    height: 50,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },

  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryBtn: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#00000061',
  },
  categoryBtnActive: {
    backgroundColor: '#ff5b27',
    borderColor: '#ff5b27',
  },
  categoryText: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
  categoryTextActive: {
    color: '#fff',
  },
  textAreaWrapper: {
    height: 120,
    alignItems: 'flex-start',
  },
  textArea: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  button: {
    height: 60,
    backgroundColor: '#ff5b27',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  screenView: {
    height: 160,
  },
});
