import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  Platform,
  PermissionsAndroid,
  Alert,
  TextInput,
} from 'react-native';

interface LocationProperties {
  postcode?: string;
  housenumber?: string;
  countrycode?: string;
  name?: string;
  street?: string;
  district?: string;
  city?: string;
  county?: string;
  state?: string;
  country?: string;
}

import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Store } from '../types/type';
import { AuthContext } from '../context/AuthContext';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import Modal from 'react-native-modal';
import WebView from 'react-native-webview';
import Geolocation from 'react-native-geolocation-service';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const RetailerHomeScreen = () => {
  const navigation = useNavigation<any>();
  const [store, setStore] = useState<Store | null>(null);
  const { user } = useContext(AuthContext);
  const [openLocation, setOpenLocation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<LocationProperties | null>(null);
  const [mapLoading, setMapLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [extraFields, setExtraFields] = useState({
    houseNo: '',
    area: '',
    landmark: '',
  });
  const [selectAddress, setSelectAddress] = useState(false);

  const webViewRef = useRef<WebView>(null);

  const defaultLat = 23.3303;
  const defaultLng = 75.0403;

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

  const handleMessage = (event: any) => {
    const data = JSON.parse(event.nativeEvent.data);
    setSelectedLocation(data);
  };
  const getStore = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(
        `http://192.168.1.5:5000/api/store/my-store`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setStore(response.data.store);
    } catch (error) {
      console.log('Failed to fetch', error);
    }
  };

  const address = user?.address || '';
  const minLength = 5;
  const maxlength = 40;

  const displayAddress =
    address.length > maxlength
      ? address.slice(0, maxlength) + '...'
      : address.length < minLength
      ? address
      : address;

  useEffect(() => {
    getStore();
  }, []);

  const handleSetAddress = async () => {
    try {
      const locationSharing = [
        location?.name,
        location?.state,
        location?.postcode,
      ]
        .filter(Boolean)
        .join(', ');

      const res = await axios.post(
        'http://192.168.1.5:5000/api/auth/setAddress',
        {
          location: locationSharing,
          email: user?.email,
        },
      );
      console.log('res', res);
    } catch (error) {
      console.log('Failed to add location', error);
      Alert.alert('error', 'Failed to add location');
    }
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
      console.log('location', data.features[0].properties);
    } catch (error) {
      Alert.alert('Error saving location');
      console.log('Failed to fetch map', error);
    } finally {
      setMapLoading(false);
    }
  };
  return (
    <LinearGradient
      start={{ x: 1.2, y: 0 }}
      end={{ x: 0, y: 0.6 }}
      colors={['#ff693299', '#ffffff']}
      locations={[0, 0.6]}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setOpenLocation(true)}>
            <View style={styles.locationContainer}>
              <Ionicons
                name="location"
                size={20}
                color="#ff6a32"
                style={styles.locationIcon}
              />
              <Text style={styles.priLocationText}>
                {user?.address?.split(',')[0]}
              </Text>
              <MaterialIcons
                name="keyboard-arrow-down"
                size={22}
                color={'#000'}
                style={{ marginLeft: 2, marginTop: -2 }}
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

        {store === null ? (
          <View style={styles.banner}>
            <View style={styles.badge}>
              <Ionicons name="sparkles-outline" size={14} color="#fff" />
              <Text style={styles.badgeText}>New Feature</Text>
            </View>

            <Text style={styles.bannerTitle}>
              Launch your{'\n'}online store
            </Text>
            <Text style={styles.bannerDesc}>
              Start selling products directly to{'\n'}customers with zero
              commission.
            </Text>

            <TouchableOpacity
              style={styles.bannerBtn}
              onPress={() => navigation.navigate('CreateShop')}
            >
              <Text style={styles.bannerBtnText}>Create Shop</Text>
              <Ionicons name="arrow-forward" size={16} color="#ff6a32" />
            </TouchableOpacity>

            <View style={styles.circle} />
            <Image
              source={require('../assets/images/bag.jpeg')}
              style={styles.bagImage}
            />
          </View>
        ) : (
          <View style={styles.storeBanner}>
            <TouchableOpacity style={styles.editBtn}>
              <Entypo name="dots-three-vertical" color="#ff6a32" size={14} />
            </TouchableOpacity>
            <View style={styles.storeImgContainer}>
              <Image
                source={{
                  uri: `http://192.168.1.5:5000${store.image}`,
                }}
                style={styles.storeImg}
              />
            </View>
            <View style={styles.storeContentContainer}>
              <View style={styles.storeContentSubContainer}>
                <Text style={styles.storeName}>{store.storeName}</Text>
                <View style={styles.storeCategory}>
                  <Text style={styles.storeCatgoryText}>{store.category}</Text>
                </View>
              </View>
              <View>
                <View style={styles.storeAddressContainer}>
                  <Ionicons
                    name="location-outline"
                    size={18}
                    color="#ff6a32"
                    style={styles.storeLocationIcon}
                  />
                  <Text style={styles.storeAddress}>{store.address}</Text>
                </View>
                <View style={styles.storeAddressContainer}>
                  <Feather name="phone" size={14} color="#ff6a32" />
                  <Text style={styles.storeAddress}>+91 {store.phone}</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Overview */}
        <View style={styles.overviewHeader}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <Text style={styles.viewReport}>View Report</Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Ionicons name="people-outline" size={22} />
            <Text style={styles.statNumber}>128</Text>
            <Text style={styles.statLabel}>Store Visitors</Text>
            <Text style={styles.growth}>+12%</Text>
          </View>

          <View style={styles.statCard}>
            <Feather name="shopping-bag" size={22} />
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Total Orders</Text>
            <Text style={styles.muted}>--</Text>
          </View>
        </View>

        <View style={styles.overviewHeader}>
          <Text style={styles.sectionTitle}>Get Started</Text>
        </View>

        <View style={styles.getStartedSection}>
          <TouchableOpacity style={styles.actionCard}>
            <View style={styles.iconBox}>
              <Feather name="box" size={20} color="#ff6a32" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.actionTitle}>Add your first product</Text>
              <Text style={styles.actionDesc}>
                Upload images and set prices to start selling.
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <View style={styles.iconBoxGray}>
              <Feather name="credit-card" size={20} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.actionTitle}>Set up payments</Text>
              <Text style={styles.actionDesc}>
                Link your bank account to receive payouts.
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
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
    </LinearGradient>
  );
};

export default RetailerHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 80,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 2,
    paddingBottom: 26,
    zIndex: 10,
    paddingHorizontal: 20,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    left: -6,
    zIndex: 9999,
  },
  priLocationText: {
    fontFamily: 'Poppins-Bold',
    marginBottom: -2,
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
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
    padding: 2,
    backgroundColor: '#ff6a32',
  },
  avatarText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    marginBottom: -4,
    color: '#ffe3d9',
  },
  banner: {
    borderRadius: 22,
    backgroundColor: '#ff6a32',
    padding: 20,
    marginBottom: 24,
    position: 'relative',
    overflow: 'hidden',
    marginHorizontal: 20,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: { color: '#fff', fontSize: 10, fontFamily: 'Poppins-Medium' },
  bannerTitle: {
    fontSize: 26,
    color: '#fff',
    marginTop: 14,
    fontFamily: 'Poppins-Bold',
    lineHeight: 32,
  },
  bannerDesc: {
    color: '#ffe7dd',
    fontSize: 12,
    marginTop: 10,
    lineHeight: 18,
    fontFamily: 'Poppins-Medium',
  },
  bannerBtn: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'flex-start',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 14,
    marginTop: 16,
  },
  bannerBtnText: {
    color: '#ff6a32',
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
  },
  circle: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    height: 160,
    width: 160,
    borderRadius: 100,
    position: 'absolute',
    top: -40,
    right: -40,
  },
  bagImage: {
    height: 100,
    width: 100,
    position: 'absolute',
    bottom: -6,
    right: -14,
    transform: [{ rotate: '-14deg' }],
  },
  storeBanner: {
    height: 300,
    marginHorizontal: 20,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#ffe3d9',
    backgroundColor: '#fff',
    position: 'relative',
    marginBottom: 20,
  },
  editBtn: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#ffe3d9',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 9999,
    right: 10,
    top: 10,
  },
  storeImgContainer: {
    height: '64%',
    width: 'auto',
  },
  storeImg: {
    height: '100%',
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  storeContentContainer: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: 'column',
    gap: 6,
  },
  storeContentSubContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  storeName: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#ff6a32',
  },
  storeCategory: {
    backgroundColor: '#ff6a32',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  storeCatgoryText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#fff',
    marginBottom: -1,
  },
  storeAddressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  storeLocationIcon: {
    marginLeft: -2,
    marginTop: -4,
  },
  storeAddress: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  overviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  viewReport: {
    fontSize: 12,
    color: '#ff6a32',
    fontFamily: 'Poppins-Medium',
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 14,
    marginBottom: 24,
    marginTop: 12,
  },
  statCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 16,
    padding: 16,
  },
  statNumber: { fontSize: 22, fontFamily: 'Poppins-SemiBold', marginTop: 8 },
  statLabel: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
    fontFamily: 'Poppins-Regular',
  },
  growth: {
    fontSize: 14,
    color: 'green',
    marginTop: 6,
    fontFamily: 'Poppins-Medium',
  },
  muted: {
    fontSize: 14,
    color: '#bbb',
    marginTop: 6,
    fontFamily: 'Poppins-Medium',
  },
  getStartedSection: {
    marginTop: 12,
    flexDirection: 'column',
    paddingHorizontal: 20,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 12,
    gap: 14,
  },
  iconBox: {
    backgroundColor: '#ffe7dd',
    padding: 16,
    borderRadius: 12,
  },
  actionTitle: { fontSize: 13, fontFamily: 'Poppins-Medium' },
  actionDesc: { fontSize: 11, color: '#888', fontFamily: 'Poppins-Regular' },
  iconBoxGray: {
    backgroundColor: '#f3f3f3',
    padding: 16,
    borderRadius: 12,
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
