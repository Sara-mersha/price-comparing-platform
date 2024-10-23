import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const ProductSearch = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('query'); // Get the search query from URL
    const barcodeQuery = queryParams.get('barcode'); // Get barcode from URL if available
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const params = barcodeQuery ? { barcode: barcodeQuery } : { query: searchQuery };
                
                const response = await axios.get('http://localhost:8000/api/product/search', { params });

                if (response.data.url && barcodeQuery) {
                    // If barcode search is successful and URL is returned, redirect to the product page
                    window.location.href = response.data.url;
                } else if (response.data[1]) {
                    // If general search returns results, display them
                    setResults(response.data[1]);
                } else {
                    setResults([]); // No results found
                }
            } catch (err) {
                console.error(err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        if (searchQuery || barcodeQuery) {
            fetchResults();
        }
    }, [searchQuery, barcodeQuery]); // Trigger effect when searchQuery or barcodeQuery changes

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error fetching results: {error.message}</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-semibold mb-6">Search Results</h2>

            {results.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {results.map(product => (
                        <div key={product.id} className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105">
                            <img
                                src={product.image_url || '/default-image.jpg'} // Use a default image if none available
                                alt={product.title}
                                className="w-full h-40 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-bold text-gray-800">{product.title}</h3>
                                <p className="text-gray-600">{product.description}</p>
                                <p className="text-lg font-bold">${product.price}</p>
                                <button
                                    className="mt-2 inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                                    onClick={() => window.location.href = `/product/${product.id}`}
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No results found.</p>
            )}
        </div>
    );
};

export default ProductSearch;
