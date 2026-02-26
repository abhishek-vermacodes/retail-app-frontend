import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  FlatList,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import styles from './ShopDetails.styles';
import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { categories } from '../../types/type';

const ShopDetailScreen = () => {
  const route = useRoute();
  const { shop } = route.params as any;
  const navigation = useNavigation<any>();
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <LinearGradient
      start={{ x: 1.2, y: 0 }}
      end={{ x: 0, y: 0.6 }}
      colors={['#ff693299', '#ffffff']}
      locations={[0, 0.6]}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <View style={styles.subHeader}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.navigate('CustomerHome')}
          >
            <FontAwesome6 name="arrow-left" size={18} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.pageTitle}>{shop.storeName}</Text>
        </View>
        <Feather
          name="search"
          size={22}
          color={'#000'}
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
        <View style={styles.subContainer}>
          <View style={styles.storeBanner}>
            <View style={styles.storeImgContainer}>
              <Image
                source={{
                  uri: `http://192.168.1.12:5000${shop.image}`,
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

          <View>
            <FlatList
              data={categories}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryContainer}
              renderItem={({ item }) => {
                const isActive = selectedCategory === item.value;

                return (
                  <TouchableOpacity
                    onPress={() => setSelectedCategory(item.value)}
                    style={[
                      styles.categoryBtn,
                      isActive && styles.categoryBtnActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.categoryText,
                        isActive && styles.categoryTextActive,
                      ]}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default ShopDetailScreen;
