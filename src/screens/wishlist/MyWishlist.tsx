import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useWishlist } from '../../context/WishlistContext';
import { useNavigation } from '@react-navigation/native';
import styles from './MyWishlist.styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const MyWishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const navigation = useNavigation<any>();

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Ionicons name="arrow-back" size={18} color="#000" />
        </TouchableOpacity>

        <Text style={styles.pageTitle}>My Wishlist</Text>

        <TouchableOpacity style={styles.likeButton}>
          <Entypo name="dots-three-vertical" size={18} />
        </TouchableOpacity>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={wishlist}
        keyExtractor={item => item.id}
        contentContainerStyle={
          wishlist.length === 0 ? styles.emptyContainer : undefined
        }
        renderItem={({ item }) => (
          <View style={styles.productcardContainer}>
            <TouchableOpacity
              style={styles.productcard}
              onPress={() =>
                navigation.navigate('ProductDetailForCustomer', {
                  id: item.id,
                })
              }
            >
              <View style={styles.ImageContainer}>
                <Image
                  style={styles.Image}
                  source={{
                    uri: `http://192.168.1.15:5000${item.image}`,
                  }}
                />
              </View>

              <View style={styles.shopContentContainer}>
                <Text style={styles.productNameText}>{item.productName}</Text>
                <Text style={styles.ratingText}>₹ {item.price}</Text>
                <View style={styles.ratingContainer}>
                  <FontAwesome name="star" size={16} color={'#ffc905'} />
                  <Text style={styles.ratingText}>4.9 (185)</Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={e => {
                  e.stopPropagation();
                  removeFromWishlist(item.id);
                }}
              >
                <Ionicons name="heart" size={22} color="red" />
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="heart-outline" size={60} color="#ccc" />
            <Text style={styles.emptyText}>Your wishlist is empty</Text>
            <Text style={styles.emptyTextdesc}>
              Start adding products you love ❤️
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default MyWishlist;
