import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const OTP_LENGTH = 6;

const VerificationScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { email } = route.params;

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);

  const inputs = useRef<TextInput[]>([]);

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

      Alert.alert('Success', 'Email verified successfully');
      navigation.navigate('Signin');
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
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <FontAwesome6 name="arrow-left" size={20} color="#000000a3" />
      </TouchableOpacity>

      <Text style={styles.title}>Verification</Text>
      <Text style={styles.subtitle}>Enter the 4-digit code sent to</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 30,
    backgroundColor: '#FFF5F0',
  },
  title: {
    fontSize: 32,
    marginTop: 45,
    textAlign: 'center',
    marginBottom: 6,
    color: 'black',
    fontFamily: 'Poppins_600SemiBold',
  },
  subtitle: {
    fontSize: 15,
    color: '#000000a3',
    lineHeight: 20,
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
  },
  email: {
    fontSize: 14,
    color: '#000000',
    lineHeight: 20,
    fontFamily: 'Poppins_500Medium',
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  otpInput: {
    width: 50,
    height: 50,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#FFB3A0',
    marginHorizontal: 8,
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: '#FFF',
    marginTop: 30,
  },
  activeInput: {
    borderColor: '#ff5b27',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#4a4a4a',
    marginBottom: 5,
    fontFamily: 'Poppins_500Medium',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#00000016',
    paddingHorizontal: 10,
    height: 50,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  timer: {
    color: '#0000006d',
    marginTop: 30,
    textAlign: 'center',
  },
  resend: {
    color: '#FF5A1F',
    marginTop: 30,
    fontWeight: '600',
    textAlign: 'center',
  },
  button: {
    height: 50,
    backgroundColor: '#ff5b27',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 480,
    marginBottom: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
  },
});
