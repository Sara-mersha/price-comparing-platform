import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const VendorDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Specify that `id` is a string
  const [vendor, setVendor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVendor = async () => {
    try {
      const response = await axios.get(`/vendor/${id}`);
      setVendor(response.data);
    } catch (error: any) {
      console.error('Error fetching vendor details:', error.response?.data);
      setError('Error fetching vendor details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendor();
  }, [id]);

  if (loading) return <div className="text-center text-gray-500">Loading...</div>; // Show loading state
  if (error) return <div className="text-red-600 text-center">{error}</div>; // Show error message
  if (!vendor) return <div className="text-center text-gray-500">No vendor found.</div>; // Handle case when vendor is not found

  return (
    <div className="bg-white shadow-md rounded-lg p-8 max-w-4xl mx-auto my-10">
      <h2 className="text-purple-700 text-4xl font-extrabold mb-5 text-center">
        {vendor.store_name}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <p className="text-lg">
            <span className="font-semibold text-gray-600">Email:</span> {vendor.email}
          </p>
          <p className="text-lg">
            <span className="font-semibold text-gray-600">Phone:</span> {vendor.phone_number}
          </p>
          <p className="text-lg">
            <span className="font-semibold text-gray-600">Zone:</span> {vendor.zone}
          </p>
          <p className="text-lg">
            <span className="font-semibold text-gray-600">Region:</span> {vendor.region}
          </p>
          <p className="text-lg">
            <span className="font-semibold text-gray-600">TIN:</span> {vendor.tin_number}
          </p>
        </div>

        <div className="text-center">
          {vendor.logo_url ? (
            <img
              src={vendor.logo_url}
              alt={vendor.store_name}
              className="w-48 h-48 object-cover mx-auto rounded-full shadow-md"
            />
          ) : (
            <div className="w-48 h-48 bg-gray-200 rounded-full mx-auto flex items-center justify-center">
              <span className="text-gray-500">No logo available</span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-4">Description</h3>
        <p className="text-gray-700 text-lg leading-relaxed">{vendor.description}</p>
      </div>

      <div className="mt-10 flex justify-end space-x-4">
        <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
          Edit Vendor
        </button>
        <button className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition">
          Delete Vendor
        </button>
      </div>
    </div>
  );
};

export default VendorDetails;
