export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  role: 'retailer' | 'customer' | string;
  otp: string | null;
  otpExpiry: string | null;
  isVerified: boolean;
  createdAt: string;
}

export interface Store {
  id: string;
  storeName: string;
  category: string;
  description: string;
  address: string;
  image: string;
  phone: string;
  createdAt: string;
  user: User;
}

export interface StoreResponse {
  store: Store;
}

export interface Product {
  id: string;
  productName: string;
  price: string;
  stock: number;
  category: string;
  description: string;
  image: string;
  createdAt: string;
}

export interface Store {
  id: string;
  storeName: string;
  category: string;
  description: string;
  address: string;
  image: string;
  phone: string;
  createdAt: string; 
}
