import {
  View,

  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

import { useState } from 'react';

import styles from './category.styles';
import { useNavigation } from '@react-navigation/native';



function Category() {
  // const route = useRoute<any>();
  const navigation = useNavigation<any>();

  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // const { categoryKey, categoryLabel } = route.params;

  // const filteredProducts = products.filter(
  //   item => item.category === categoryKey,
  // );

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome6 name="arrow-left" size={18} color="#000" />
        </TouchableOpacity>

        {/* <Text style={styles.pageTitle}>{categoryLabel}</Text> */}
        <Feather
          name="search"
          size={22}
          color={'#000'}
          style={styles.searchBtn}
          onPress={() => setIsVisible(prev => !prev)}
        />
      </View>

      {isVisible && (
        <View style={styles.searchContainer}>
          <Feather name="search" color={'#000000a3'} size={20} />
          <TextInput
            placeholder="Search for Products..."
            placeholderTextColor={'#000000a3'}
            style={styles.searchText}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
      >
        {/* <FlatList
          data={filteredProducts}
          numColumns={2}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          removeClippedSubviews={false}
          columnWrapperStyle={
            filteredProducts.length === 1
              ? styles.flatListActive
              : styles.flatListInActive
          }
          contentContainerStyle={styles.flatListStyle}
          renderItem={({ item }) => (
            <View style={styles.btnContainer}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate('ProductDetails', { product: item })
                }
              >
                <ProductCard
                  image={item.image}
                  name={item.name}
                  price={item.price}
                  onAddToCart={() => {}}
                />
              </TouchableOpacity>
            </View>
          )}
        /> */}
      </ScrollView>
    </View>
  );
}

export default Category;


