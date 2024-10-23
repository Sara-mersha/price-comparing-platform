// src/components/VendorRegisterByLicense.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi'; // Icons for buttons
import { registerVendorByLicense } from '../api'; // API function to register vendor by license

const VendorRegisterByLicense = () => {
  const [licenseFile, setLicenseFile] = useState(null);
  const [licenseNumber, setLicenseNumber] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setLicenseFile(e.target.files[0]);
  };

  const handleRegister = async () => {
    if (!licenseFile || !licenseNumber) {
      setError('Please provide a license file and license number.');
      return;
    }

    const formData = new FormData();
    formData.append('license', licenseFile);
    formData.append('license_number', licenseNumber); // Correct field name

    try {
      await registerVendorByLicense(formData); // Call the API to register vendor
      navigate('/vendor/admin'); // Redirect to the vendor admin page after success
    } catch (error) {
      setError('Registration failed. Please check your details.');
      console.error('Error details:', error.response?.data); // Log error details for debugging
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold text-purple-600 mb-4">Register as a Vendor</h2>

        <input
          type="text"
          value={licenseNumber}
          onChange={(e) => setLicenseNumber(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4"
          placeholder="Enter your License Number"
        />

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Upload License File</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            id="license-upload"
            accept=".jpg,.png"
          />
          <label 
            htmlFor="license-upload" 
            className="w-full p-4 border border-dashed border-gray-300 rounded-lg flex flex-col items-center cursor-pointer hover:border-purple-600 transition-colors"
          >
            <span className="text-gray-500">Drag and drop your file here or click to select</span>
            {licenseFile && <span className="text-purple-600 mt-2">{licenseFile.name}</span>}
          </label>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <button
          onClick={handleRegister}
          className="flex items-center justify-center w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          <FiArrowRight className="mr-2" size={20} />
          Register
        </button>
      </div>
    </div>
  );
};

export default VendorRegisterByLicense;
