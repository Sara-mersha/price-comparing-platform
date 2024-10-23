import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCategoryProducts } from '../api'; // Ensure this API function is defined
import NavBar from '../components/NavBar'; // Import the NavBar component
import { FaArrowLeft } from 'react-icons/fa'; // Import the back arrow icon from react-icons

const CategoriesProducts = () => {
  const { slug } = useParams(); // Use 'slug' instead of 'categoryId'
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await getCategoryProducts(slug); // Pass the slug instead of categoryId
        console.log(response); // Log the response to inspect it
        // Ensure the response has the expected structure
        if (response.data && Array.isArray(response.data.products)) {
          setProducts(response.data.products);
        } else {
          console.error('Invalid response structure:', response);
          setProducts([]); // Set to an empty array if structure is invalid
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [slug]); // Update dependency to 'slug'

  const handleViewProduct = (productId) => {
    navigate(`/product/${productId}`); // Navigate to product details page
  };

  const handleBackToCategories = () => {
    navigate('/categories'); // Navigate back to the categories page
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Include NavBar at the top */}
      <NavBar />

      <div className="container mx-auto p-4">
        <div className="flex items-center mb-6">
          {/* Back Arrow Icon */}
          <FaArrowLeft
            onClick={handleBackToCategories}
            className="text-purple-600 cursor-pointer mr-4 hover:text-purple-800" // Icon styling
            size={24} // Adjust icon size as needed
          />
          <h1 className="text-3xl font-bold text-purple-700">Products</h1>
        </div>

        {loading ? (
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-purple-600"></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {products.length > 0 ? (
              products.map((product) => (
                <div key={product.id} className="p-4 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
                  <img src={product.image_urls[0]} alt={product.title} className="h-40 w-full object-cover rounded" />
                  <h3 className="text-lg font-semibold">{product.title}</h3>
                  <p className="text-sm text-gray-600">{product.description}</p>
                  <p className="text-purple-600 font-semibold">${product.price}</p>
                  <button
                    onClick={() => handleViewProduct(product.id)} // Navigate to product details page
                    className="mt-2 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                  >
                    View Product Details
                  </button>
                </div>
              ))
            ) : (
              <p>No products found for this category.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesProducts;
