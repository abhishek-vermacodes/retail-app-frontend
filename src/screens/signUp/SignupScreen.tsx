import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  Alert,
  StatusBar,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './SignUp.styles';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const SignupScreen = () => {
  const navigation = useNavigation<any>();

  const [isVisible, setIsVisible] = useState(false);
  const [role, setRole] = useState('customer');
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    role: 'customer',
  });

  const { signUp, loading } = useContext(AuthContext);

  const handleSignup = async () => {
    try {
      const res = signUp(user.username, user.email, user.password, user.role);
      console.log('res', res);
      Alert.alert('success', 'Signup successful');

      const email = user.email;
      setUser({ username: '', email: '', password: '', role: 'customer' });
      setRole('customer');

      await AsyncStorage.setItem('email', email);

      navigation.navigate('Verification');
    } catch (error) {
      console.log('Signup Failed', error);
      Alert.alert('error', 'Signup Failed');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <StatusBar barStyle={'dark-content'} />

      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>
        Join Retail Pro to manage your business efficiently.
      </Text>

      <View style={styles.roleContainer}>
        <Text style={styles.roleLabel}>I am a...</Text>
        <View style={styles.roleOptions}>
          <TouchableOpacity
            style={[
              styles.roleCard,
              role === 'customer' && styles.roleCardActive,
            ]}
            onPress={() => {
              setRole('customer');
              setUser(prev => ({ ...prev, role: 'customer' }));
            }}
            activeOpacity={0.8}
          >
            <View
              style={[
                styles.checkIconContainer,
                role === 'customer' && styles.checkIconContainerActive,
              ]}
            >
              {role === 'customer' ? (
                <Feather name="check" size={10} color={'#000000'} />
              ) : (
                ''
              )}
            </View>
            <View
              style={[
                styles.iconContainer,
                role === 'customer' && styles.iconContainerActive,
              ]}
            >
              <Feather
                name="user"
                size={18}
                color={role === 'customer' ? '#000000' : '#949494'}
              />
            </View>
            <Text
              style={[
                styles.cardText,
                role === 'customer' && styles.cardTextActive,
              ]}
            >
              Customer
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.roleCard,
              role === 'retailer' && styles.roleCardActive,
            ]}
            onPress={() => {
              setRole('retailer');
              setUser(prev => ({ ...prev, role: 'retailer' }));
            }}
            activeOpacity={0.8}
          >
            <View
              style={[
                styles.checkIconContainer,
                role === 'retailer' && styles.checkIconContainerActive,
              ]}
            >
              {role === 'retailer' ? (
                <Feather name="check" size={10} color={'#000000'} />
              ) : (
                ''
              )}
            </View>
            <View
              style={[
                styles.iconContainer,
                role === 'retailer' && styles.iconContainerActive,
              ]}
            >
              {role === 'retailer' ? (
                <Image
                  source={require('../../assets/icons/shopBlack.png')}
                  style={styles.shopIcon}
                />
              ) : (
                <Image
                  source={require('../../assets/icons/shopGray.png')}
                  style={styles.shopIcon}
                />
              )}
            </View>
            <Text
              style={[
                styles.cardText,
                role === 'retailer' && styles.cardTextActive,
              ]}
            >
              Retailer
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Username</Text>
        <View style={styles.inputWrapper}>
          <MaterialIcons
            name="person"
            size={20}
            color="#00000061"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="e.g. Alex Morgan"
            placeholderTextColor="#00000061"
            value={user.username}
            onChangeText={text => setUser({ ...user, username: text })}
          />
        </View>
      </View>

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
            placeholder="Create a password"
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

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>
          {loading ? 'Loading...' : 'Sign Up'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.terms}>
        Already have an account?{' '}
        <Text onPress={() => navigation.navigate('Signin')} style={styles.link}>
          Sign In
        </Text>
      </Text>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;
