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

import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import styles from './userProfile.styles';

const UserProfileScreen = () => {
  const navigation = useNavigation<any>();
  const { signOut } = useContext(AuthContext);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: signOut },
    ]);
  };

  return (
    <ScrollView style={styles.mainContainer}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome6 name="arrow-left" size={18} color="#000" />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>My Profile</Text>
      </View>

      {/* Profile Card */}
      <View style={styles.profileCardContainer}>
        <View style={styles.orderCardSubContainer}>
          <View style={styles.Row}>
            <View style={styles.cardProfile}>
              <View style={styles.avatarContainer}>
                <Image
                  source={{ uri: 'https://i.pravatar.cc/150?img=32' }}
                  style={styles.avatar}
                />
              </View>
              <View>
                <Text style={styles.profileName}>Rahul Sharma</Text>
                <Text style={styles.profileRole}>User</Text>
              </View>
            </View>
            <Feather name="edit-3" size={22} color="#ff5b27" />
          </View>
        </View>
        <View style={styles.line} />

        {/* Analytics */}
        <View style={styles.cardFooter}>
          <View style={styles.box}>
            <Text style={styles.cardHeaderTitle}>28</Text>
            <Text style={styles.Text}>Orders</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.cardHeaderTitle}>12</Text>
            <Text style={styles.Text}>Wishlist</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.cardHeaderTitle}>4.6</Text>
            <Text style={styles.Text}>Rating</Text>
          </View>
        </View>
      </View>

      {/* Account Settings */}
      <Text style={styles.cardHeaderTitle}>Account Settings</Text>
      <View style={styles.profileCardContainer}>
        <View style={styles.orderCardSubContainer}>
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

          <View style={styles.line} />

          <View style={styles.Row}>
            <View style={styles.cardProfile}>
              <View style={styles.iconContainer}>
                <Ionicons name="location-outline" size={22} color="#ff6a32" />
              </View>
              <Text style={styles.settings}>Saved Addresses</Text>
            </View>
            <FontAwesome6 name="angle-right" size={16} color="#ff6a32" />
          </View>

          <View style={styles.line} />

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
        </View>
      </View>

      {/* Support */}
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
  );
};

export default UserProfileScreen;


