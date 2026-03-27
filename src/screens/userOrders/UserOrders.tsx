import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import styles from './userOrders.styles';



const UserOrders = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome6 name="arrow-left" size={18} color="#000" />
        </TouchableOpacity>

        <Text style={styles.pageTitle}>My Orders</Text>

        <TouchableOpacity style={styles.likeButton}>
          <Entypo name="dots-three-vertical" size={18} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
       

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
};

export default UserOrders;
