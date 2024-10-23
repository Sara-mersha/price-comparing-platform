// src/pages/UserOrdersPage.jsx
import React, { useEffect, useState } from 'react';
import { getUserOrders } from '../api'; // Ensure this API function is implemented

const UserOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getUserOrders();
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Your Orders</h1>

      {loading ? (
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-purple-600"></div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {orders.length === 0 ? (
            <p className="text-gray-600">No orders found.</p>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="bg-white shadow-lg rounded-lg p-4">
                <h2 className="text-xl font-semibold">{order.product.title}</h2>
                <p className="text-gray-600">Price: ${order.price_when_ordered}</p>
                <p className="text-gray-600">Status: {order.status}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default UserOrdersPage;
