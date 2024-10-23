// src/components/UserProfile.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserDetails } from '../api';
import { FiLogOut, FiUser, FiShoppingCart, FiArrowUpCircle } from 'react-icons/fi';
import NavBar from '../components/NavBar';

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [isVendor, setIsVendor] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await getUserDetails();
        setUser(response.data);
        setIsVendor(response.data.isVendor);
      } catch (error) {
        console.error('Error fetching user details:', error);
      } finally {
        setLoading(false); // Move setLoading here to ensure it runs after fetching
      }
    };

    fetchUserDetails();
  }, []);

  const handleUpgrade = () => {
    navigate('/vendor/register/bylicense');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <NavBar />
      
      <div className="flex-1 p-6">
        <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-purple-600">My Profile</h2>
            <FiLogOut
              className="cursor-pointer text-gray-500 hover:text-red-500 transition-colors"
              size={24}
              onClick={() => {
                localStorage.removeItem('token'); // Log out logic
                navigate('/login');
              }}
            />
          </div>

          <div className="flex items-center space-x-4">
            {user.profilePicture ? ( // Check if profile picture exists
              <img src={user.profilePicture} alt="Profile" className="w-12 h-12 rounded-full" />
            ) : (
              <FiUser size={48} className="text-purple-600" />
            )}
            <div>
              <h3 className="text-xl font-semibold">{user.name}</h3>
              <p className="text-gray-500">{user.email}</p>
            </div>
          </div>

          <div className="mt-6">
            {isVendor ? (
              <div className="flex items-center justify-between bg-purple-100 p-4 rounded-md">
                <p className="text-purple-600">You are already a Vendor</p>
                <FiShoppingCart className="text-purple-600" size={24} />
              </div>
            ) : (
              <button
                onClick={handleUpgrade}
                className="flex items-center justify-center w-full bg-purple-600 text-white py-2 rounded-lg mt-4 hover:bg-purple-700 transition-colors"
              >
                <FiArrowUpCircle className="mr-2" size={20} />
                Upgrade to Vendor
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
