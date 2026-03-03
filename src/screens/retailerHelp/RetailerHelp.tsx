import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import styles from './retailerHelp.styles';

const RetailerHelp = () => {
  const navigation = useNavigation<any>();
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.mainContainer}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome6 name="arrow-left" size={18} color="#000" />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Retailer Help</Text>
        <Feather
          name="search"
          size={22}
          color={'#000'}
          style={styles.searchBtn}
          onPress={() => setIsVisible(prev => !prev)}
        />
      </View>

      {isVisible && (
        <View style={styles.searchContainer}>
          <Feather name="search" color={'#000000a3'} size={20} />
          <TextInput
            placeholder="Search for Products..."
            placeholderTextColor={'#000000a3'}
            style={styles.searchText}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      )}

      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.cardHeaderTitle}>Quick Help</Text>
        <View style={styles.cardContainer}>
          <View style={styles.CardSubContainer}>
            <HelpRow title="Manage Orders" icon="truck" />
            <View style={styles.line} />
            <HelpRow title="Payments & Settlements" icon="credit-card" />
            <View style={styles.line} />
            <HelpRow title="Product Listing Issues" icon="boxes" />
            <View style={styles.line} />
            <HelpRow title="Returns from Customers" icon="rotate-left" />
          </View>
        </View>

        <Text style={styles.cardHeaderTitle}>Support</Text>
        <View style={styles.cardContainer}>
          <View style={styles.CardSubContainer}>
            <HelpRow title="Chat with Retailer Support" icon="message" />
            <View style={styles.line} />
            <HelpRow title="Email Retailer Team" icon="envelope" />
            <View style={styles.line} />
            <HelpRow title="Call Account Manager" icon="phone" />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const HelpRow = ({ title, icon }: { title: string; icon: string }) => (
  <TouchableOpacity style={styles.row}>
    <View style={styles.rowLeft}>
      <View style={styles.iconContainer}>
        <FontAwesome6 name={icon as any} size={16} color="#ff6a32" />
      </View>
      <Text style={styles.rowText}>{title}</Text>
    </View>
    <FontAwesome6 name="angle-right" size={16} color="#ff6a32" />
  </TouchableOpacity>
);
export default RetailerHelp;


