import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const VendorProducts = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`/vendor/${id}/products`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching vendor products:', error.response.data);
      alert('Error fetching vendor products');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [id]);

  return (
    <div className="p-8">
      <h2 className="text-purple-600 text-3xl font-bold mb-5">Vendor Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id} className="border-b border-gray-300 py-2">
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VendorProducts;
