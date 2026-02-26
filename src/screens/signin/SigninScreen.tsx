import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  StatusBar,
} from 'react-native';
import styles from './Signin.styles';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const SigninScreen = () => {
  const navigation = useNavigation<any>();
  const { signIn, loading } = useContext(AuthContext);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [isVisible, setIsVisible] = useState(false);

  const handleSignin = async () => {
    signIn(user.email, user.password);
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar barStyle={'dark-content'} />

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
          {loading ? 'loading...' : 'Sign In'}
        </Text>
      </TouchableOpacity>

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
