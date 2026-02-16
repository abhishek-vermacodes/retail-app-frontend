import React, { createContext, useEffect, useState } from 'react';
import { getToken, removeToken, setToken } from '../utils/storage';
import API, { signin, signup } from '../api/authApi';

interface User {
  id: number;
  username: string;
  email: string;
  role: 'retailer' | 'customer';
  address: string;
}

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    username: string,
    email: string,
    password: string,
    role: string,
  ) => Promise<void>;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bootstrapAuth = async () => {
      const token = await getToken();

      if (token) {
        API.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        try {
          const res = await API.get('/user/me');
          setUser(res.data.user);
        } catch (err) {
          await removeToken();
          console.log('Failed to fetch user', err);
          setUser(null);
        }
      }

      setLoading(false);
    };

    bootstrapAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    const res = await signin({ email, password });
    console.log('res', res.data);
    await setToken(res.data.token);
    API.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
    setUser(res.data.user);
  };

  const signUp = async (
    username: string,
    email: string,
    password: string,
    role: string,
  ) => {
    await signup({ username, email, password, role });
  };

  const signOut = async () => {
    await removeToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
