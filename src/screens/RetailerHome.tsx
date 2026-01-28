import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';

const RetailerHomeScreen = () => {
  return (
    <LinearGradient
      start={{ x: 1.2, y: 0 }}
      end={{ x: 0, y: 0.6 }}
      colors={['#ff693299', '#ffffff']}
      locations={[0, 0.6]}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.welcome}>Welcome back,</Text>
            <Text style={styles.username}>Retail Pro</Text>
          </View>

          <View style={styles.headerIcons}>
            <View style={styles.notification}>
              <Ionicons name="notifications-outline" size={18} />
              <View style={styles.dot} />
            </View>
            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
                style={styles.avatar}
              />
            </View>
          </View>
        </View>

        {/* Banner */}
        <View style={styles.banner}>
          <View style={styles.badge}>
            <Ionicons name="sparkles-outline" size={14} color="#fff" />
            <Text style={styles.badgeText}>New Feature</Text>
          </View>

          <Text style={styles.bannerTitle}>Launch your{'\n'}online store</Text>
          <Text style={styles.bannerDesc}>
            Start selling products directly to{'\n'}customers with zero
            commission.
          </Text>

          <TouchableOpacity style={styles.bannerBtn}>
            <Text style={styles.bannerBtnText}>Create Shop</Text>
            <Ionicons name="arrow-forward" size={16} color="#ff6a32" />
          </TouchableOpacity>

          <View style={styles.circle} />
          <Image
            source={require('../assets/images/bag.jpeg')}
            style={styles.bagImage}
          />
        </View>

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

        {/* Get Started */}
        <Text style={styles.sectionTitle}>Get Started</Text>

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
    </LinearGradient>
  );
};

export default RetailerHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  welcome: { color: '#888', fontFamily: 'Poppins-Regular', fontSize: 12 },
  username: { fontSize: 20, fontFamily: 'Poppins-Bold' },
  headerIcons: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  notification: {
    position: 'relative',
    backgroundColor: '#fff',
    padding: 7,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#bbb',
  },
  dot: {
    position: 'absolute',
    right: 10,
    top: 10,
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: 'red',
  },
  avatarContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    padding: 2,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#bbb',
  },
  avatar: { width: '100%', height: '100%', borderRadius: 18 },
  banner: {
    borderRadius: 22,
    backgroundColor: '#ff6a32',
    padding: 20,
    marginBottom: 24,
    position: 'relative',
    overflow: 'hidden',
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
  overviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  iconBoxGray: {
    backgroundColor: '#f3f3f3',
    padding: 16,
    borderRadius: 12,
  },
  actionTitle: { fontSize: 13, fontFamily: 'Poppins-Medium' },
  actionDesc: { fontSize: 11, color: '#888', fontFamily: 'Poppins-Regular' },
  getStartedSection: {
    marginTop: 12,
    flexDirection: 'column',
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
});
