// src/config/axiosConfig.jsx
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "https://dutiocollab-production.up.railway.app", // your backend URL
});

// Automatically add token from localStorage to Authorization header
axiosInstance.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem("token"));
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
