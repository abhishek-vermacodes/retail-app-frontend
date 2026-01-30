import { useRoute } from '@react-navigation/native';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const MyProduct = () => {
  const route = useRoute<any>();
  const { id } = route.params;
  return (
    <ScrollView style={styles.mainContainer}>
      <View>
        <View>
          <Image />
        </View>
        <View>
          <View>
            <Text>Name</Text>
            <View>
              <Text>Category</Text>
            </View>
          </View>
          <View>
            <Text>Stock</Text>
            <View>Increase/Decrease</View>
          </View>
          <View>
            <Text>Des</Text>
            <Text>...........</Text>
          </View>
          <View>
            <Text>Price</Text>
            <TouchableOpacity>Add to Cart</TouchableOpacity>
          </View>
        </View>
      </View>
      <Text>{id}</Text>
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
});
