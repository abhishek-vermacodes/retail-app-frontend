import React, { useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
  Platform,
  TextInput,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { WebView } from 'react-native-webview';
import Geolocation from 'react-native-geolocation-service';
import Feather from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

interface LocationProperties {
  osm_type?: string;
  osm_id?: number;
  osm_key?: string;
  osm_value?: string;
  type?: string;
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

interface LocationGeometry {
  type: string;
  coordinates: [number, number];
}

interface LocationFeature {
  type: string;
  properties: LocationProperties;
  geometry: LocationGeometry;
}

export interface PhotonResponse {
  type: string;
  features: LocationFeature[];
}

const AddLocation = () => {
  const webViewRef = useRef<WebView>(null);

  const [location, setLocation] = useState<LocationProperties | null>(null);

  const [loading, setLoading] = useState(false);
  const [isPriDrawerVisible, setPriDrawerVisible] = useState(false);
  const [isSecDrawerVisible, setSecDrawerVisible] = useState(false);

  const [mapLoading, setMapLoading] = useState(false);
  const [extraFields, setExtraFields] = useState({
    houseNo: '',
    area: '',
    landmark: '',
  });

  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

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

  const handleMessage = (event: any) => {
    const data = JSON.parse(event.nativeEvent.data);
    setSelectedLocation(data);
  };

  const handleSetLocation = async () => {
    if (!selectedLocation) {
      Alert.alert('Please select a location');
      return;
    }

    setMapLoading(true);
    setPriDrawerVisible(true);

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
          setSecDrawerVisible(true);

          const token = await AsyncStorage.getItem('token');
          const locationString = [
            location?.name,
            location?.state,
            location?.postcode,
          ]
            .filter(Boolean)
            .join(', ');

          await axios.post(
            'http://192.168.1.3:5000/api/auth/setAddress',
            { location: locationString },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
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

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <View>
        <Text style={styles.pageTitle}>Add Location</Text>
        <Text style={styles.pageSubTitle}>
          Choose your location to find nearby stores and services easily.
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <Feather name="search" color={'#000000a3'} size={20} />
        <TextInput
          placeholder="Search Location"
          placeholderTextColor={'#000000a3'}
          style={styles.searchText}
        />
      </View>

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

      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.primaryBtnContainer}
          onPress={handleSetLocation}
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
      </View>

      <Modal
        isVisible={isPriDrawerVisible}
        onBackdropPress={() => setPriDrawerVisible(false)}
        style={styles.modal}
      >
        <View style={styles.drawer}>
          <View style={styles.drawerHandle} />

          <Text style={styles.drawerTitle}>Selected Location</Text>

          <View style={styles.locationContainer}>
            {mapLoading ? (
              <Text>Getting Location...</Text>
            ) : (
              <>
                <View style={styles.streetAddressContainer}>
                  <Ionicons name="location-outline" size={20} color="#ff6a32" />
                  <Text style={styles.streetText}>
                    {location?.city || location?.county}
                  </Text>
                </View>
                <Text style={styles.addressText}>
                  {[
                    extraFields.houseNo,
                    extraFields.area,
                    extraFields.landmark,
                    location?.name,
                    location?.state,
                    location?.postcode,
                  ]
                    .filter(Boolean)
                    .join(', ')}
                </Text>
              </>
            )}
          </View>

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
            onPress={handleSetLocation}
          >
            <Text style={styles.secondaryBtnText}>Confirm Location</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal
        isVisible={isSecDrawerVisible}
        onBackdropPress={() => setSecDrawerVisible(false)}
        style={styles.modal}
      >
        <View style={styles.drawer}>
          <View style={styles.drawerHandle} />

          <Text style={styles.drawerTitle}>Selected Location</Text>

          <View style={styles.locationContainer}>
            {mapLoading ? (
              <Text>Getting Location...</Text>
            ) : (
              <>
                <View style={styles.streetAddressContainer}>
                  <Ionicons name="location-outline" size={20} color="#ff6a32" />
                  <Text style={styles.streetText}>
                    {location?.city || location?.county}
                  </Text>
                </View>
                <Text style={styles.addressText}>
                  {location?.name}, {location?.state}, {location?.postcode}
                </Text>
              </>
            )}
          </View>

          <TouchableOpacity
            style={styles.secondaryBtnContainer}
            // onPress={handleSetLocation}
          >
            <Text style={styles.secondaryBtnText}>Confirm Location</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default AddLocation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff5f0',
    paddingHorizontal: 20,
    paddingTop: 80,
  },
  pageTitle: {
    fontSize: 26,
    fontFamily: 'Poppins-Bold',
    color: '#ff5b27',
  },
  pageSubTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#000000a3',
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ffe3d9',
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
  },
  searchText: {
    fontFamily: 'Poppins-Regular',
    color: '#000',
    marginBottom: -2,
  },
  mapContainer: {
    backgroundColor: '#fff',
    height: 450,
    borderWidth: 1,
    borderColor: '#ffe3d9',
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 30,
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
  btnContainer: {
    gap: 10,
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
  },
  secondaryBtnText: {
    color: '#fff',
    fontFamily: 'Poppins-Regular',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  drawer: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: 'auto',
  },
  drawerHandle: {
    width: 50,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 15,
  },
  drawerTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    marginBottom: 10,
  },
  drawerText: {
    fontSize: 14,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 5,
    fontFamily: 'Poppins-Medium',
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
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  locationContainer: {
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
});
