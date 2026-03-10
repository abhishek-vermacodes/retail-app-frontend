import AsyncStorage from '@react-native-async-storage/async-storage';

export const setToken = async (token: string) => {
  await AsyncStorage.setItem('token', token);
};

export const getToken = async () => {
  return await AsyncStorage.getItem('token');
};

export const removeToken = async () => {
  await AsyncStorage.removeItem('token');
};

export const setCartItem = async (item: any) => {
  try {
    await AsyncStorage.setItem('item', JSON.stringify(item));
  } catch (error) {
    console.log('Error saving item', error);
  }
};

export const getCartItem = async () => {
  try {
    const data = await AsyncStorage.getItem('item');
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.log('Error getting item', error);
  }
};
