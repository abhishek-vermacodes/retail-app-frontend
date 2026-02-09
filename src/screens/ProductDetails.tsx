import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const ProductDetailsScreen = () => {
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
          source={require('../assets/images/bag.jpeg')}
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

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff5f0',
    paddingHorizontal: 20,
    paddingTop: 60,
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginBottom: 10,
    position: 'relative',
  },
  backBtn: {
    borderColor: '#000000a3',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 50,
  },
  pageTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#000',
  },
  menuBtn: {
    position: 'absolute',
    right: 0,
  },

  productImage: {
    width: '100%',
    height: 260,
    borderRadius: 20,
    marginTop: 10,
  },

  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  productName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
  },
  price: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#ff5b27',
  },

  statusRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 6,
    alignItems: 'center',
  },

  stockStatusBadge: {
    backgroundColor: '#277a0022',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  stockStatusBadgeText: {
    color: '#277a00',
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
  },
  stockBadge: {
    backgroundColor: '#dddddd',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  stockBadgeText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
  },

  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 16,
  },
  infoCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
  },
  infoLabel: {
    fontSize: 12,
    color: '#000000a3',
    fontFamily: 'Poppins-Regular',
  },
  infoValue: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    marginTop: 4,
  },

  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    marginTop: 20,
  },
  description: {
    fontSize: 13,
    color: '#000000a3',
    marginTop: 6,
    lineHeight: 20,
    fontFamily: 'Poppins-Regular',
  },

  variantRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  variantText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  variantStock: {
    fontSize: 14,
    color: '#000000a3',
    fontFamily: 'Poppins-Regular',
  },

  actionRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
    marginBottom: 40,
  },
  moreBtn: {
    flex: 1,
    backgroundColor: '#ffe3d9',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
  },
  moreText: {
    color: '#ff5b27',
    fontFamily: 'Poppins-SemiBold',
  },
  editBtn: {
    flex: 1,
    backgroundColor: '#ff5b27',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
  },
  editText: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
  },
});
