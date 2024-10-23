import React, { useState, useEffect } from 'react';
import { getCategories } from '../api'; // API function to get categories
import { useNavigate } from 'react-router-dom'; // For navigation
import NavBar from './NavBar'; // Import NavBar component

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data.slice(0, 3)); // Show 3 categories on dashboard
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleViewProduct = (slug) => {
    navigate(`/categories/products/${slug}`); // Navigate to CategoriesProducts page using slug
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <NavBar /> {/* Use NavBar component */}

      <main className="flex-1 flex flex-col p-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-600"></div>
            <p className="mt-4 text-lg text-purple-600">Loading your dashboard...</p>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-purple-600 mb-4">Welcome Back, This Is The Place To Discover The Best</h1>

            {/* Category Section */}
            <section className="mb-6">
              <h2 className="text-xl font-semibold text-purple-600 mb-4">Categories</h2>
              <div className="grid grid-cols-3 gap-4">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
                  >
                    <img
                      src={category.image_url}
                      alt={category.name}
                      className="h-32 w-full object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-700">{category.name}</h3>
                      <button
                        onClick={() => handleViewProduct(category.slug)} // Navigate to CategoriesProducts page using slug
                        className="mt-2 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                      >
                        View Products
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate('/categories')}
                className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              >
                View All Categories
              </button>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
