import {
  Text,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, { useContext } from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../context/AuthContext';

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

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff5f0',
    paddingHorizontal: 20,
    paddingVertical: 60,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    position: 'relative',
    paddingBottom: 20,
  },
  backBtn: {
    borderColor: '#bbb',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 50,
  },
  pageTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#000',
  },

  profileCardContainer: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderColor: '#ffe3d9',
    borderWidth: 1,
    borderRadius: 16,
    marginBottom: 16,
  },

  orderCardSubContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'column',
    gap: 20,
  },
  cardHeader: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  Row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  cardProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  profileName: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },

  profileRole: {
    color: '#000000a3',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  cardAvatarContainer: {
    height: 50,
    width: 50,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: { width: '100%', height: '100%', borderRadius: 100 },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: '#ffe3d9',
  },

  cardFooter: {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  box: {
    alignItems: 'center',
  },

  Text: {
    fontFamily: 'Poppins-Regular',
    color: '#000000a3',
    fontSize: 13,
  },
  shopDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  Edit: {
    fontFamily: 'Poppins-Regular',
    color: '#ff5b27',
  },
  shopContainer: {
    width: 50,
    height: 50,
    borderRadius: 6,
    padding: 2,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#bbb',
  },

  shop: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
  },
  storeDetails: {
    width: '70%',
  },

  accountSettings: {
    marginTop: 20,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },

  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 6,
    padding: 3,
    backgroundColor: '#ffe7dd',
    borderWidth: 1,
    borderColor: '#ff5b27',
    alignItems: 'center',
    justifyContent: 'center',
  },

  cardHeaderTitle: {
    fontSize: 14,
    color: '#000',
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 5,
  },

  settings: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  scrollView: {
    paddingBottom: 200,
  },
});
