// src/pages/AddOrderPage.jsx
import React, { useEffect, useState } from 'react';
import { getProducts, addOrder } from '../api'; // Ensure these API functions are implemented
import { useNavigate } from 'react-router-dom';

const AddOrderPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Hook to navigate between pages

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts(); // Fetch all products
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddOrder = async () => {
    if (!selectedProduct) {
      setMessage('Please select a product.');
      return;
    }
    
    try {
      await addOrder({ productId: selectedProduct }); // Call the API to add the order
      setMessage('Order added successfully!');
      setSelectedProduct(''); // Reset selection after adding
    } catch (error) {
      console.error('Error adding order:', error);
      setMessage('Failed to add order.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-purple-600 mb-4">Add New Order</h1>

        {loading ? (
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-purple-600"></div>
        ) : (
          <div>
            <select 
              value={selectedProduct} 
              onChange={(e) => setSelectedProduct(e.target.value)} 
              className="border rounded p-2 mb-4 w-full"
            >
              <option value="">Select a product</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.title}
                </option>
              ))}
            </select>

            <button 
              onClick={handleAddOrder} 
              className="bg-purple-600 text-white rounded p-2 w-full hover:bg-purple-500 transition duration-300"
            >
              Add Order
            </button>

            {message && <p className="text-gray-600 mt-4">{message}</p>}
          </div>
        )}
        
        <button 
          onClick={() => navigate('/orders')} 
          className="mt-4 w-full bg-gray-300 text-gray-800 rounded p-2 hover:bg-gray-200 transition duration-300"
        >
          Back to Orders
        </button>
      </div>
    </div>
  );
};

export default AddOrderPage;
