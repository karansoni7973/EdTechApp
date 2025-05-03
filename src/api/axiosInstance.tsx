import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.1.2:5000', // Replace with your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
