import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Switch,
} from 'react-native';
import Modal from 'react-native-modal';
import styles from '../userProfile.styles';

interface NotificationsModalProps {
  isVisible: boolean;
  onClose: () => void;
  pushEnabled: boolean;
  setPushEnabled: (val: boolean) => void;
  emailEnabled: boolean;
  setEmailEnabled: (val: boolean) => void;
  smsEnabled: boolean;
  setSmsEnabled: (val: boolean) => void;
}

const NotificationsModal = ({
  isVisible,
  onClose,
  pushEnabled,
  setPushEnabled,
  emailEnabled,
  setEmailEnabled,
  smsEnabled,
  setSmsEnabled,
}: NotificationsModalProps) => {
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
        <Text style={styles.drawerTitle}>Notification Preferences</Text>

        <View style={styles.switchRow}>
          <View style={styles.switchTextWrapper}>
            <Text style={styles.switchTitle}>Push Notifications</Text>
            <Text style={styles.switchDesc}>Receive real-time order status updates and notifications.</Text>
          </View>
          <Switch
            value={pushEnabled}
            onValueChange={setPushEnabled}
            trackColor={{ false: '#dcdcdc', true: '#ffe3d9' }}
            thumbColor={pushEnabled ? '#ff5b27' : '#f4f3f4'}
          />
        </View>

        <View style={styles.switchRow}>
          <View style={styles.switchTextWrapper}>
            <Text style={styles.switchTitle}>Email Notifications</Text>
            <Text style={styles.switchDesc}>Receive receipts, invoices, and promotion emails.</Text>
          </View>
          <Switch
            value={emailEnabled}
            onValueChange={setEmailEnabled}
            trackColor={{ false: '#dcdcdc', true: '#ffe3d9' }}
            thumbColor={emailEnabled ? '#ff5b27' : '#f4f3f4'}
          />
        </View>

        <View style={styles.switchRow}>
          <View style={styles.switchTextWrapper}>
            <Text style={styles.switchTitle}>SMS Notifications</Text>
            <Text style={styles.switchDesc}>Receive verification codes and delivery reminders.</Text>
          </View>
          <Switch
            value={smsEnabled}
            onValueChange={setSmsEnabled}
            trackColor={{ false: '#dcdcdc', true: '#ffe3d9' }}
            thumbColor={smsEnabled ? '#ff5b27' : '#f4f3f4'}
          />
        </View>

        <View style={styles.modalBtnContainer}>
          <TouchableOpacity style={styles.primaryBtn} onPress={onClose}>
            <Text style={styles.primaryBtnText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default NotificationsModal;
