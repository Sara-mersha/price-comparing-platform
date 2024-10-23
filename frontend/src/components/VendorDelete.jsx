import React from 'react';
import axios from 'axios';

const VendorDelete = ({ vendorId }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`/vendor/${vendorId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert('Vendor deleted successfully');
      // Optionally, refresh the vendor list or redirect
    } catch (error) {
      console.error('Error deleting vendor:', error.response.data);
      alert(error.response.data.message || 'Error deleting vendor');
    }
  };

  return (
    <button onClick={handleDelete} className="bg-red-600 text-white py-1 px-2 rounded-lg hover:bg-red-700">
      Delete Vendor
    </button>
  );
};

export default VendorDelete;
