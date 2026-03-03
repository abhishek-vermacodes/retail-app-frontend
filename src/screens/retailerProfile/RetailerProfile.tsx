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
import styles from './retailerProfile.styles';

const RetailerProfileScreen = () => {
  const navigation = useNavigation<any>();

  const { signOut } = useContext(AuthContext);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => {
          signOut();
        },
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
                  <Text style={styles.profileName}> Abhishek Verma</Text>
                  <Text style={styles.profileRole}> Retailer</Text>
                </View>
              </View>
              <Feather name="edit-3" size={22} color={'#ff5b27'} />
            </View>
          </View>
          <View style={styles.line} />
          <View style={styles.cardFooter}>
            <View style={styles.box}>
              <Text style={styles.cardHeaderTitle}>126</Text>
              <Text style={styles.Text}>Orders</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.cardHeaderTitle}>45</Text>
              <Text style={styles.Text}>Products</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.cardHeaderTitle}>4.8</Text>
              <Text style={styles.Text}>Rating</Text>
            </View>
          </View>
        </View>

        <View style={styles.profileCardContainer}>
          <View style={styles.orderCardSubContainer}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardHeaderTitle}>Shop Details</Text>
              <Text style={styles.Edit}>Edit</Text>
            </View>
            <View style={styles.cardProfile}>
              <View style={styles.shopContainer}>
                <Image
                  source={require('../assets/images/bag.jpeg')}
                  style={styles.shop}
                />
              </View>
              <View style={styles.storeDetails}>
                <Text style={styles.profileName}> Abhishek Kirana Store</Text>
                <Text style={styles.profileRole}>
                  Shop No. 12, Main Market Road , Ratlam - 457001
                </Text>
              </View>
            </View>
          </View>
        </View>

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
                  <Ionicons name="card-outline" size={22} color="#ff6a32" />
                </View>

                <Text style={styles.settings}> Subscription & Billing</Text>
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

                <Text style={styles.settings}> Notifications</Text>
              </View>
              <FontAwesome6 name="angle-right" size={16} color="#ff6a32" />
            </View>
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
    </View>
  );
};

export default RetailerProfileScreen;

