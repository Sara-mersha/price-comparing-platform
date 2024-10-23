import React, { useState, useEffect } from 'react';
import { getCategories, getCategoryProducts } from '../api'; // API functions to get categories and products
import { useNavigate } from 'react-router-dom'; // For navigation
import NavBar from './NavBar'; // Import the NavBar component

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all categories on component mount
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleViewProduct = (categorySlug) => {
    navigate(`/categories/products/${categorySlug}`); // Navigate to product details page
  };

  const handleCategorySelect = async (categorySlug) => {
    setLoadingProducts(true);
    try {
      const response = await getCategoryProducts(categorySlug); // Use category slug to fetch products
      setSelectedCategory(categories.find((cat) => cat.slug === categorySlug));
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoadingProducts(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Include NavBar at the top */}
      <NavBar />

      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-purple-700 mb-6">Browse by Categories</h1>

        {/* Category List */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.length ? (
            categories.map((category) => (
              <div
                key={category.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300 hover:shadow-2xl"
                onClick={() => handleCategorySelect(category.slug)} // Use category slug for selection
              >
                <img
                  src={category.image_url}
                  alt={category.name}
                  className="h-40 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800">{category.name}</h3>
                  <p className="text-sm text-gray-600">Discover the best in {category.name}.</p>
                  <button
                    onClick={() => handleViewProduct(category.slug)} // View products in category using slug
                    className="mt-2 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                  >
                    View Products
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No categories found.</p>
          )}
        </div>

        {/* Products for Selected Category */}
        {selectedCategory && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-purple-700">Products in {selectedCategory.name}</h2>

            {loadingProducts ? (
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-purple-600"></div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {products.length ? (
                  products.map((product) => (
                    <div key={product.id} className="p-4 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
                      <h3 className="text-lg font-semibold">{product.name}</h3>
                      <p>{product.description}</p>
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
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
