import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Define the types for Product and Order
interface Product {
    productId: number;
    name: string;
    price: number | string; // Allow for potential string type
    image_urls: string;
    category_id: string;
    description?: string; // Optional description
}

interface Order {
    id: number;
    // Define other necessary fields for Order here, such as total, date, etc.
}

const VendorAdmin: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch vendor products and orders
        fetchVendorProducts();
        fetchVendorOrders();
    }, []);

    const fetchVendorProducts = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get<Product[]>('/api/vendor/products', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Fetched Products:", response.data); // Log the fetched products
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const fetchVendorOrders = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get<Order[]>('/api/vendor/orders', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const handleDeleteProduct = async (productId: number) => {
        const confirmation = window.confirm('Are you sure you want to delete this product?');
        if (!confirmation) return;

        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:8000/api/product/delete/${productId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert('Product deleted successfully');
            fetchVendorProducts(); // Refresh product list
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Failed to delete product. Please try again.');
        }
    };

    // Function to handle navigation to ProductAddPage
    const handleNavigateToAddProduct = () => {
        navigate('/product/add');
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Vendor Admin</h1>

            {/* Button to navigate to ProductAddPage */}
            <div className="text-center mb-4">
                <button
                    onClick={handleNavigateToAddProduct}
                    className="bg-green-500 text-white p-2 rounded shadow hover:bg-green-600 transition duration-200"
                >
                    Add New Product
                </button>
            </div>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Your Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div key={product.productId} className="border rounded-lg p-4 shadow hover:shadow-lg transition duration-200">
                                {product.image_urls? (
                                    <img src={product.image_urls[0]} alt={product.name} className="w-full h-32 object-cover rounded mb-4" />
                                ) : (
                                    <div className="h-32 bg-gray-300 rounded mb-4 flex items-center justify-center">
                                        <p className="text-gray-500">No Image Available</p>
                                    </div>
                                )}
                                <h3 className="font-semibold text-lg">{product.name}</h3>
                                <p className="text-gray-700">Price: ${product.price}</p>
                                <p className="text-gray-700">Category: {product.category_id}</p>
                                {product.description && <p className="text-gray-600 mt-2">Description: {product.description}</p>}
                                <button
                                    onClick={() => handleDeleteProduct(product.productId)}
                                    className="bg-red-500 text-white mt-4 p-2 rounded w-full hover:bg-red-600 transition duration-200"
                                >
                                    Delete
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="border rounded-lg p-4 text-center">No products available.</div>
                    )}
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>
                <ul>
                    {orders.map((order) => (
                        <li key={order.id} className="border rounded-lg p-4 mb-4">
                            <p>Order ID: {order.id}</p>
                            {/* Display more order details here */}
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default VendorAdmin;
