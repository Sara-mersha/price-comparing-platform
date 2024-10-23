// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import CategoriesProducts from './components/CategoriesProducts';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './components/Register';
import Login from './components/Login';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import VendorRegister from './components/VendorRegister';
import VendorList from './components/VendorList';
import UserOrdersPage from './components/UserOrdersPage'; // Ensure this import is correct
import Homepage from './components/HomePage';
import Dashboard from './components/Dashboard';
import CategoryPage from './components/CategoryPage';
import Orders from './components/orders';
import ProductAddPage from './components/ProductAddPage'; // Ensure this path is correct
import VendorDetails from './components/VendorDetails';
import VendorProducts from './components/VendorProducts';
import VendorOrders from './components/VendorOrders';
import UserProfile from './profile/UserProfile';
import ProductSearch from './components/ProductSearch'; // Ensure this import is correct
import VendorAdmin from './components/VendorAdmin';
import VendorRegisterByLicense from './components/VendorRegisterByLicense';
import AddOrderPage from './components/AddOrderPage'; // Add this import

const App = () => {
  return (
    <AuthProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/categories" element={<CategoryPage />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/vendors" element={<VendorList />} />
          <Route path="/vendors/:id" element={<VendorDetails />} />
          <Route path="/vendors/:id/products" element={<VendorProducts />} />
          <Route path="/vendors/:id/orders" element={<VendorOrders />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path="/product/add" element={<ProductAddPage />} />
          <Route path="/user/orders" element={<UserOrdersPage />} />
          <Route path="/orders/add" element={<AddOrderPage />} /> {/* Add Order Page */}
          <Route 
            path="/dashboard" 
            element={<ProtectedRoute element={<Dashboard />} />} 
          />
          <Route path="/profile" element={<ProtectedRoute element={<UserProfile />} />} />
          {/* <Route path="/search" element={<ProductSearch />} /> */}
          <Route path="/vendor/admin" element={<ProtectedRoute element={<VendorAdmin />} />} />
          <Route path="/vendor/register" element={<ProtectedRoute element={<VendorRegister />} />} />

          <Route path="/vendor/register/bylicense" element={<VendorRegisterByLicense />} />
          <Route path="*" element={<Navigate to="/dashboard" />} /> {/* Redirect for undefined routes */}
          <Route path="/product/search" element={<ProductSearch />} />
          <Route path="/categories/products/:slug" element={<CategoriesProducts />} />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
