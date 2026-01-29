import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  StatusBar,
  ScrollView,
  Alert,
} from 'react-native';
import React, { useState } from 'react';

import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const categories = ['Grocery', 'Medicine', 'Electronics', 'Clothing', 'Food'];

const CreateShopScreen = () => {
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

  const createShop = async () => {
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

    try {
      setLoading(true);

      const token = await AsyncStorage.getItem('token');

      await axios.post('http://192.168.1.3:5000/api/store', formData, {
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
      navigation.navigate('Retailer');
    } catch (error) {
      console.log('Failed to create shop', error);
      Alert.alert('error', 'Failed to Create Shop');
    }
  };
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerBtn}
          onPress={() => navigation.navigate('Retailer')}
        >
          <FontAwesome6 name="arrow-left" size={18} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Shop</Text>
      </View>
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
          <Text style={styles.InputLabel}>Store Name</Text>
          <View style={styles.inputSubContainer}>
            <Image
              source={require('../assets/icons/shopGray.png')}
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
          <Text style={styles.InputLabel}>Category</Text>

          <View style={styles.categoryRow}>
            {categories.map(item => (
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
          <Text style={styles.InputLabel}>Address</Text>
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
          <Text style={styles.InputLabel}>Phone</Text>
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
          <Text style={styles.InputLabel}>Description</Text>
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

        <TouchableOpacity style={styles.button} onPress={createShop}>
          <Text style={styles.buttonText}>
            {loading ? 'Loading...' : 'Launch Shop'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CreateShopScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    paddingVertical: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
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
  form: {
    flexDirection: 'column',
    gap: 24,
    marginTop: 40,
  },
  inputContainer: {
    flexDirection: 'column',
    gap: 6,
  },
  InputLabel: {
    fontSize: 14,
    color: '#000',
    fontFamily: 'Poppins-Medium',
  },
  inputSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  input: {
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryChip: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#00000061',
  },
  categoryChipActive: {
    backgroundColor: '#ff5b27',
    borderColor: '#ff5b27',
  },
  categoryText: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
  categoryTextActive: {
    color: '#fff',
  },
  textAreaContainer: {
    height: 120,
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  textArea: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
  logoInputContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    height: 110,
    width: 110,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#bbb',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  cardTitle: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    marginTop: 2,
  },
  cardText: {
    fontSize: 12,
    color: '#ff5b27',
    marginTop: 10,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  previewImage: {
    width: 110,
    height: 110,
    borderRadius: 100,
  },
  button: {
    height: 60,
    backgroundColor: '#ff5b27',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  shopIcon: {
    height: 25,
    width: 25,
  },
});
