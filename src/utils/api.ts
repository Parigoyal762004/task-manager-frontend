// src/utils/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Base URL for your API
});

// Add an interceptor to include the token in headers
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add an interceptor to handle errors globally
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized errors (e.g., redirect to login)
      console.error('Unauthorized, redirecting to login');
    }
    return Promise.reject(error);
  }
);

export default api;
