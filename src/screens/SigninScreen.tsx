import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  // Alert,
  KeyboardAvoidingView,
} from 'react-native';

import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { AuthContext } from '../context/AuthContext';
// import axios from 'axios';

const SigninScreen = () => {
  const navigation = useNavigation<any>();
  const { signIn, loading } = useContext(AuthContext);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [isVisible, setIsVisible] = useState(false);
  const handleSignin = () => {
    signIn(user.email, user.password);
  };
  // const [loading, setLoading] = useState(false);

  // const onSignin = async () => {
  //   if (!user.email || !user.password) {
  //     Alert.alert('Error', 'All fields are required');
  //     return;
  //   }

  //   try {
  //     setLoading(true);
  //     await axios.post('http://192.168.1.3:5000/api/auth/signin', user);
  //     Alert.alert('success', 'Signin successful');
  //     setUser({ email: '', password: '' });
  //   } catch (error) {
  //     Alert.alert('Error', 'Signup failed');
  //     console.log('Signin failed', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <TouchableOpacity
        style={styles.headerBtn}
        onPress={() => navigation.goBack()}
      >
        <FontAwesome6 name="arrow-left" size={18} color="#000000" />
      </TouchableOpacity>

      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>
        Sign in to continue managing your retail business
      </Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputWrapper}>
          <MaterialIcons
            name="email"
            size={20}
            color="#00000061"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="name@example.com"
            placeholderTextColor="#00000061"
            keyboardType="email-address"
            autoCapitalize="none"
            value={user.email}
            onChangeText={text => setUser({ ...user, email: text })}
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.inputWrapper}>
          <MaterialIcons
            name="lock"
            size={20}
            color="#00000061"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#00000061"
            secureTextEntry={!isVisible}
            value={user.password}
            onChangeText={text => setUser({ ...user, password: text })}
          />
          <TouchableOpacity onPress={() => setIsVisible(prev => !prev)}>
            {isVisible ? (
              <Feather name="eye" size={20} color="black" />
            ) : (
              <Feather name="eye-off" size={20} color="black" />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <Text
        style={styles.forgotText}
        onPress={() => navigation.navigate('ForgotPassword')}
      >
        Forgot Password?
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleSignin}>
        <Text style={styles.buttonText}>
          {loading ? 'loading...' : 'Sign Up'}
        </Text>
      </TouchableOpacity>

      {/* <Text style={styles.terms}>Or continue with</Text> */}

      {/* <View style={styles.extraButtonWrapper}>
        <TouchableOpacity style={styles.extraButton}>
          <FontAwesome6 name="google" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.extraButton}>
          <Fontisto name="apple" size={24} color="black" />
        </TouchableOpacity>
      </View> */}

      <Text style={styles.terms}>
        Dont have an account?{' '}
        <Text onPress={() => navigation.navigate('Signup')} style={styles.link}>
          Sign Up
        </Text>
      </Text>
    </KeyboardAvoidingView>
  );
};

export default SigninScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 32,
    marginTop: 45,
    color: '#000000',
    fontFamily: 'Poppins-SemiBold',
  },
  subtitle: {
    fontSize: 14,
    color: '#000000a3',
    lineHeight: 20,
    marginBottom: 40,
    marginTop: -6,
    fontFamily: 'Poppins-Regular',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 5,
    fontFamily: 'Poppins-Medium',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#00000061',
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
  button: {
    height: 50,
    backgroundColor: '#ff5b27',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 270,
    marginBottom: 30,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  terms: {
    fontSize: 13,
    color: '#000000a3',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  extraButtonWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
    height: 80,
    marginTop: 30,
  },
  extraButton: {
    width: '48%',
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#ffffff',
    borderColor: '#00000016',
  },
  link: {
    color: '#ff5b27',
    fontWeight: '700',
  },
  forgotText: {
    textAlign: 'right',
    fontFamily: 'Poppins-Medium',
    color: '#ff5b27',
  },
  headerBtn: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#bbb',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 30,
  },
});
