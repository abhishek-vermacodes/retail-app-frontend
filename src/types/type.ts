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

export interface LocationProperties {
  postcode?: string;
  housenumber?: string;
  countrycode?: string;
  name?: string;
  street?: string;
  district?: string;
  city?: string;
  county?: string;
  state?: string;
  country?: string;
}

export interface LocationGeometry {
  type: string;
  coordinates: [number, number];
}

export interface LocationFeature {
  type: string;
  properties: LocationProperties;
  geometry: LocationGeometry;
}

export interface PhotonResponse {
  type: string;
  features: LocationFeature[];
}

export const categories = [
  { label: 'All', value: '' },
  { label: 'Grocery', value: 'grocery' },
  { label: 'Fresh Items', value: 'fresh' },
  { label: 'Personalcare', value: 'personal' },
  { label: 'Household', value: 'home' },
  { label: 'Babycare', value: 'baby' },
  { label: 'Healthcare', value: 'health' },
  { label: 'Fashion', value: 'fashion' },
  { label: 'Electronic', value: 'electronic' },
  { label: 'Stationery', value: 'stationery' },
];

export const shopCategories = ['Grocery', 'Medicine', 'Electronics', 'Clothing', 'Food'];

export const orderCategories = [
  { label: 'All', value: '' },
  { label: 'New Order', value: 'New Order' },
  { label: 'Preparing', value: 'Preparing' },
  { label: 'Out for Delivery', value: 'Out for Delivery' },
  { label: 'Completed', value: 'Completed' },
];