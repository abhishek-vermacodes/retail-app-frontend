import { Image, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';


interface NearbyShopCardProps {
  image: any;
  name: string;
  rating: number;
  distance: number;
}

const NearbyShopCard = ({
  image,
  name,
  rating,
  distance,
}: NearbyShopCardProps) => {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>

        <View style={styles.metaRow}>
          <View style={styles.ratingRow}>
            <Icon name="star" size={12} color="#ffb703"  />
            <Text style={styles.ratingText}>{rating}</Text>
          </View>

          <Text style={styles.dot}>•</Text>
          <Text style={styles.distance}>{distance} km</Text>
        </View>
      </View>
    </View>
  );
}

export default NearbyShopCard;

const styles = StyleSheet.create({
  card: {
    width: 250,
    backgroundColor: '#fff',
    borderRadius: 14,
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#ffe3d9',
  },
  image: {
    width: '100%',
    height: 100,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    backgroundColor: '#f2f2f2',
  },
  info: {
    padding: 10,
  },
  name: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#000',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
   
  },
  rating: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#444',
  },
  dot: {
    marginHorizontal: 6,
    color: '#aaa',
    marginTop: 4,
  },
  distance: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#666',
    marginTop: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',

    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#444',
    marginTop: 4,
  },
});
