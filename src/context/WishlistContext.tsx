import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WishlistContext = createContext<any>(null);

export const WishlistProvider = ({ children }: any) => {
  const [wishlist, setWishlist] = useState<any[]>([]);

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    try {
      const data = await AsyncStorage.getItem('wishlist');
      if (data) {
        setWishlist(JSON.parse(data));
      }
    } catch (error) {
      console.log('Error loading wishlist', error);
    }
  };

  const saveWishlist = async (data: any[]) => {
    try {
      await AsyncStorage.setItem('wishlist', JSON.stringify(data));
    } catch (error) {
      console.log('Error saving wishlist', error);
    }
  };

  const addToWishlist = (product: any) => {
    const updated = [...wishlist, product];
    setWishlist(updated);
    saveWishlist(updated);
  };

  const removeFromWishlist = (id: string) => {
    const updated = wishlist.filter(item => item.id !== id);
    setWishlist(updated);
    saveWishlist(updated);
  };

  const isLiked = (id: string) => {
    return wishlist.some(item => item.id === id);
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, isLiked }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
