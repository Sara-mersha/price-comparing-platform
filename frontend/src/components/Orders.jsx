// src/components/Orders.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import NavBar from './NavBar'; // Import NavBar component
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/user/orders', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <AiOutlineLoading3Quarters className="animate-spin text-purple-600 text-4xl" />
        <p className="mt-4 text-purple-600">Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />

      <main className="p-8">
        <h2 className="text-3xl font-bold text-purple-600 mb-6">Order History</h2>
        
        <button
          onClick={() => navigate('/orders/add')} // Navigate to Add Order page
          className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400"
        >
          Add New Order
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {orders.map((order) => (
            <div key={order.id} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-700 mb-2">Order #{order.id}</h3>
              <p className="text-gray-600 mb-4">Status: {order.status}</p>
              <p className="text-gray-600 mb-4">Total: ${order.price_when_ordered}</p>
              <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-500">
                View Details
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Orders;
