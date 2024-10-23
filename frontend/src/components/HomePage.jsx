import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Homepage = () => {
    const [categories, setCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/category/list');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleViewProducts = (categoryId) => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate(`/category/${categoryId}`);
        } else {
            navigate('/login');
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    const handleVendorRegistration = () => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/vendor/register');
        } else {
            navigate('/login');
        }
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            {/* Updated Header */}
            <header className="sticky top-0 bg-white shadow-md z-10">
                <div className="max-w-7xl mx-auto px-4 flex justify-between items-center py-4">
                    <h1 className="text-4xl font-bold text-purple-700">አሻሻጭ</h1>
                    <nav className="hidden md:flex space-x-6">
                        <Link to="/login" className="text-lg text-gray-600 hover:text-purple-600">Login</Link>
                        <Link to="/register" className="text-lg text-gray-600 hover:text-blue-600">Register</Link>
                        <button
                            onClick={handleVendorRegistration}
                            className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
                        >
                            Register as Vendor
                        </button>
                    </nav>
                    {/* Mobile Menu Button */}
                    <button
                        className="block md:hidden text-gray-600 focus:outline-none"
                        onClick={toggleMenu}
                    >
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                        </svg>
                    </button>
                </div>
                {/* Mobile Menu */}
                {menuOpen && (
                    <div className="md:hidden bg-white shadow-md px-4 py-2">
                        <Link to="/login" className="block py-2 text-lg text-gray-600 hover:text-purple-600">Login</Link>
                        <Link to="/register" className="block py-2 text-lg text-gray-600 hover:text-blue-600">Register</Link>
                        <button
                            onClick={handleVendorRegistration}
                            className="block w-full text-left bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
                        >
                            Register as Vendor
                        </button>
                    </div>
                )}
                {/* Search Form */}
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 py-6">
                    <div className="max-w-7xl mx-auto px-4">
                        <form onSubmit={handleSearchSubmit} className="flex items-center">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search for products..."
                                className="w-full border border-purple-300 rounded-l-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <button
                                type="submit"
                                className="bg-blue-600 text-white py-2 px-4 rounded-r-md hover:bg-blue-700"
                            >
                                Search
                            </button>
                        </form>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 mt-8">
                <h2 className="text-2xl font-semibold mb-6">Categories</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {categories.map(category => (
                        <div key={category.id} className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105">
                            <img
                                src={category.image_url}
                                alt={category.name}
                                className="w-full h-40 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-bold text-gray-800">{category.name}</h3>
                                <button
                                    onClick={() => handleViewProducts(category.id)}
                                    className="mt-2 inline-block bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
                                >
                                    View Products
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <footer className="mt-12 text-center">
                <p className="text-gray-600">© 2024 Ashashach. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Homepage;
