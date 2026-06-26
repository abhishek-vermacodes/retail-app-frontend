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
import { useWishlist } from '../../context/WishlistContext';
import API from '../../api/authApi';
import { getToken } from '../../utils/storage';
import styles from './userProfile.styles';

// Custom Sub-components
import EditProfileModal from './components/EditProfileModal';
import ChangePasswordModal from './components/ChangePasswordModal';
import NotificationsModal from './components/NotificationsModal';

const UserProfile = () => {
  const navigation = useNavigation<any>();
  const { user, signOut, refreshUser } = useContext(AuthContext);
  const { wishlist } = useWishlist();

  const [ordersCount, setOrdersCount] = useState(0);

  // Modals visibility
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [notificationsModalVisible, setNotificationsModalVisible] = useState(false);

  // Form states
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Notification toggles
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);

  const [isSaving, setIsSaving] = useState(false);

  // Initialize edit form when user loads
  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
    }
  }, [user]);

  // Fetch orders count
  const fetchOrdersCount = async () => {
    try {
      const token = await getToken();
      if (!token) return;
      const response = await API.get('/api/order/customer', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data?.orders) {
        setOrdersCount(response.data.orders.length);
      }
    } catch (error) {
      console.log('Error fetching orders count in profile:', error);
    }
  };

  useEffect(() => {
    fetchOrdersCount();
  }, []);

  // Fetch orders count when screen is focused
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchOrdersCount();
    });
    return unsubscribe;
  }, [navigation]);

  const handleUpdateProfile = async () => {
    if (!username || !email) {
      Alert.alert('Error', 'Name and Email are required.');
      return;
    }

    setIsSaving(true);
    try {
      const token = await getToken();
      await API.put('/api/user/profile', 
        { username, email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await refreshUser();
      Alert.alert('Success', 'Profile updated successfully.');
      setEditModalVisible(false);
    } catch (error: any) {
      const msg = error.response?.data?.message || 'Failed to update profile';
      Alert.alert('Error', msg);
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New passwords do not match.');
      return;
    }

    setIsSaving(true);
    try {
      const token = await getToken();
      await API.put('/api/user/change-password', 
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Alert.alert('Success', 'Password changed successfully.');
      setPasswordModalVisible(false);
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      const msg = error.response?.data?.message || 'Failed to change password';
      Alert.alert('Error', msg);
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: signOut },
    ]);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Ionicons name="arrow-back" size={18} color="#000" />
        </TouchableOpacity>

        <Text style={styles.pageTitle}>My Profile</Text>
        <View style={{width:40}}/>
      </View>

   
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
      >
        <View style={styles.profileCardContainer}>
          <View style={styles.orderCardSubContainer}>
            <TouchableOpacity style={styles.Row} onPress={() => setEditModalVisible(true)}>
              <View style={styles.cardProfile}>
                <View style={styles.avatarContainer}>
                  <Image
                    source={{ uri: 'https://i.pravatar.cc/150?img=32' }}
                    style={styles.avatar}
                  />
                </View>
                <View>
                  <Text style={styles.profileName}>{user?.username || 'Guest User'}</Text>
                  <Text style={styles.profileRole}>{user?.email || 'Customer'}</Text>
                </View>
              </View>
              <Feather name="edit-3" size={22} color="#ff5b27" />
            </TouchableOpacity>
          </View>
          <View style={styles.line} />


          <View style={styles.cardFooter}>
            <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('Orders')}>
              <Text style={styles.cardHeaderTitle}>{ordersCount}</Text>
              <Text style={styles.Text}>Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('MyWishlist')}>
              <Text style={styles.cardHeaderTitle}>{wishlist.length}</Text>
              <Text style={styles.Text}>Wishlist</Text>
            </TouchableOpacity>
            <View style={styles.box}>
              <Text style={styles.cardHeaderTitle}>
                {user?.createdAt ? new Date(user.createdAt).getFullYear() : new Date().getFullYear()}
              </Text>
              <Text style={styles.Text}>Joined</Text>
            </View>
          </View>
        </View>

      
        <Text style={styles.cardHeaderTitle}>Account Settings</Text>
        <View style={styles.profileCardContainer}>
          <View style={styles.orderCardSubContainer}>
            <TouchableOpacity onPress={() => setEditModalVisible(true)}>
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

            <TouchableOpacity onPress={() => navigation.navigate('AddLocation')}>
              <View style={styles.Row}>
                <View style={styles.cardProfile}>
                  <View style={styles.iconContainer}>
                    <Ionicons name="location-outline" size={22} color="#ff6a32" />
                  </View>
                  <Text style={styles.settings}>Saved Addresses</Text>
                </View>
                <FontAwesome6 name="angle-right" size={16} color="#ff6a32" />
              </View>
            </TouchableOpacity>

            <View style={styles.line} />

            <TouchableOpacity onPress={() => setNotificationsModalVisible(true)}>
              <View style={styles.Row}>
                <View style={styles.cardProfile}>
                  <View style={styles.iconContainer}>
                    <Ionicons
                      name="notifications-outline"
                      size={20}
                      color="#ff6a32"
                    />
                  </View>
                  <Text style={styles.settings}>Notifications</Text>
                </View>
                <FontAwesome6 name="angle-right" size={16} color="#ff6a32" />
              </View>
            </TouchableOpacity>
            
            <View style={styles.line} />
            
            <TouchableOpacity onPress={() => setPasswordModalVisible(true)}>
              <View style={styles.Row}>
                <View style={styles.cardProfile}>
                  <View style={styles.iconContainer}>
                    <Ionicons
                      name="lock-closed-outline"
                      size={20}
                      color="#ff6a32"
                    />
                  </View>
                  <Text style={styles.settings}>Change Password</Text>
                </View>
                <FontAwesome6 name="angle-right" size={16} color="#ff6a32" />
              </View>
            </TouchableOpacity>
            
            <View style={styles.line} />

            <TouchableOpacity onPress={() => navigation.navigate('MyWishlist')}>
              <View style={styles.Row}>
                <View style={styles.cardProfile}>
                  <View style={styles.iconContainer}>
                    <Ionicons name="heart-outline" size={20} color="#ff6a32" />
                  </View>
                  <Text style={styles.settings}>My Wishlist</Text>
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
                <Text style={styles.settings}>Logout</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isVisible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        username={username}
        setUsername={setUsername}
        email={email}
        setEmail={setEmail}
        onSave={handleUpdateProfile}
        isSaving={isSaving}
      />

      {/* Change Password Modal */}
      <ChangePasswordModal
        isVisible={passwordModalVisible}
        onClose={() => setPasswordModalVisible(false)}
        oldPassword={oldPassword}
        setOldPassword={setOldPassword}
        newPassword={newPassword}
        setNewPassword={setNewPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        onUpdate={handleChangePassword}
        isSaving={isSaving}
      />

      {/* Notifications Settings Modal */}
      <NotificationsModal
        isVisible={notificationsModalVisible}
        onClose={() => setNotificationsModalVisible(false)}
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

export default UserProfile;
