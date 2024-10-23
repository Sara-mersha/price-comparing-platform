// src/axiosConfig.js

import axios from 'axios';

// Create a new axios instance with default settings
const api = axios.create({
  baseURL: 'https://localhost:8000', // Global base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to set the token for every request
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('token', token);  // Store token in local storage
  } else {
    delete api.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }
};

export default api;
