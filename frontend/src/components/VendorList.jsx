import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VendorList = () => {
  const [vendors, setVendors] = useState([]);

  const fetchVendors = async () => {
    try {
      const response = await axios.get('/vendor/list');
      setVendors(response.data);
    } catch (error) {
      console.error('Error fetching vendors:', error.response.data);
      alert('Error fetching vendors');
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-purple-600 text-3xl font-bold mb-5">Vendor List</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">Store Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((vendor) => (
            <tr key={vendor.id}>
              <td className="border px-4 py-2">{vendor.store_name}</td>
              <td className="border px-4 py-2">{vendor.email}</td>
              <td className="border px-4 py-2">
                <button className="bg-blue-600 text-white py-1 px-2 rounded-lg hover:bg-blue-700">View</button>
                {/* Additional actions can be added here */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VendorList;
