import {
  View,
  Text,
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

import API from '../../api/authApi';
import Modal from 'react-native-modal';
import WebView from 'react-native-webview';

import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { AuthContext } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { LocationProperties, Store } from '../../types/type';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import styles from './retailerHome.styles';

const RetailerHomeScreen = () => {
  const navigation = useNavigation<any>();

  const { user, refreshUser } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [mapLoading, setMapLoading] = useState(false);
  const [openLocation, setOpenLocation] = useState(false);
  const [selectAddress, setSelectAddress] = useState(false);
  const [store, setStore] = useState<Store | null>(null);
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

  const getStore = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      const response = await API.get('/api/store/my-store', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('response', response);
      setStore(response.data.store);
    } catch (error) {
      console.log('Failed to fetch', error);
    }
  };

  useEffect(() => {
    getStore();
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

        const res = await API.post('/api/auth/setAddress', {
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

        const res = await API.post('/api/auth/setAddress', {
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
  return (
    <LinearGradient
      start={{ x: 1.2, y: 0 }}
      end={{ x: 0, y: 0.6 }}
      colors={['#ff693299', '#ffffff']}
      locations={[0, 0.6]}
      style={styles.container}
    >
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
          <TouchableOpacity>
            <Fontisto name="bell" size={20} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{user?.username?.charAt(0)}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
      >
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
                  uri: `http://192.168.1.12:5000${store.image}`,
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

        {/* <View style={styles.overviewHeader}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <Text style={styles.viewReport}>View Report</Text>
        </View> */}

        {/* <View style={styles.statsRow}>
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
        </View> */}

        {/* <View style={styles.overviewHeader}>
          <Text style={styles.sectionTitle}>Get Started</Text>
        </View> */}

        {/* <View style={styles.getStartedSection}>
          <TouchableOpacity style={styles.actionCard}>
            <View style={styles.iconBox}>
              <Feather name="box" size={20} color="#ff6a32" />
            </View>
            <View>
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
            <View>
              <Text style={styles.actionTitle}>Set up payments</Text>
              <Text style={styles.actionDesc}>
                Link your bank account to receive payouts.
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        </View> */}
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
