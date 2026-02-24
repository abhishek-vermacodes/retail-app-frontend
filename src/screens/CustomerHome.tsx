import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  PermissionsAndroid,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import { LocationProperties, Store } from '../types/type';
import { AuthContext } from '../context/AuthContext';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { CustomerStackParamList } from '../navigation/CustomerNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import API from '../api/authApi';
import HomeBanner from '../components/HomeBanner';
import NearbyShopCard from '../components/ShopCard';
import ProductCard from '../components/ProductCard';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WebView from 'react-native-webview';

import Geolocation from 'react-native-geolocation-service';

const categories = [
  {
    label: 'Grocery',
    key: 'grocery',
    value: require('../assets/icons/grocery.png'),
  },
  { label: 'Fresh', key: 'fresh', value: require('../assets/icons/fresh.png') },
  {
    label: 'Personal',
    key: 'personal',
    value: require('../assets/icons/personal.png'),
  },
  {
    label: 'Household',
    key: 'household',
    value: require('../assets/icons/home.png'),
  },
  {
    label: 'Babycare',
    key: 'babycare',
    value: require('../assets/icons/baby.png'),
  },
  {
    label: 'Healthcare',
    key: 'healthcare',
    value: require('../assets/icons/health.png'),
  },
  {
    label: 'Fashion',
    key: 'fashion',
    value: require('../assets/icons/fashion.png'),
  },
  {
    label: 'Electronic',
    key: 'electronic',
    value: require('../assets/icons/electronic.png'),
  },
  {
    label: 'Stationery',
    key: 'stationery',
    value: require('../assets/icons/stationery.png'),
  },
];

const recommendedProducts = [
  {
    id: '1',
    productName: 'Fresh Apples',
    price: 120,
    image:
      'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=400&h=400&fit=crop',
  },
  {
    id: '2',
    productName: 'Basmati Rice',
    price: 450,
    image:
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop',
  },
  {
    id: '3',
    productName: 'Milk 1L',
    price: 60,
    image:
      'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=400&fit=crop',
  },
  {
    id: '4',
    productName: 'Shampoo',
    price: 199,
    image:
      'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400&h=400&fit=crop',
  },
  {
    id: '5',
    productName: 'Bread',
    price: 40,
    image:
      'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=400&h=400&fit=crop',
  },
  {
    id: '6',
    productName: 'Laptop ',
    price: 55000,
    image:
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
  },
];

function CustomerHomeScreen() {
  const { user, refreshUser } = useContext(AuthContext);

  const navigation = useNavigation<NavigationProp>();

  const [allShops, setAllShops] = useState<Store[]>([]);
  const [filteredShops, setFilteredShops] = useState<Store[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [mapLoading, setMapLoading] = useState(false);
  const [openLocation, setOpenLocation] = useState(false);
  const [selectAddress, setSelectAddress] = useState(false);
  const [location, setLocation] = useState<LocationProperties | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const [extraFields, setExtraFields] = useState({
    houseNo: '',
    area: '',
    landmark: '',
  });

  const webViewRef = useRef<WebView>(null);

  const defaultLat = 23.3303;
  const defaultLng = 75.0403;

  const address = user?.address || '';
  const minLength = 5;
  const maxlength = 40;

  const displayAddress =
    address.length > maxlength
      ? address.slice(0, maxlength) + '...'
      : address.length < minLength
      ? address
      : address;

  const mapHtml = useMemo(() => {
    return `
            <!DOCTYPE html>
            <html>
            <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"/>
              <script src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"></script>
              <style>
                html, body { margin:0; padding:0; height:100%; }
                #map { height:100%; width:100%; }
              </style>
            </head>
            <body>
              <div id="map"></div>
              <script>
                window.map = L.map('map').setView([${defaultLat}, ${defaultLng}], 15);
        
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                  attribution: '© OpenStreetMap contributors'
                }).addTo(window.map);
        
                window.marker = L.marker([${defaultLat}, ${defaultLng}]).addTo(window.map);
                
                window.map.on('click', function(e) {
                  var lat = e.latlng.lat;
                  var lng = e.latlng.lng;
                  window.marker.setLatLng([lat, lng]);
                  window.ReactNativeWebView.postMessage(
                    JSON.stringify({ lat: lat, lng: lng })
                    );
                    });
                    </script>
                    </body>
                    </html>
                    `;
  }, []);

  const handleMessage = (event: any) => {
    const data = JSON.parse(event.nativeEvent.data);
    setSelectedLocation(data);
  };

  const handleSelectLocation = async () => {
    if (!selectedLocation) {
      Alert.alert('Please select a location');
      return;
    }

    setMapLoading(true);
    setSelectAddress(true);

    try {
      const response = await fetch(
        `https://photon.komoot.io/reverse?lat=${selectedLocation.lat}&lon=${selectedLocation.lng}`,
      );

      const data = await response.json();

      setLocation(data.features[0].properties);
      console.log('selected location', data.features[0].properties);
    } catch (error) {
      Alert.alert('Error saving location');
      console.log('Failed to fetch map', error);
    } finally {
      setMapLoading(false);
    }
  };

  const handleUseCurrentLocation = async () => {
    setLoading(true);

    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert('Permission denied');
          setLoading(false);
          return;
        }
      }

      Geolocation.getCurrentPosition(
        async position => {
          const { latitude, longitude } = position.coords;

          setSelectedLocation({ lat: latitude, lng: longitude });

          webViewRef.current?.injectJavaScript(`
            window.map.setView([${latitude}, ${longitude}], 15);
            window.marker.setLatLng([${latitude}, ${longitude}]);
            true;
          `);

          const response = await fetch(
            `https://photon.komoot.io/reverse?lat=${latitude}&lon=${longitude}`,
          );

          const data = await response.json();
          setLocation(data.features[0].properties);
          console.log('current location', data.features[0].properties);

          setLoading(false);
        },
        error => {
          Alert.alert('Error', error.message);
          setLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 0,
        },
      );
    } catch (err) {
      setLoading(false);
      console.log('Failed to fetch location', err);
    }
  };

  const handleSetAddress = async () => {
    try {
      if (extraFields) {
        const locationString = [
          location?.name,
          location?.state,
          location?.postcode,
          extraFields.houseNo,
          extraFields.area,
          extraFields.landmark,
        ]
          .filter(Boolean)
          .join(', ');

        const res = await API.post('/auth/setAddress', {
          location: locationString,
          email: user?.email,
        });
        console.log('res', res);
      } else {
        const locationString = [
          location?.name,
          location?.state,
          location?.postcode,
        ]
          .filter(Boolean)
          .join(', ');

        const res = await API.post('/auth/setAddress', {
          location: locationString,
          email: user?.email,
        });
        console.log('res', res);
      }
      await refreshUser();
      setOpenLocation(false);
    } catch (error) {
      console.log('Failed to add location', error);
      Alert.alert('error', 'Failed to add location');
    }
  };

  type NavigationProp = NativeStackNavigationProp<
    CustomerStackParamList,
    'CustomerHome'
  >;

  const fetchShops = async () => {
    const token = await AsyncStorage.getItem('token');

    try {
      const response = await API.get('/store/get-all-stores?limit=10', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const stores = response.data.stores || [];
      setAllShops(stores);
      setFilteredShops(stores);
    } catch (error) {
      console.log('Failed to fetch shops', error);
    }
  };

  useEffect(() => {
    fetchShops();
  }, []);

  const handleCategorySelect = (categoryKey: string) => {
    if (selectedCategory === categoryKey) {
      setSelectedCategory(null);
      setFilteredShops(allShops);
      return;
    }

    setSelectedCategory(categoryKey);

    const filtered = allShops.filter(
      shop => shop.category?.toLowerCase() === categoryKey.toLowerCase(),
    );

    setFilteredShops(filtered);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => setOpenLocation(true)}>
          <View style={styles.locationContainer}>
            <Ionicons name="location" size={20} color="#ff6a32" />
            <Text style={styles.priLocationText}>
              {user?.address?.split(',')[0]}
            </Text>
            <MaterialIcons
              name="keyboard-arrow-down"
              size={22}
              color={'#000'}
              style={styles.arrowDownIcon}
            />
          </View>
          <Text style={styles.secLocationText}>{displayAddress}</Text>
        </TouchableOpacity>

        <View style={styles.profileContainer}>
          <Fontisto name="bell" size={20} color="#000" />
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{user?.username?.charAt(0)}</Text>
          </View>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <HomeBanner />

        <View>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <Text style={styles.viewLink}>See All</Text>
          </View>

          <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryContainer}
            keyExtractor={item => item.key}
            renderItem={({ item }) => {
              const isActive = selectedCategory === item.key;

              return (
                <View style={styles.categoryBtnContainer}>
                  <TouchableOpacity
                    onPress={() => handleCategorySelect(item.key)}
                    style={[
                      styles.categoryBtn,
                      isActive && styles.categoryBtnActive,
                    ]}
                  >
                    <Image source={item.value} style={styles.categoryImage} />
                  </TouchableOpacity>
                  <Text style={styles.categoryText}>{item.label}</Text>
                </View>
              );
            }}
          />
        </View>

        <View>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nearby Shops</Text>
            <Text style={styles.viewLink}>See All</Text>
          </View>

          {filteredShops.length === 0 ? (
            <View
              style={{
                height: 100,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={styles.secLocationText}>No shops found</Text>
            </View>
          ) : (
            <FlatList
              data={filteredShops}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.shopFlatListcontentContainerStyle}
              renderItem={({ item }) => (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() =>
                    navigation.navigate('ShopDetails', { shop: item })
                  }
                >
                  <NearbyShopCard
                    image={item.image}
                    storeName={item.storeName}
                    category={item.category}
                    address={item.address}
                  />
                </TouchableOpacity>
              )}
            />
          )}
        </View>

        <View>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recommended</Text>
            <Text style={styles.viewLink}>See All</Text>
          </View>

          <FlatList
            data={recommendedProducts}
            keyExtractor={item => item.id}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={styles.productRow}
            contentContainerStyle={styles.productContainer}
            renderItem={({ item }) => (
              <View style={styles.productItem}>
                <ProductCard
                  image={item.image}
                  name={item.productName}
                  price={item.price}
                />
              </View>
            )}
          />
        </View>
      </ScrollView>
      <Modal
        isVisible={openLocation}
        onBackdropPress={() => setOpenLocation(false)}
        style={styles.modal}
      >
        <View style={styles.drawer}>
          <View style={styles.mapContainer}>
            {loading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size={'small'} color={'#ff6a32'} />
                <Text style={styles.primaryBtnText}>Getting Location...</Text>
              </View>
            )}
            <WebView
              ref={webViewRef}
              originWhitelist={['*']}
              source={{ html: mapHtml }}
              javaScriptEnabled
              domStorageEnabled
              onMessage={handleMessage}
            />
          </View>
          <View style={styles.addressContainer}>
            {mapLoading ? (
              <Text>Getting Location...</Text>
            ) : (
              <>
                <View style={styles.streetAddressContainer}>
                  <Ionicons name="location-outline" size={20} color="#ff6a32" />
                  <Text style={styles.streetText}>
                    {selectAddress
                      ? location?.name || location?.county
                      : user?.address.split(',')[0]}
                  </Text>
                </View>
                <Text style={styles.addressText}>
                  {selectAddress
                    ? `${location?.name}, ${location?.state}, ${location?.postcode}`
                    : user?.address}
                </Text>
              </>
            )}
          </View>
          <TouchableOpacity
            style={styles.primaryBtnContainer}
            onPress={handleSelectLocation}
          >
            <Ionicons name="location-outline" size={20} color="#ff6a32" />
            <Text style={styles.primaryBtnText}>Set Location on Map</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.secondaryBtnContainer}
            onPress={handleUseCurrentLocation}
            disabled={loading}
          >
            <Text style={styles.secondaryBtnText}>Use Current Location</Text>
          </TouchableOpacity>
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Flat, House no, Building name (Optional)"
                placeholderTextColor="#00000061"
                autoCapitalize="none"
                value={extraFields.houseNo}
                onChangeText={text =>
                  setExtraFields({ ...extraFields, houseNo: text })
                }
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Area, Street, Sector, Village (Optional)"
                placeholderTextColor="#00000061"
                autoCapitalize="none"
                value={extraFields.area}
                onChangeText={text =>
                  setExtraFields({ ...extraFields, area: text })
                }
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Landmark (Optional)"
                placeholderTextColor="#00000061"
                autoCapitalize="none"
                value={extraFields.landmark}
                onChangeText={text =>
                  setExtraFields({ ...extraFields, landmark: text })
                }
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.secondaryBtnContainer}
            onPress={handleSetAddress}
          >
            <Text style={styles.secondaryBtnText}>Confirm Location</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

export default CustomerHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F0',
    paddingVertical: 70,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  locationContainer: {
    flexDirection: 'row',
    marginLeft: -6,
    gap: 4,
  },
  priLocationText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
  },
  secLocationText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
  },
  profileContainer: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'center',
  },
  avatarContainer: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 30,
    backgroundColor: '#ff6a32',
  },
  avatarText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#ffe3d9',
    marginBottom: -2,
  },
  scrollContent: {
    paddingBottom: 200,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  viewLink: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#ff5b27',
    marginBottom: -2,
  },
  shopnotFound: {
    marginTop: 20,
  },
  shopFlatListcontentContainerStyle: {
    marginTop: 16,
  },
  categoryContainer: {
    marginTop: 14,
    gap: 20,
  },
  categoryBtnContainer: {
    alignItems: 'center',
    gap: 8,
  },
  categoryBtn: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#ffe3d9',
  },
  categoryBtnActive: {
    backgroundColor: '#ffe3d9',
    borderColor: '#ff5b27',
  },
  categoryImage: {
    width: 26,
    height: 26,
  },
  categoryText: {
    fontSize: 12,
    color: '#000000a3',
    fontFamily: 'Poppins-Regular',
  },
  productContainer: {
    marginTop: 16,
  },
  productRow: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  productItem: {
    width: '48%',
  },
  arrowDownIcon: {
    marginLeft: 2,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  drawer: {
    backgroundColor: '#fff',
    paddingVertical: 26,
    paddingHorizontal: 18,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: 'auto',
  },
  mapContainer: {
    backgroundColor: '#fff',
    height: 200,
    borderWidth: 1,
    borderColor: '#ffe3d9',
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
  },
  loadingContainer: {
    position: 'absolute',
    right: '30%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    zIndex: 9999,
  },
  primaryBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ff5b27',
    borderRadius: 14,
    paddingVertical: 16,
    gap: 6,
    marginBottom: 20,
  },
  primaryBtnText: {
    color: '#ff5b27',
    fontFamily: 'Poppins-Regular',
    marginBottom: -2,
  },
  secondaryBtnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff5b27',
    borderRadius: 14,
    paddingVertical: 16,
    marginBottom: 20,
  },
  secondaryBtnText: {
    color: '#fff',
    fontFamily: 'Poppins-Regular',
  },
  streetAddressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginLeft: -6,
  },
  streetText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#000000',
    marginBottom: -2,
  },
  addressText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#000000',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#00000061',
    paddingHorizontal: 14,
    height: 56,
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  addressContainer: {
    flexDirection: 'column',
    gap: 6,
    borderWidth: 1,
    borderColor: '#ffe3d9',
    backgroundColor: '#fff5f0',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 20,
  },
});
