import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StatusBar,
} from 'react-native';

import API from '../../api/authApi';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import styles from './verification.styles';

const OTP_LENGTH = 6;

const VerificationScreen = () => {
  const navigation = useNavigation<any>();

  const [email, setEmail] = useState<string | null>(null);
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);

  const inputs = useRef<TextInput[]>([]);

  useEffect(() => {
    const getEmail = async () => {
      const storedEmail = await AsyncStorage.getItem('email');

      setEmail(storedEmail);
    };
    getEmail();
  }, []);

  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < OTP_LENGTH - 1) {
      inputs.current[index + 1].focus();
    }
  };

  const handleBackspace = (index: number) => {
    if (otp[index] === '' && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const verifyOtp = async () => {
    const otpValue = otp.join('');

    if (otpValue.length !== OTP_LENGTH) {
      Alert.alert('Error', 'Please enter 6 digit OTP');
      return;
    }

    try {
      setLoading(true);

      await API.post('/api/auth/verification', {
        email,
        otp: otpValue,
      });
      Alert.alert('Success', 'Email verified successfully');
      navigation.navigate('AddLocation');
    } catch (error: any) {
      Alert.alert(
        'Error',
        error?.response?.data?.message || 'OTP verification failed',
      );
    } finally {
      setLoading(false);
    }
  };

  const resendCode = () => {
    setTimer(30);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} />

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <FontAwesome6 name="arrow-left" size={20} color="#000000a3" />
      </TouchableOpacity>

      <Text style={styles.title}>Verification</Text>
      <Text style={styles.subtitle}>Enter the 6-digit code sent to</Text>
      <Text style={styles.email}>{email}</Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={ref => {
              if (ref) inputs.current[index] = ref;
            }}
            style={[styles.otpInput, digit && styles.activeInput]}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={value => handleChange(value, index)}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === 'Backspace') {
                handleBackspace(index);
              }
            }}
          />
        ))}
      </View>
      {timer > 0 ? (
        <Text style={styles.timer}>
          Resend code in 00:{timer < 10 ? `0${timer}` : timer}
        </Text>
      ) : (
        <TouchableOpacity onPress={resendCode}>
          <Text style={styles.resend}>Resend Code</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.button} onPress={verifyOtp}>
        <Text style={styles.buttonText}>
          {loading ? 'Verifying...' : 'Verify'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default VerificationScreen;
