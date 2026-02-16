import { Image, StyleSheet, Text, View } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

interface NearbyShopCardProps {
  storeName: string;
  category: string;
  address: string;
  image: string;
}

const NearbyShopCard = ({
  image,
  storeName,
  category,
  address,
}: NearbyShopCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.shopCategory}>
        <Text style={styles.shopCategorytext}>{category}</Text>
      </View>
      <Image
        source={{
          uri: `http://192.168.1.5:5000${image}`,
        }}
        style={styles.image}
      />

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {storeName}
        </Text>

        <View style={styles.addressContainer}>
          <Ionicons name="location-outline" size={18   } color={'#ff6a32'} />
          <Text style={styles.addressText}>{address}</Text>
        </View>
      </View>
    </View>
  );
};

export default NearbyShopCard;

const styles = StyleSheet.create({
  card: {
    width: 250,
    backgroundColor: '#fff',
    borderRadius: 14,
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#ffe3d9',
    position: 'relative',
  },
  shopCategory: {
    position: 'absolute',
    right: 8,
    top: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: 'white',
    zIndex: 9999,
    borderRadius: 6,
  },
  shopCategorytext: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    bottom: -1,
  },
  image: {
    width: '100%',
    height: 100,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    backgroundColor: '#f2f2f2',
  },
  info: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  name: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: -2,
    marginLeft: -4
  },
  addressText: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#666',
    marginTop: 4,
  },
});
