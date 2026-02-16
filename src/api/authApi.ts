import axios from 'axios';



const API = axios.create({
  baseURL: 'http://192.168.1.5:5000/api',
});

export const signin = (data: { email: string; password: string }) =>
  API.post('/auth/signin', data);

export const signup = (data: {
  username: string;
  email: string;
  password: string;
  role: string;
}) => API.post('/auth/signup', data);

export default API;
