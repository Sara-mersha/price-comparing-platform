// src/components/NavBar.jsx
import React from 'react';
import { FiHome, FiSearch, FiBox, FiUser, FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const NavBar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 left-0 right-0 bg-white shadow-md z-10">
      <div className="flex justify-around text-center py-3 bg-gradient-to-r from-purple-500 to-indigo-600 shadow-lg">
        {/* Home Link */}
        <div
          className="text-white flex flex-col items-center cursor-pointer transform transition-transform hover:scale-110 duration-300"
          onClick={() => navigate('/dashboard')}
        >
          <FiHome size={24} />
          <span className="text-sm">Home</span>
        </div>

        {/* Search Link */}
        <div
          className="text-white flex flex-col items-center cursor-pointer transform transition-transform hover:scale-110 duration-300"
          onClick={() => navigate('/search')}
        >
          <FiSearch size={24} />
          <span className="text-sm">Search</span>
        </div>

        {/* Orders Link */}
        {isAuthenticated && (
          <div
            className="text-white flex flex-col items-center cursor-pointer transform transition-transform hover:scale-110 duration-300"
            onClick={() => navigate('/orders')}
          >
            <FiBox size={24} />
            <span className="text-sm">Orders</span>
          </div>
        )}

        {/* Profile Link */}
        <div
          className="text-white flex flex-col items-center cursor-pointer transform transition-transform hover:scale-110 duration-300"
          onClick={() => navigate('/profile')}
        >
          <FiUser size={24} />
          <span className="text-sm">Profile</span>
        </div>

        {/* Logout Link */}
        {isAuthenticated ? (
          <div
            className="text-red-400 flex flex-col items-center cursor-pointer transform transition-transform hover:scale-110 hover:text-white duration-300"
            onClick={handleLogout}
          >
            <FiLogOut size={24} />
            <span className="text-sm">Logout</span>
          </div>
        ) : (
          <div
            className="text-white flex flex-col items-center cursor-pointer transform transition-transform hover:scale-110 duration-300"
            onClick={() => navigate('/login')}
          >
            <FiUser size={24} />
            <span className="text-sm">Login</span>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
