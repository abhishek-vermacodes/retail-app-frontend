import axios from 'axios';

export const API_BASE_URL = 'http://192.168.1.4:3000';

const API = axios.create({
  baseURL: API_BASE_URL,
});

export const signin = (data: { email: string; password: string }) =>
  API.post('/api/auth/signin', data);

export const signup = (data: {
  username: string;
  email: string;
  password: string;
  role: string;
}) => API.post('/api/auth/signup', data);

export default API;

