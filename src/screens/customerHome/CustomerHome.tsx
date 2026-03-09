import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  PermissionsAndroid,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import API from '../../api/authApi';
import Modal from 'react-native-modal';
import WebView from 'react-native-webview';
import HomeBanner from '../../components/HomeBanner';
import NearbyShopCard from '../../components/ShopCard';

import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Geolocation from 'react-native-geolocation-service';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { LocationProperties, Store } from '../../types/type';
import { AuthContext } from '../../context/AuthContext';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { CustomerStackParamList } from '../../navigation/CustomerNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styles from './CustomerHome.styles';

const categories = [
  {
    label: 'All',
    key: 'all',
    value: require('../../assets/icons/grocery.png'),
  },
  {
    label: 'Grocery',
    key: 'grocery',
    value: require('../../assets/icons/grocery.png'),
  },
  {
    label: 'Fresh',
    key: 'fresh',
    value: require('../../assets/icons/fresh.png'),
  },
  {
    label: 'Personal',
    key: 'personal',
    value: require('../../assets/icons/personal.png'),
  },
  {
    label: 'Household',
    key: 'household',
    value: require('../../assets/icons/home.png'),
  },
  {
    label: 'Babycare',
    key: 'babycare',
    value: require('../../assets/icons/baby.png'),
  },
  {
    label: 'Healthcare',
    key: 'healthcare',
    value: require('../../assets/icons/health.png'),
  },
  {
    label: 'Fashion',
    key: 'fashion',
    value: require('../../assets/icons/fashion.png'),
  },
  {
    label: 'Electronic',
    key: 'electronic',
    value: require('../../assets/icons/electronic.png'),
  },
  {
    label: 'Stationery',
    key: 'stationery',
    value: require('../../assets/icons/stationery.png'),
  },
];

function CustomerHome() {
  const { user, refreshUser } = useContext(AuthContext);

  const navigation = useNavigation<NavigationProp>();

  const [loading, setLoading] = useState(false);
  const [mapLoading, setMapLoading] = useState(false);
  const [products, setProducts] = useState<any | null>(null);
  const [allShops, setAllShops] = useState<Store[]>([]);
  const [openLocation, setOpenLocation] = useState(false);
  const [selectAddress, setSelectAddress] = useState(false);
  const [filteredShops, setFilteredShops] = useState<Store[]>([]);
  const [location, setLocation] = useState<LocationProperties | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
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

        await API.post('/api/auth/setAddress', {
          location: locationString,
          email: user?.email,
        });
      } else {
        const locationString = [
          location?.name,
          location?.state,
          location?.postcode,
        ]
          .filter(Boolean)
          .join(', ');

        await API.post('/api/auth/setAddress', {
          location: locationString,
          email: user?.email,
        });
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
      const response = await API.get('/api/store/get-all-stores?limit=10', {
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

  const fetchProducts = async () => {
    const token = await AsyncStorage.getItem('token');

    try {
      const response = await API.get('/api/product/getAllProducts?limit=10', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts(response.data.products);
    } catch (error) {
      console.log('Failed to fetch products', error);
    }
  };

  useEffect(() => {
    fetchShops();
    fetchProducts();
  }, []);

  const handleCategorySelect = (categoryKey: string) => {
    if (selectedCategory === categoryKey) {
      setSelectedCategory(null);
      setFilteredShops(allShops);
      return;
    }

    if (categoryKey.toLowerCase() === 'all') {
      setSelectedCategory('all');
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
            <View style={styles.noShopFound}>
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
          {/*  */}

          <View style={styles.gridContainer}>
            {products?.map((product: any) => (
              <View key={product?.id} style={styles.productCard}>
                <TouchableOpacity
                  style={styles.productImageContainer}
                  onPress={() => navigation.navigate('ShopProductDetail')}
                >
                  <Image
                    style={styles.productImage}
                    source={{
                      uri: `http://192.168.1.12:5000${product.image}`,
                    }}
                  />
                </TouchableOpacity>
                <View style={styles.productContentContainer}>
                  <Text style={styles.productName}>{product.productName}</Text>
                  <Text style={styles.productcategory}>{product.category}</Text>
                  <View style={styles.productSubContainer}>
                    <Text style={styles.productPrice}>₹{product.price}.00</Text>

                    {product.stock <= 30 ? (
                      <Text style={styles.outOfStockStatus}>Out of Stock</Text>
                    ) : product.stock > 30 && product.stock < 60 ? (
                      <Text style={styles.lowStockStatus}>Low Stock</Text>
                    ) : (
                      <Text style={styles.inStockStatus}>Active</Text>
                    )}
                  </View>
                </View>
                <View style={styles.stockBadge}>
                  <Text style={styles.stockText}>{product.stock} in stock</Text>
                </View>
              </View>
            ))}
          </View>
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

export default CustomerHome;
