import React, { useState } from 'react';
import axios from 'axios';

const VendorSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/vendor/search/${searchTerm}`);
      setResults(response.data);
    } catch (error) {
      console.error('Error searching vendor:', error.response.data);
      alert(error.response.data.message || 'Error searching vendor');
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-purple-600 text-3xl font-bold mb-5">Vendor Search</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 mr-2"
          placeholder="Search by store name"
        />
        <button type="submit" className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700">
          Search
        </button>
      </form>
      <ul className="mt-4">
        {results.map((vendor) => (
          <li key={vendor.id} className="border-b border-gray-300 py-2">
            {vendor.store_name} - {vendor.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VendorSearch;
