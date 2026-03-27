import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCartItem, updateCart } from '../utils/storage';

const CartContext = createContext<any>(null);

export const CartProvider = ({ children }: any) => {
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    const items = await getCartItem();
    setCartItems(items || []);
  };

  const addToCart = async (newItem: any) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === newItem.id);

      let updated;

      if (existing) {
        updated = prev.map(item =>
          item.id === newItem.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item,
        );
      } else {
        updated = [...prev, { ...newItem, quantity: 1 }];
      }

      updateCart(updated);
      return updated;
    });
  };

  const increaseQty = async (id: string) => {
    setCartItems(prev => {
      const updated = prev.map(item =>
        item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item,
      );

      updateCart(updated);
      return updated;
    });
  };

  const decreaseQty = async (id: string) => {
    setCartItems(prev => {
      const updated = prev
        .map(item =>
          item.id === id
            ? { ...item, quantity: (item.quantity || 1) - 1 }
            : item,
        )
        .filter(item => item.quantity > 0);

      updateCart(updated);
      return updated;
    });
  };

  const removeItem = async (id: string) => {
    setCartItems(prev => {
      const updated = prev.filter(item => item.id !== id);

      updateCart(updated);
      return updated;
    });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQty,
        decreaseQty,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
