import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const VendorOrders = () => {
  const { id } = useParams();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`/vendor/${id}/orders`);
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching vendor orders:', error.response.data);
      alert('Error fetching vendor orders');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [id]);

  return (
    <div className="p-8">
      <h2 className="text-purple-600 text-3xl font-bold mb-5">Vendor Orders</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id} className="border-b border-gray-300 py-2">
            Order ID: {order.id} - Total: ${order.total_price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VendorOrders;
