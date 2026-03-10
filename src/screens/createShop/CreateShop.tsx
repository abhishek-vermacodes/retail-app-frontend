import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  StatusBar,
  ScrollView,
  Alert,
} from 'react-native';

import API from '../../api/authApi';
import styles from './CreateShop.styles';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import { shopCategories } from '../../types/type';
import { getToken } from '../../utils/storage';

const CreateShop = () => {
  const navigation = useNavigation<any>();
  const [store, setStore] = useState({
    storeName: '',
    category: '',
    description: '',
    address: '',
    phone: '',
    image: null as any,
  });
  const [loading, setLoading] = useState(false);

  const pickImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.8,
      },
      response => {
        if (!response.didCancel && response.assets?.length) {
          setStore({
            ...store,
            image: response.assets[0],
          });
        }
      },
    );
  };

  const handleCreateShop = async () => {
    const formData = new FormData();

    formData.append('storeName', store.storeName);
    formData.append('category', store.category);
    formData.append('description', store.description);
    formData.append('address', store.address);
    formData.append('phone', store.phone);

    formData.append('image', {
      uri: store.image.uri,
      type: store.image.type || 'image/jpeg',
      name: store.image.fileName || 'product.jpg',
    } as any);

    if (
      !store.address ||
      !store.category ||
      !store.description ||
      !store.image ||
      !store.phone ||
      !store.storeName
    ) {
      Alert.alert('Warning', 'All Field are Required');
      return;
    }

    try {
      setLoading(true);

      const token = await getToken()

      await API.post('/api/store', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      Alert.alert('success', 'Store Created Successfully');
      setStore({
        storeName: '',
        category: '',
        description: '',
        address: '',
        phone: '',
        image: '',
      });
      navigation.navigate('RetailerHome');
    } catch (error) {
      console.log('Failed to create shop', error);
      Alert.alert('error', 'Failed to Create Shop');
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome6 name="arrow-left" size={18} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Shop</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
      >
        <View style={styles.form}>
          <View style={styles.logoInputContainer}>
            <TouchableOpacity style={styles.card} onPress={pickImage}>
              {store.image ? (
                <Image
                  source={{ uri: store.image.uri }}
                  style={styles.previewImage}
                />
              ) : (
                <>
                  <Ionicons name="camera-outline" size={20} color="#888" />
                  <Text style={styles.cardTitle}>Add Logo</Text>
                </>
              )}
            </TouchableOpacity>
            <Text style={styles.cardText}>Tap to upload shop logo</Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Store Name</Text>
            <View style={styles.inputSubContainer}>
              <Image
                source={require('../../assets/icons/shopGray.png')}
                style={styles.shopIcon}
              />
              <TextInput
                placeholder="My awesome store"
                placeholderTextColor={'#888'}
                style={styles.input}
                value={store.storeName}
                onChangeText={text => setStore({ ...store, storeName: text })}
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Category</Text>

            <View style={styles.categoryRow}>
              {shopCategories.map(item => (
                <TouchableOpacity
                  key={item}
                  style={[
                    styles.categoryChip,
                    store.category === item && styles.categoryChipActive,
                  ]}
                  onPress={() => setStore({ ...store, category: item })}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      store.category === item && styles.categoryTextActive,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Address</Text>
            <View style={styles.inputSubContainer}>
              <Feather name="map-pin" size={20} color={'#888'} />
              <TextInput
                placeholder="123 Market street, city"
                placeholderTextColor={'#888'}
                style={styles.input}
                value={store.address}
                onChangeText={text => setStore({ ...store, address: text })}
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Phone</Text>
            <View style={styles.inputSubContainer}>
              <Feather name="phone" size={20} color={'#888'} />
              <TextInput
                placeholder="+91 1231231231"
                placeholderTextColor={'#888'}
                style={styles.input}
                value={store.phone}
                onChangeText={text => setStore({ ...store, phone: text })}
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Description</Text>
            <View style={styles.textAreaContainer}>
              <TextInput
                style={styles.textArea}
                placeholder="Write product description"
                placeholderTextColor="#888"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                value={store.description}
                onChangeText={text => setStore({ ...store, description: text })}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleCreateShop}>
            <Text style={styles.buttonText}>
              {loading ? 'Loading...' : 'Launch Shop'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default CreateShop;
