import { useNavigation } from '@react-navigation/native';

import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  Alert,
  StatusBar,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AuthContext } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      signUp(user.username, user.email, user.password, user.role);
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
                  source={require('../assets/icons/shopBlack.png')}
                  style={styles.shopIcon}
                />
              ) : (
                <Image
                  source={require('../assets/icons/shopGray.png')}
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

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 60,
    paddingBottom: 60,
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
    marginTop: -6,
    marginBottom: 40,
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
    color: '#000',
  },
  button: {
    height: 50,
    backgroundColor: '#ff5b27',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70,
    marginBottom: 30,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Poppins-0Regular',
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
  roleContainer: {
    marginBottom: 30,
  },
  roleLabel: {
    fontSize: 14,
    marginBottom: 10,
    fontFamily: 'Poppins-Medium',
    color: '#000000',
  },
  roleOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  roleCard: {
    width: '48%',
    height: 120,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#00000061',
    backgroundColor: 'transparent',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    position: 'relative',
  },
  roleCardActive: {
    backgroundColor: '#ffded4',
    borderColor: '#ff5b27',
  },
  iconContainer: {
    height: 40,
    width: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8e8e8',
    borderRadius: 30,
  },
  iconContainerActive: {
    backgroundColor: '#ffffff',
  },
  cardText: {
    fontSize: 14,
    color: '#000000',
    fontFamily: 'Poppins-Medium',
  },
  cardTextActive: {
    color: '#ff5b27',
  },
  checkIconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#ffffff',
    borderColor: '#00000061',
    borderWidth: 1,
    borderRadius: 30,
    height: 20,
    width: 20,
  },
  checkIconContainerActive: {
    borderColor: 'none',
    borderWidth: 0,
  },
  shopIcon: {
    height: 20,
    width: 20,
  },
});
