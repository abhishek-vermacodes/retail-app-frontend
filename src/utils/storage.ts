import AsyncStorage from '@react-native-async-storage/async-storage';

// ================= TOKEN =================
export const setToken = async (token: string) => {
  await AsyncStorage.setItem('token', token);
};

export const getToken = async () => {
  return await AsyncStorage.getItem('token');
};

export const removeToken = async () => {
  await AsyncStorage.removeItem('token');
};

// ================= CART =================

// ✅ Get Cart
export const getCartItem = async () => {
  try {
    const data = await AsyncStorage.getItem('cart'); // FIXED KEY
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.log('Error getting cart', error);
    return [];
  }
};

// ✅ Add to Cart (single product)
export const setCartItem = async (newItem: any) => {
  try {
    const existingCart = await getCartItem();

    const index = existingCart.findIndex((item: any) => item.id === newItem.id);

    if (index !== -1) {
      existingCart[index].quantity = (existingCart[index].quantity || 1) + 1;
    } else {
      existingCart.push({ ...newItem, quantity: 1 });
    }

    await AsyncStorage.setItem('cart', JSON.stringify(existingCart));
  } catch (error) {
    console.log('Error saving cart item', error);
  }
};

// ✅ Update Full Cart (for qty changes)
export const updateCart = async (cart: any[]) => {
  try {
    await AsyncStorage.setItem('cart', JSON.stringify(cart));
  } catch (error) {
    console.log('Error updating cart', error);
  }
};

// ✅ Clear Cart (optional)
export const clearCart = async () => {
  await AsyncStorage.removeItem('cart');
};
