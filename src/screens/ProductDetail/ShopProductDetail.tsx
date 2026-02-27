import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';

import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

import { useNavigation } from '@react-navigation/native';
import styles from './ShopProductDetail.styles';

const ShopProductDetail = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.mainContainer}>
      {/* HEADER */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome6 name="arrow-left" size={18} color="#000" />
        </TouchableOpacity>

        <Text style={styles.pageTitle}>Product Details</Text>

        <Feather name="share" size={22} color="#000" style={styles.menuBtn} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* IMAGE */}
        <Image
          source={require('../../assets/images/bag.jpeg')}
          style={styles.productImage}
        />

        {/* TITLE + PRICE */}
        <View style={styles.titleRow}>
          <Text style={styles.productName}>Classic Cotton Tee</Text>
          <Text style={styles.price}>$24.00</Text>
        </View>

        {/* STATUS */}
        <View style={styles.statusRow}>
          <View style={styles.stockStatusBadge}>
            <Text style={styles.stockStatusBadgeText}>Active</Text>
          </View>
          <View style={styles.stockBadge}>
            <Text style={styles.stockBadgeText}>140 in Stock</Text>
          </View>
        </View>

        {/* INFO CARDS */}
        <View style={styles.infoGrid}>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Category</Text>
            <Text style={styles.infoValue}>Clothing</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>SKU</Text>
            <Text style={styles.infoValue}>TSH-001-BE</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Sold</Text>
            <Text style={styles.infoValue}>1,204</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Revenue</Text>
            <Text style={styles.infoValue}>$28,896</Text>
          </View>
        </View>

        {/* DESCRIPTION */}
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>
          Crafted from premium organic cotton, this classic tee offers
          breathable comfort and a timeless fit. Perfect for everyday wear, it
          features reinforced stitching and a ribbed crew neck for durability.
        </Text>

        {/* VARIANTS */}
        <Text style={styles.sectionTitle}>Variants & Stock</Text>

        {[
          { size: 'Small', color: 'Beige', stock: 42 },
          { size: 'Medium', color: 'Beige', stock: 56 },
          { size: 'Large', color: 'Beige', stock: 26 },
          { size: 'XL', color: 'Beige', stock: 0 },
        ].map((item, index) => (
          <View key={index} style={styles.variantRow}>
            <Text style={styles.variantText}>
              {item.size} - {item.color}
            </Text>
            <Text
              style={[
                styles.variantStock,
                item.stock === 0 && { color: 'red' },
              ]}
            >
              {item.stock} units
            </Text>
          </View>
        ))}

        {/* ACTION BUTTONS */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.moreBtn}>
            <Text style={styles.moreText}>More</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.editBtn}>
            <Text style={styles.editText}>Edit Product</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ShopProductDetail;
