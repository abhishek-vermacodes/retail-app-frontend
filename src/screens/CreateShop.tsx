import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  StatusBar,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';

import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { launchImageLibrary } from 'react-native-image-picker';

const categories = ['Grocery', 'Medicine', 'Electronics', 'Clothing', 'Food'];

const CreateShopScreen = () => {
  const [shop, setShop] = useState({
    shopName: '',
    shopCategory: '',
    shopDesc: '',
    shopAddress: '',
    shopImage: null as any,
  });

  const pickImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.8,
      },
      response => {
        if (!response.didCancel && response.assets?.length) {
          setShop({
            ...shop,
            shopImage: response.assets[0],
          });
        }
      },
    );
  };
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
        <Text style={styles.headerTitle}>Create Shop</Text>
      </View>
      <View style={styles.form}>
        <View style={styles.logoInputContainer}>
          <TouchableOpacity style={styles.card} onPress={pickImage}>
            {shop.shopImage ? (
              <Image
                source={{ uri: shop.shopImage.uri }}
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
          <Text style={styles.InputLabel}>Shop Name</Text>
          <View style={styles.inputSubContainer}>
            <Image
              source={require('../assets/icons/shopGray.png')}
              style={styles.shopIcon}
            />
            <TextInput
              placeholder="My awesome store"
              placeholderTextColor={'#000'}
              style={styles.input}
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
                  shop.shopCategory === item && styles.categoryChipActive,
                ]}
                onPress={() => setShop({ ...shop, shopCategory: item })}
              >
                <Text
                  style={[
                    styles.categoryText,
                    shop.shopCategory === item && styles.categoryTextActive,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.InputLabel}>Description</Text>
          <View style={styles.textAreaContainer}>
            <TextInput
              style={styles.textArea}
              placeholder="Write product description"
              placeholderTextColor="#000000"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.InputLabel}>Address</Text>
          <View style={styles.inputSubContainer}>
            <Feather name="map-pin" size={20} color={'#888'} />
            <TextInput
              placeholder="123 Market street, city"
              placeholderTextColor={'#000'}
              style={styles.input}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Launch Shop</Text>
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
    borderRadius: 16,
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
    borderRadius: 16,
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
    backgroundColor: '#ff5b27',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    marginBottom: 30,
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
