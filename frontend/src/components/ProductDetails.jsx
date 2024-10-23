import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, addToCart } from '../api'; // Ensure this API function is defined
import NavBar from '../components/NavBar'; // Import NavBar for consistent navigation
import { FaShoppingCart } from 'react-icons/fa'; // Import the shopping cart icon

const ProductDetails = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await getProductById(productId);
                setProduct(response.data); // Ensure vendor info is part of response.data
            } catch (err) {
                setError(err.response?.data?.message || 'Error fetching product details');
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [productId]);

    const handleAddToCart = async () => {
        try {
            await addToCart(productId); // Add to cart API call
            navigate('/orders'); // Redirect to orders page after adding the product
        } catch (error) {
            console.error('Failed to add to cart', error);
            alert('Failed to add product to cart');
        }
    };

    if (loading) return <div className="flex justify-center items-center h-screen"><p className="text-purple-600">Loading...</p></div>;
    if (error) return <div className="text-red-500">{error}</div>;

    // Ensure price is a number and fallback if necessary
    const priceValue = typeof product.price === 'number' ? product.price : 0;

    // Check for the existence of vendor info
    const vendor = product.vendor || {};

    return (
        <div className="bg-gray-100 min-h-screen">
            <NavBar /> {/* Use NavBar for consistent layout */}
            <div className="max-w-2xl mx-auto p-5">
                <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
                {product.image_urls && product.image_urls.length > 0 ? (
                    <img 
                        src={product.image_urls[0]} 
                        alt={product.title} 
                        className="w-full h-64 object-cover rounded-lg mb-4" // Reduced size with rounded corners
                    />
                ) : (
                    <div className="bg-gray-200 h-64 flex items-center justify-center rounded-lg">No image available</div>
                )}
                <p className="text-lg mb-4">{product.description}</p>
                <p className="text-xl font-semibold mb-4">${priceValue.toFixed(2)}</p>

                <h2 className="text-xl font-bold mb-2">Vendor Information</h2>
                <div className="border p-4 rounded-lg bg-white shadow mb-6">
                    <p><strong>Store Name:</strong> {vendor.store_name || 'Not provided'}</p>
                    <p><strong>Phone Number:</strong> {vendor.phone_number || 'Not provided'}</p>
                    <p><strong>Email:</strong> {vendor.email || 'Not provided'}</p>
                    <p><strong>Website:</strong> {vendor.website || 'Not provided'}</p>
                    <p><strong>Zone:</strong> {vendor.zone || 'Not provided'}</p>
                    <p><strong>Region:</strong> {vendor.region || 'Not provided'}</p>
                </div>

                {/* Add to Cart button */}
                <button
                    onClick={handleAddToCart}
                    className="w-full flex items-center justify-center bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors duration-300"
                >
                    <FaShoppingCart className="mr-2" /> Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductDetails;
