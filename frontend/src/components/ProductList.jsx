import React, { useEffect, useState } from 'react';
import { getProducts } from '../api'; // Assuming you have this API function

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Products</h1>

      {loading ? (
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-purple-600"></div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow"
            >
              <img
                src={product.image_urls[0]} // Display the first image of the product
                alt={product.title}
                className="w-full h-48 object-cover rounded-lg"
              />
              <h2 className="text-xl font-semibold mt-2">{product.title}</h2>
              <p className="text-gray-600">${product.price}</p>
              <button
                className="bg-purple-600 text-white py-2 px-4 mt-4 rounded-lg hover:bg-purple-700"
                onClick={() => window.location.href = `/product/${product.id}`}
              >
                View Product
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
