import { useNavigation, useRoute } from '@react-navigation/native';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

import Entypo from 'react-native-vector-icons/Entypo';

const MyProduct = () => {
  const route = useRoute<any>();
  const { id } = route.params;
  const navigation = useNavigation<any>();
  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome6 name="arrow-left" size={18} color="#000" />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>My Product</Text>
        <Entypo
          name="dots-three-vertical"
          size={22}
          color={'#000'}
          style={styles.searchBtn}
        />
      </View>

      <View style={styles.productMainContainer}>
        <View style={styles.productImgContainer}>
          <Image
            style={styles.productImg}
            source={require('../assets/images/bag.jpeg')}
          />
        </View>
        <View style={styles.productContentContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.productTitle}>Classic Cotton Bag</Text>
            <Text style={styles.productPrice}>₹ 500.00</Text>
          </View>
          <View style={styles.stockContainer}>
            <View style={styles.stockStatusBadge}>
              <Text style={styles.stockStatusBadgeText}>Active</Text>
            </View>
            <View style={styles.stockBadge}>
              <Text style={styles.stockBadgeText}>140 in Stock</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default MyProduct;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff5f0',
    paddingHorizontal: 20,
    paddingVertical: 60,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
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
  searchBtn: {
    position: 'absolute',
    right: 0,
  },
  productMainContainer: {
    marginTop: 20,
  },
  productImgContainer: {
    width: '100%',
    height: 360,
    resizeMode: 'center',
    borderRadius: 20,
  },
  productImg: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  productContentContainer: {
    marginTop: 20,
    flexDirection: 'column',
    gap: 10,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
  },
  productPrice: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#ff5b27',
  },
  stockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
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
});
