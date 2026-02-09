import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import React, { useState } from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const CustomerHelpScreen = () => {
  const navigation = useNavigation<any>();
    const [isVisible, setIsVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
  return (
    <View style={styles.mainContainer}>
   
   
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome6 name="arrow-left" size={18} color="#000" />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Help Center</Text>
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
            <HelpRow title="Track My Orders" icon="truck" />
            <View style={styles.line} />
            <HelpRow title="Payments & Refunds" icon="credit-card" />
            <View style={styles.line} />
            <HelpRow title="Account Issues" icon="user" />
            <View style={styles.line} />
            <HelpRow title="Returns & Cancellations" icon="rotate-left" />
          </View>
        </View>

        <Text style={styles.cardHeaderTitle}>Support</Text>
        <View style={styles.cardContainer}>
          <View style={styles.CardSubContainer}>
            <HelpRow title="Chat with Support" icon="message" />
            <View style={styles.line} />
            <HelpRow title="Email Support" icon="envelope" />
            <View style={styles.line} />
            <HelpRow title="Call Customer Care" icon="phone" />
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

export default CustomerHelpScreen;


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff5f0',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginBottom: 10,
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
  searchBtn: {
    position: 'absolute',
    right: 0,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ffe3d9',
    borderRadius: 50,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginTop: 20,
  },
  searchText: {
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },

  cardHeaderTitle: {
    fontSize: 14,
    color: '#000',
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 5,
  },
  cardContainer: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderColor: '#ffe3d9',
    borderWidth: 1,
    borderRadius: 16,
    marginBottom: 16,
  },
  CardSubContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'column',
    gap: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rowText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#000',
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
  line: {
    height: 1,
    width: '100%',
    backgroundColor: '#ffe3d9',
  },
  scrollView: {
    paddingBottom: 200,
    paddingTop: 20,
  },
});
