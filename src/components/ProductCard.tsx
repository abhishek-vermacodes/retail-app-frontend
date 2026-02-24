import { Image, StyleSheet, Text, View } from 'react-native';
import API from '../api/authApi';

interface ProductCardProps {
  image: string;
  name: string;
  price: number;
  onAddToCart?: () => void;
}

const ProductCard = ({ image, name, price }: ProductCardProps) => {
  const imageUrl = image?.startsWith('http') ? image : `${API}${image}`;

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />

      <Text style={styles.name} numberOfLines={2}>
        {name}
      </Text>

      <Text style={styles.price}>₹ {price}</Text>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ffe3d9',
  },
  image: {
    width: '100%',
    height: 110,
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
  },
  name: {
    marginTop: 8,
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    color: '#000',
  },
  price: {
    marginTop: 4,
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#ff5b27',
  },
});
