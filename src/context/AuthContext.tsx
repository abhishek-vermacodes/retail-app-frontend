import React, { createContext, useEffect, useState } from 'react';
import { getToken, removeToken, setToken } from '../utils/storage';
import API, { signin, signup } from '../api/authApi';

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
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
    const loadUser = async () => {
      const token = await getToken();
      if (token) {
        API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  const signIn = async (email: string, password: string) => {
    const res = await signin({ email, password });
    const { token, user } = res.data;

    await setToken(token);
    setUser(user);
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
