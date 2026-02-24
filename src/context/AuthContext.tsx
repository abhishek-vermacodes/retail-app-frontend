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
  refreshUser: () => Promise<void>;
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

      if (!token) {
        setLoading(false);
        return;
      }

      if (token) {
        API.defaults.headers.common.Authorization = `Bearer ${token}`;

        try {
          const response = await API.get('/user/me');
          console.log('response', response);
          const loggedUser = response.data.user;

          setUser({
            id: loggedUser.id,
            username: loggedUser.username,
            email: loggedUser.email,
            role: loggedUser.role,
            address: loggedUser.address,
          });
        } catch (err) {
          console.log('Failed to fetch user', err);
          await removeToken();
          setUser(null);
        } finally {
          setLoading(false);
        }
      }

      setLoading(false);
    };

    bootstrapAuth();
  }, []);

  const refreshUser = async () => {
    try {
      setLoading(true);

      const token = await getToken();
      if (!token) {
        setUser(null);
        return;
      }

      API.defaults.headers.common.Authorization = `Bearer ${token}`;
      const response = await API.get('/user/me');
      setUser(response.data.user);
    } catch (error) {
      console.log('Failed to Get User', error);
      await removeToken();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const res = await signin({ email, password });
      console.log('signin response', res);

      await setToken(res.data.token);
      API.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;
      setUser(res.data.user);
    } catch (error) {
      console.error('Failed to signin', error);
    }
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
    <AuthContext.Provider
      value={{ user, loading, signIn, signUp, signOut, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
