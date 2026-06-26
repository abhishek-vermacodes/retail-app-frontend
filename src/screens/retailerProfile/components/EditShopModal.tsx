import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import styles from '../retailerProfile.styles';

interface EditShopModalProps {
  isVisible: boolean;
  onClose: () => void;
  storeName: string;
  setStoreName: (s: string) => void;
  category: string;
  setCategory: (s: string) => void;
  description: string;
  setDescription: (s: string) => void;
  address: string;
  setAddress: (s: string) => void;
  phone: string;
  setPhone: (s: string) => void;
  onSave: () => void;
  isSaving: boolean;
}

const EditShopModal = ({
  isVisible,
  onClose,
  storeName,
  setStoreName,
  category,
  setCategory,
  description,
  setDescription,
  address,
  setAddress,
  phone,
  setPhone,
  onSave,
  isSaving,
}: EditShopModalProps) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={styles.modal}
      useNativeDriver
      hideModalContentWhileAnimating
    >
      <View style={[styles.drawer, { maxHeight: '80%' }]}>
        <View style={styles.drawerHandle} />
        <Text style={styles.drawerTitle}>Edit Shop Details</Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Shop Name</Text>
            <View style={styles.inputWrapper}>
              <Feather name="shopping-bag" size={18} color="#aaa" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={storeName}
                onChangeText={setStoreName}
                placeholder="Enter shop name"
                placeholderTextColor="#bbb"
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Category</Text>
            <View style={styles.inputWrapper}>
              <Feather name="tag" size={18} color="#aaa" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={category}
                onChangeText={setCategory}
                placeholder="e.g. Kirana, Clothing, Electronics"
                placeholderTextColor="#bbb"
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Description</Text>
            <View style={styles.inputWrapper}>
              <Feather name="align-left" size={18} color="#aaa" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={description}
                onChangeText={setDescription}
                placeholder="Enter shop description"
                placeholderTextColor="#bbb"
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Shop Address</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="location-outline" size={18} color="#aaa" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={address}
                onChangeText={setAddress}
                placeholder="Enter shop address"
                placeholderTextColor="#bbb"
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <View style={styles.inputWrapper}>
              <Feather name="phone" size={18} color="#aaa" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                placeholder="Enter phone number"
                placeholderTextColor="#bbb"
                keyboardType="phone-pad"
              />
            </View>
          </View>
        </ScrollView>

        <View style={styles.modalBtnContainer}>
          <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
            <Text style={styles.cancelBtnText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.primaryBtn} onPress={onSave} disabled={isSaving}>
            {isSaving ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.primaryBtnText}>Save</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default EditShopModal;
