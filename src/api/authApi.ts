import axios from 'axios';

const API = axios.create({
  baseURL: 'http://192.168.1.12:5000',
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

