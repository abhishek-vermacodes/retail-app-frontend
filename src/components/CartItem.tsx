import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface CartItemProps {
  image: any;
  name: string;
  price: number;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onDelete: () => void;
}

function CartItem({
  image,
  name,
  price,
  quantity,
  onIncrease,
  onDecrease,
  onDelete,
}: CartItemProps) {
  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.deleteBtn} onPress={onDelete}>
        <MaterialIcons name="delete-outline" size={20} color="#ff3b30" />
      </TouchableOpacity>

      <Image source={image} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>
          {name}
        </Text>

        <View style={styles.row}>
          <Text style={styles.price}>${price.toFixed(2)}</Text>

          <View style={styles.qtyRow}>
            <TouchableOpacity onPress={onDecrease}>
              <FontAwesome6 name="minus" size={12} color="#ff5b27" />
            </TouchableOpacity>

            <Text style={styles.qty}>{quantity}</Text>

            <TouchableOpacity onPress={onIncrease}>
              <FontAwesome6 name="plus" size={12} color="#ff5b27" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

export default CartItem;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 12,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#ffe3d9',
    position: 'relative',
  },
  deleteBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
  },
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#000',
  },
  price: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#ff5b27',
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff5f0',
    gap: 12,
    borderWidth: 1,
    borderColor: '#ff5b27',
    paddingHorizontal: 15,
    paddingVertical: 4,
    borderRadius: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  qty: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
});
