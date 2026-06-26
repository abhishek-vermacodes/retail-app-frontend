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
import styles from '../userProfile.styles';

interface ChangePasswordModalProps {
  isVisible: boolean;
  onClose: () => void;
  oldPassword: string;
  setOldPassword: (p: string) => void;
  newPassword: string;
  setNewPassword: (p: string) => void;
  confirmPassword: string;
  setConfirmPassword: (p: string) => void;
  onUpdate: () => void;
  isSaving: boolean;
}

const ChangePasswordModal = ({
  isVisible,
  onClose,
  oldPassword,
  setOldPassword,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  onUpdate,
  isSaving,
}: ChangePasswordModalProps) => {
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
        <Text style={styles.drawerTitle}>Change Password</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Current Password</Text>
          <View style={styles.inputWrapper}>
            <Feather name="lock" size={18} color="#aaa" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              value={oldPassword}
              onChangeText={setOldPassword}
              placeholder="Enter current password"
              placeholderTextColor="#bbb"
              secureTextEntry
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>New Password</Text>
          <View style={styles.inputWrapper}>
            <Feather name="lock" size={18} color="#aaa" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="Enter new password"
              placeholderTextColor="#bbb"
              secureTextEntry
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Confirm New Password</Text>
          <View style={styles.inputWrapper}>
            <Feather name="lock" size={18} color="#aaa" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm new password"
              placeholderTextColor="#bbb"
              secureTextEntry
            />
          </View>
        </View>

        <View style={styles.modalBtnContainer}>
          <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
            <Text style={styles.cancelBtnText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.primaryBtn} onPress={onUpdate} disabled={isSaving}>
            {isSaving ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.primaryBtnText}>Update</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ChangePasswordModal;
