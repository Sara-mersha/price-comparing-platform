// src/components/ProtectedRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext'; // Ensure this matches the export

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>; // You can add a loading spinner or similar
  }

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
