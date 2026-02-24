import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import LinearGradient from 'react-native-linear-gradient';
import { IMAGEAPI } from '../api/authApi';

const ShopDetailScreen = () => {
  const route = useRoute();
  const { shop } = route.params as any;
  const navigation = useNavigation<any>();
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    // <View style={styles.container}>
    <LinearGradient
      start={{ x: 1.2, y: 0 }}
      end={{ x: 0, y: 0.6 }}
      colors={['#ff693299', '#ffffff']}
      locations={[0, 0.6]}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" />
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome6 name="arrow-left" size={18} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>{shop.storeName}</Text>
        <Feather
          name="search"
          size={22}
          color={'#000'}
          style={styles.searchBtn}
          onPress={() => setIsVisible(prev => !prev)}
        />
      </View>

      {isVisible && (
        <View style={styles.searchContainer}>
          <Feather name="search" color={'#000000a3'} size={20} />
          <TextInput
            placeholder="Search for Products..."
            placeholderTextColor={'#000000a3'}
            style={styles.searchText}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.storeBanner}>
          <View style={styles.storeImgContainer}>
            <Image
              source={{
                // uri: `http://192.168.1.5:5000${shop.image}`,
                uri: `${IMAGEAPI}${shop.image}`
              }}
              style={styles.storeImg}
              resizeMode="cover"
            />
          </View>

          <View style={styles.storeContentContainer}>
            <View style={styles.storeContentSubContainer}>
              <Text style={styles.storeName}>{shop.storeName}</Text>

              <View style={styles.storeCategory}>
                <Text style={styles.storeCatgoryText}>{shop.category}</Text>
              </View>
            </View>

            <View>
              <View style={styles.storeAddressContainer}>
                <Ionicons
                  style={styles.storeLocationIcon}
                  name="location-outline"
                  size={18}
                  color="#ff6a32"
                />
                <Text style={styles.storeAddress}>{shop.address}</Text>
              </View>

              <View style={styles.storeAddressContainer}>
                <Feather name="phone" size={14} color="#ff6a32" />
                <Text style={styles.storeAddress}>+91 {shop.phone}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
    // </View>
  );
};

export default ShopDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F0',
    paddingVertical: 70,
    paddingHorizontal: 20,
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
  searchBtn: {
    position: 'absolute',
    right: 0,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ffe3d9',
    borderRadius: 50,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginTop: 20,
  },
  searchText: {
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
  scrollContent: {
    paddingBottom: 200,
  },
  storeBanner: {
    height: 280,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#ffe3d9',
    backgroundColor: '#fff',
    position: 'relative',
    marginTop: 20,
    marginBottom: 20,
  },
  storeImgContainer: {
    height: '60%',
    width: 'auto',
  },
  storeImg: {
    height: '100%',
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  storeContentContainer: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: 'column',
    borderRadius: 20,

    gap: 6,
    backgroundColor: '#fff',
  },
  storeContentSubContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  storeName: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#ff6a32',
  },
  storeCategory: {
    backgroundColor: '#ff6a32',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  storeCatgoryText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#fff',
    marginBottom: -1,
  },
  storeAddressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  storeLocationIcon: {
    marginLeft: -2,
    marginTop: -4,
  },
  storeAddress: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
});
