import axios from 'axios';

// Set up the base URL for the Laravel backend
const api = axios.create({
  baseURL: 'http://localhost:8000/api',  // Adjust the URL if your backend is hosted elsewhere
});

// Automatically add the token to the Authorization header if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle responses and errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized (e.g., token expired)
      alert('Your session has expired. Please log in again.');
      localStorage.removeItem('token');  // Clear the token
      window.location.href = '/login';  // Redirect to login page
    }
    return Promise.reject(error);
  }
);

// Auth Endpoints
export const registerUser = (data) => api.post('/auth/register', data);
export const loginUser = (data) => api.post('/auth/login', data);
export const logoutUser = () => api.post('/auth/logout');  // Requires authentication

// User Profile Endpoints
export const getUserDetails = () => api.get('/user/details');  // Fetches user details
export const upgradeToVendor = () => api.post('/vendor/upgrade');  // Upgrade user to vendor

// Vendor Endpoints
export const registerVendor = (data) => api.post('/vendor/register', data);  // Requires authentication
export const registerVendorByLicense = (formData) => api.post('/vendor/register/bylicense', formData, {
  headers: {
    'Content-Type': 'multipart/form-data',  // Important for file uploads
  },
});  // Register vendor with license
export const getVendors = () => api.get('/vendor/list');  // Get list of vendors
export const getVendorDetails = (id) => api.get(`/vendor/${id}`);
export const searchVendors = (storeName) => api.get(`/vendor/search/${storeName}`);  // Search for vendors by store name
export const getVendorProducts = () => api.get('/vendor/products');  // Requires authentication
export const getVendorOrders = () => api.get('/vendor/orders');  // Requires authentication
export const deleteVendor = () => api.delete('/vendor/delete');  // Requires authentication

// Check Vendor Status
export const checkVendorStatus = () => api.post('/vendor/check-status');  // Requires authentication

// Category Endpoints
export const getCategories = () => api.get('/category/list');
export const getCategoryProducts = (categorySlug) => api.get(`/category/products/${categorySlug}`); // Change to accept category slug

// Product Endpoints
export const getProducts = () => api.get('/product/list');
export const getProductById = (productId) => api.get(`/product/${productId}`);  // Fetch a single product by ID

// File Upload (Product with Images)
export const addProduct = (data) => api.post('/product/add', data, {
  headers: {
    'Content-Type': 'multipart/form-data',  // Important for file uploads
  },
});

// Order Endpoints
export const createOrder = (data) => api.post('/orders/add', data);  // Requires authentication
export const getUserOrders = () => api.get('/user/orders');  // Requires authentication
export const addOrder = (data) => api.post('/orders/add', data); // Ensure this line is present
export const getOrderDetails = (orderId) => api.get(`/orders/${orderId}`);  // Fetch order details by ID

// Add product to the cart (or orders)
export const addToCart = (productId) => {
  return api.post('/orders/add', {
    product_id: productId, // Ensure the backend accepts 'product_id' for adding the product
    quantity: 1, // Default quantity, adjust as necessary or make it dynamic
  });
};

// Search Products
export const searchProducts = (query) => api.get('/product/search', { params: { query } });
export const deleteProduct = (productId) => api.delete(`/product/delete/${productId}`);
