import React, { useState, useEffect } from 'react';
import { getCategories, addProduct } from '../api'; 
import { useNavigate } from 'react-router-dom'; 

const ProductAddPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [flexiblePricing, setFlexiblePricing] = useState(false); 
  const [brand, setBrand] = useState(''); 
  const [model, setModel] = useState(''); 
  const [barcodeUPC, setBarcodeUPC] = useState(''); 
  const [barcodeEAC, setBarcodeEAC] = useState(''); 
  const [remainingStock, setRemainingStock] = useState(''); 
  const [tags, setTags] = useState(''); 
  const [category, setCategory] = useState('');
  const [images, setImages] = useState([]); 
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0); // Track the current step
  const steps = [
    "Product Details",
    "Pricing & Stock",
    "Additional Information",
    "Upload Images"
  ];
  
  const navigate = useNavigate();

  useEffect(() => {
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

  const handleFileChange = (e) => {
    // Ensure you're converting the FileList to an array
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if any files have been selected
    if (images.length === 0) {
      alert("Please select at least one image to upload.");
      return;
    }
    
    setLoading(true);
    setError(null); 

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('flexible_pricing', flexiblePricing ? '1' : '0');
    formData.append('brand', brand);
    formData.append('model', model);
    formData.append('barcode_upc', barcodeUPC);
    formData.append('barcode_eac', barcodeEAC);
    formData.append('remaining_stock', remainingStock);
    formData.append('tags', tags);
    formData.append('category_id', category);

    // Append selected images to formData
    for (let i = 0; i < images.length; i++) {
      formData.append('images[]', images[i]);
    }

    try {
      await addProduct(formData);
      alert('Product added successfully!');
      navigate('/vendor/admin');
    } catch (error) {
      console.error('Error adding product:', error);
      if (error.response && error.response.data) {
        setError(error.response.data.message || 'Failed to add product');
      } else {
        setError('Failed to add product. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-3xl font-semibold text-center text-purple-700 mb-6">Add New Product</h1>

      {/* Error Message */}
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-xl font-semibold text-center mb-4">{steps[currentStep]}</h2>

        {/* Step 1: Product Details */}
        {currentStep === 0 && (
          <>
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">Product Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none"
                placeholder="Enter product title"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">Product Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none"
                placeholder="Describe the product"
                rows="4"
                required
              />
            </div>
          </>
        )}

        {/* Step 2: Pricing & Stock */}
        {currentStep === 1 && (
          <>
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none"
                placeholder="Enter product price"
                required
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={flexiblePricing}
                onChange={(e) => setFlexiblePricing(e.target.checked)}
                className="mr-2"
              />
              <label className="text-sm font-semibold text-gray-700">Flexible Pricing</label>
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">Remaining Stock</label>
              <input
                type="number"
                value={remainingStock}
                onChange={(e) => setRemainingStock(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none"
                placeholder="Enter remaining stock"
                required
              />
            </div>
          </>
        )}

        {/* Step 3: Additional Information */}
        {currentStep === 2 && (
          <>
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">Brand</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none"
                placeholder="Enter product brand"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">Model</label>
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none"
                placeholder="Enter product model"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">Tags</label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none"
                placeholder="Enter tags separated by spaces"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none"
                required
              >
                <option value="" disabled>Select a category</option>
                {categories.length > 0 &&
                  categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
              </select>
            </div>
          </>
        )}

        {/* Step 4: Upload Images */}
        {currentStep === 3 && (
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Upload Images</label>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="border border-gray-300 rounded-lg focus:outline-none p-2"
              accept="image/*"
              required
            />
            <p className="text-gray-500 text-sm mt-2">Select one or more images.</p>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          {currentStep > 0 && (
            <button type="button" onClick={prevStep} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg">
              Previous
            </button>
          )}
          {currentStep < steps.length - 1 ? (
            <button type="button" onClick={nextStep} className="bg-purple-600 text-white px-4 py-2 rounded-lg">
              Next
            </button>
          ) : (
            <button
              type="submit"
              className={`bg-purple-600 text-white px-4 py-2 rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading} // Disable button while loading
            >
              {loading ? 'Adding Product...' : 'Add Product'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProductAddPage;
