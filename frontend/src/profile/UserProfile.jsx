import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserDetails, checkVendorStatus } from '../api'; // Import checkVendorStatus API
import { FiLogOut, FiUser, FiArrowUpCircle } from 'react-icons/fi';
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
        setIsVendor(response.data.isVendor); // Assuming the API returns a flag for vendor status
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleUpgrade = () => {
    navigate('/vendor/register');
  };

  const handleGoToVendorAdmin = async () => {
    try {
      const vendorStatus = await checkVendorStatus(user.email); // Check vendor status by email
      if (vendorStatus.isVendor) {
        navigate('/vendor/admin'); // Redirect to vendor admin page
      } else {
        alert('You must register as a vendor to access the Vendor page.');
      }
    } catch (error) {
      console.error('Error checking vendor status:', error);
      alert('Something went wrong. Please try again.');
    }
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
            {user.profilePicture ? (
              <img 
                src={user.profilePicture} 
                alt="Profile" 
                className="w-12 h-12 rounded-full object-cover"
                onError={(e) => e.target.src = '/path/to/default-image.jpg'} // Default fallback image
              />
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
              <div className="bg-purple-100 p-4 rounded-md">
                <p className="text-purple-600 mb-2">You are already a Vendor</p>
                <button 
                  onClick={handleGoToVendorAdmin} 
                  className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Go to Vendor Admin
                </button>
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

          {/* New Button for Vendor Admin Access */}
          <div className="mt-4">
            <button
              onClick={handleGoToVendorAdmin}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Are You Already a Vendor?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
