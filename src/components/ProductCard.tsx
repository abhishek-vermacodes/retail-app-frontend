import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ProductCardProps {
  image: any;
  name: string;
  price: number;
  onAddToCart?: () => void;
}

const ProductCard = ({ image, name, price, onAddToCart }: ProductCardProps) => {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} />

      <Text style={styles.name} numberOfLines={2}>
        {name}
      </Text>

      <Text style={styles.price}>${price.toFixed(2)}</Text>

      <TouchableOpacity style={styles.button} onPress={onAddToCart}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
}

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 10,
    marginBottom: 16,
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
  button: {
    marginTop: 8,
    backgroundColor: '#ffe3d9',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#ff5b27',
  },
});
