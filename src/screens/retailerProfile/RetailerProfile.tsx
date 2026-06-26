import {
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import styles from './retailerProfile.styles';
import API, { API_BASE_URL } from '../../api/authApi';
import { getToken } from '../../utils/storage';

// Modals
import EditProfileModal from './components/EditProfileModal';
import EditShopModal from './components/EditShopModal';
import NotificationsModal from './components/NotificationsModal';

const RetailerProfile = () => {
  const navigation = useNavigation<any>();
  const { user, signOut, refreshUser } = useContext(AuthContext);

  const [ordersCount, setOrdersCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [store, setStore] = useState<any>(null);

  // Modal Visibilities
  const [editProfileVisible, setEditProfileVisible] = useState(false);
  const [editShopVisible, setEditShopVisible] = useState(false);
  const [notificationsVisible, setNotificationsVisible] = useState(false);

  // Profile Form State
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  // Shop Form State
  const [storeName, setStoreName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  // Notification Toggles
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);

  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingShop, setIsSavingShop] = useState(false);

  // Initialize profile form
  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
    }
  }, [user]);

  // Initialize shop form when shop is fetched
  useEffect(() => {
    if (store) {
      setStoreName(store.storeName || '');
      setCategory(store.category || '');
      setDescription(store.description || '');
      setAddress(store.address || '');
      setPhone(store.phone || '');
    }
  }, [store]);

  const fetchData = async () => {
    try {
      const token = await getToken();
      if (!token) return;

      // 1. Fetch store info
      const storeRes = await API.get('/api/store/my-store', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStore(storeRes.data.store);

      // 2. Fetch orders count
      const ordersRes = await API.get('/api/order/store', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (ordersRes.data?.orders) {
        setOrdersCount(ordersRes.data.orders.length);
      }

      // 3. Fetch products count
      const productsRes = await API.get('/api/product/my-products', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (productsRes.data?.products) {
        setProductsCount(productsRes.data.products.length);
      }
    } catch (error) {
      console.log('Error fetching retailer details:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Fetch count and store on focus
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });
    return unsubscribe;
  }, [navigation]);

  const handleUpdateProfile = async () => {
    if (!username || !email) {
      Alert.alert('Error', 'Name and Email are required.');
      return;
    }
    setIsSavingProfile(true);
    try {
      const token = await getToken();
      await API.put(
        '/api/user/profile',
        { username, email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await refreshUser();
      Alert.alert('Success', 'Profile updated successfully.');
      setEditProfileVisible(false);
    } catch (error: any) {
      const msg = error.response?.data?.message || 'Failed to update profile';
      Alert.alert('Error', msg);
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleUpdateShop = async () => {
    if (!storeName || !address || !phone) {
      Alert.alert('Error', 'Shop Name, Address, and Phone are required.');
      return;
    }
    setIsSavingShop(true);
    try {
      const token = await getToken();
      const res = await API.put(
        '/api/store',
        { storeName, category, description, address, phone },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setStore(res.data.store);
      Alert.alert('Success', 'Shop details updated successfully.');
      setEditShopVisible(false);
    } catch (error: any) {
      const msg = error.response?.data?.message || 'Failed to update shop details';
      Alert.alert('Error', msg);
    } finally {
      setIsSavingShop(false);
    }
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: signOut,
      },
    ]);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome6 name="arrow-left" size={18} color="#000" />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>My Profile</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
      >
        <View style={styles.profileCardContainer}>
          <View style={styles.orderCardSubContainer}>
            <View style={styles.cardHeader}>
              <View style={styles.cardProfile}>
                <View style={styles.cardAvatarContainer}>
                  <Image
                    source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
                    style={styles.avatar}
                  />
                </View>
                <View>
                  <Text style={styles.profileName}>{user?.username || 'Guest Retailer'}</Text>
                  <Text style={styles.profileRole}>{user?.email || 'Retailer'}</Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => setEditProfileVisible(true)}>
                <Feather name="edit-3" size={22} color={'#ff5b27'} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.line} />
          <View style={styles.cardFooter}>
            <View style={styles.box}>
              <Text style={styles.cardHeaderTitle}>{ordersCount}</Text>
              <Text style={styles.Text}>Orders</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.cardHeaderTitle}>{productsCount}</Text>
              <Text style={styles.Text}>Products</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.cardHeaderTitle}>
                {user?.createdAt ? new Date(user.createdAt).getFullYear() : new Date().getFullYear()}
              </Text>
              <Text style={styles.Text}>Joined</Text>
            </View>
          </View>
        </View>

        <View style={styles.profileCardContainer}>
          <View style={styles.orderCardSubContainer}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardHeaderTitle}>Shop Details</Text>
              <TouchableOpacity onPress={() => setEditShopVisible(true)}>
                <Text style={styles.Edit}>Edit</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.cardProfile}>
              <View style={styles.shopContainer}>
                <Image
                  source={
                    store?.image
                      ? { uri: `${API_BASE_URL}${store.image}` }
                      : require('../../assets/images/bag.jpeg')
                  }
                  style={styles.shop}
                />
              </View>
              <View style={styles.storeDetails}>
                <Text style={styles.profileName}>{store?.storeName || 'No Shop Registered'}</Text>
                <Text style={styles.profileRole}>
                  {store?.address || 'Setup your store details'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <Text style={styles.cardHeaderTitle}>Account Settings</Text>

        <View style={styles.profileCardContainer}>
          <View style={styles.orderCardSubContainer}>
            <TouchableOpacity onPress={() => setEditProfileVisible(true)}>
              <View style={styles.Row}>
                <View style={styles.cardProfile}>
                  <View style={styles.iconContainer}>
                    <MaterialIcons
                      name="person-outline"
                      size={22}
                      color="#ff6a32"
                    />
                  </View>

                  <Text style={styles.settings}>Personal Information</Text>
                </View>
                <FontAwesome6 name="angle-right" size={16} color="#ff6a32" />
              </View>
            </TouchableOpacity>
            
            <View style={styles.line} />

            <View style={styles.Row}>
              <View style={styles.cardProfile}>
                <View style={styles.iconContainer}>
                  <Ionicons name="card-outline" size={22} color="#ff6a32" />
                </View>

                <Text style={styles.settings}> Subscription & Billing</Text>
              </View>
              <FontAwesome6 name="angle-right" size={16} color="#ff6a32" />
            </View>
            
            <View style={styles.line} />

            <TouchableOpacity onPress={() => setNotificationsVisible(true)}>
              <View style={styles.Row}>
                <View style={styles.cardProfile}>
                  <View style={styles.iconContainer}>
                    <Ionicons
                      name="notifications-outline"
                      size={20}
                      color="#ff6a32"
                    />
                  </View>

                  <Text style={styles.settings}> Notifications</Text>
                </View>
                <FontAwesome6 name="angle-right" size={16} color="#ff6a32" />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.cardHeaderTitle}>Support</Text>
        <View style={styles.profileCardContainer}>
          <View style={styles.orderCardSubContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('HelpCenter')}>
              <View style={styles.Row}>
                <View style={styles.cardProfile}>
                  <View style={styles.iconContainer}>
                    <Feather name="help-circle" size={22} color="#ff6a32" />
                  </View>
                  <Text style={styles.settings}>Help Center</Text>
                </View>
                <FontAwesome6 name="angle-right" size={16} color="#ff6a32" />
              </View>
            </TouchableOpacity>

            <View style={styles.line} />

            <TouchableOpacity onPress={handleLogout}>
              <View style={styles.cardProfile}>
                <View style={styles.iconContainer}>
                  <MaterialIcons name="logout" size={22} color="#ff6a32" />
                </View>

                <Text style={styles.settings}> Logout</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isVisible={editProfileVisible}
        onClose={() => setEditProfileVisible(false)}
        username={username}
        setUsername={setUsername}
        email={email}
        setEmail={setEmail}
        onSave={handleUpdateProfile}
        isSaving={isSavingProfile}
      />

      {/* Edit Shop Modal */}
      <EditShopModal
        isVisible={editShopVisible}
        onClose={() => setEditShopVisible(false)}
        storeName={storeName}
        setStoreName={setStoreName}
        category={category}
        setCategory={setCategory}
        description={description}
        setDescription={setDescription}
        address={address}
        setAddress={setAddress}
        phone={phone}
        setPhone={setPhone}
        onSave={handleUpdateShop}
        isSaving={isSavingShop}
      />

      {/* Notifications Modal */}
      <NotificationsModal
        isVisible={notificationsVisible}
        onClose={() => setNotificationsVisible(false)}
        pushEnabled={pushEnabled}
        setPushEnabled={setPushEnabled}
        emailEnabled={emailEnabled}
        setEmailEnabled={setEmailEnabled}
        smsEnabled={smsEnabled}
        setSmsEnabled={setSmsEnabled}
      />
    </View>
  );
};

export default RetailerProfile;
