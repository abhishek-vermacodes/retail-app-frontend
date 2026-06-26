import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';
import styles from '../retailerProfile.styles';

interface EditProfileModalProps {
  isVisible: boolean;
  onClose: () => void;
  username: string;
  setUsername: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  onSave: () => void;
  isSaving: boolean;
}

const EditProfileModal = ({
  isVisible,
  onClose,
  username,
  setUsername,
  email,
  setEmail,
  onSave,
  isSaving,
}: EditProfileModalProps) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={styles.modal}
      useNativeDriver
      hideModalContentWhileAnimating
    >
      <View style={styles.drawer}>
        <View style={styles.drawerHandle} />
        <Text style={styles.drawerTitle}>Personal Information</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Username</Text>
          <View style={styles.inputWrapper}>
            <Feather name="user" size={18} color="#aaa" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              placeholder="Enter username"
              placeholderTextColor="#bbb"
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email Address</Text>
          <View style={styles.inputWrapper}>
            <Feather name="mail" size={18} color="#aaa" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter email"
              placeholderTextColor="#bbb"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

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

export default EditProfileModal;
