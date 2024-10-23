import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerVendor } from '../api'; // Import your API function here

interface FormData {
    store_name: string;
    phone_number: string;
    email: string;
    zone: string;
    region: string;
    google_map_location: string;
    website: string;
    telegram: string;
    whatsapp: string;
    tin_number: string;
    description: string;
    license: File | null;
    logo: File | null;
}

const VendorRegister: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        store_name: '',
        phone_number: '',
        email: '',
        zone: '',
        region: '',
        google_map_location: '',
        website: '',
        telegram: '',
        whatsapp: '',
        tin_number: '',
        description: '',
        license: null,
        logo: null,
    });
    const [errors, setErrors] = useState<Record<string, string[]>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        setFormData({ ...formData, [name]: files ? files[0] : null });
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, name: string) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            setFormData({ ...formData, [name]: files[0] });
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleNextStep = () => {
        setCurrentStep((prev) => prev + 1);
    };

    const handlePreviousStep = () => {
        setCurrentStep((prev) => prev - 1);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formPayload = new FormData();
        Object.keys(formData).forEach(key => {
            const value = formData[key as keyof FormData];
            if (value !== null) {
                formPayload.append(key, value);
            }
        });

        try {
            await registerVendor(formPayload);
            alert('Vendor registration successful!');
            navigate('/vendor/admin');
        } catch (error: any) {
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            } else {
                alert('Something went wrong. Please try again.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
            <h2 className="text-3xl font-bold mb-6 text-purple-600 text-center">Register as a Vendor</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {currentStep === 0 && (
                    <>
                        <div className="flex flex-col">
                            <label htmlFor="store_name" className="text-gray-700 mb-2">Store Name:</label>
                            <input
                                type="text"
                                id="store_name"
                                name="store_name"
                                value={formData.store_name}
                                onChange={handleInputChange}
                                required
                                className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring focus:ring-purple-300 transition"
                            />
                            {errors.store_name && <p className="text-red-600 mt-1">{errors.store_name[0]}</p>}
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="phone_number" className="text-gray-700 mb-2">Phone Number:</label>
                            <input
                                type="text"
                                id="phone_number"
                                name="phone_number"
                                value={formData.phone_number}
                                onChange={handleInputChange}
                                required
                                className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring focus:ring-purple-300 transition"
                            />
                            {errors.phone_number && <p className="text-red-600 mt-1">{errors.phone_number[0]}</p>}
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="email" className="text-gray-700 mb-2">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring focus:ring-purple-300 transition"
                            />
                            {errors.email && <p className="text-red-600 mt-1">{errors.email[0]}</p>}
                        </div>
                    </>
                )}
                {currentStep === 1 && (
                    <>
                        <div className="flex flex-col">
                            <label htmlFor="zone" className="text-gray-700 mb-2">Zone:</label>
                            <input
                                type="text"
                                id="zone"
                                name="zone"
                                value={formData.zone}
                                onChange={handleInputChange}
                                required
                                className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring focus:ring-purple-300 transition"
                            />
                            {errors.zone && <p className="text-red-600 mt-1">{errors.zone[0]}</p>}
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="region" className="text-gray-700 mb-2">Region:</label>
                            <input
                                type="text"
                                id="region"
                                name="region"
                                value={formData.region}
                                onChange={handleInputChange}
                                required
                                className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring focus:ring-purple-300 transition"
                            />
                            {errors.region && <p className="text-red-600 mt-1">{errors.region[0]}</p>}
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="tin_number" className="text-gray-700 mb-2">TIN Number:</label>
                            <input
                                type="text"
                                id="tin_number"
                                name="tin_number"
                                value={formData.tin_number}
                                onChange={handleInputChange}
                                required
                                className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring focus:ring-purple-300 transition"
                            />
                            {errors.tin_number && <p className="text-red-600 mt-1">{errors.tin_number[0]}</p>}
                        </div>
                    </>
                )}
                {currentStep === 2 && (
                    <>
                        <div className="flex flex-col">
                            <label htmlFor="license" className="text-gray-700 mb-2">Business License (required):</label>
                            <div
                                className="border border-gray-300 rounded-md p-6 text-center transition-colors hover:bg-gray-50"
                                onDragOver={handleDragOver}
                                onDrop={(e) => handleDrop(e, 'license')}
                            >
                                {formData.license ? (
                                    <p className="text-gray-700">{formData.license.name}</p>
                                ) : (
                                    <p className="text-gray-500">Drag & drop your license file here, or click to upload</p>
                                )}
                                <input
                                    type="file"
                                    id="license"
                                    name="license"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                                <button
                                    type="button"
                                    className="mt-2 inline-block bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition"
                                    onClick={() => document.getElementById('license')?.click()}
                                >
                                    Choose File
                                </button>
                            </div>
                            {errors.license && <p className="text-red-600 mt-1">{errors.license[0]}</p>}
                        </div>
                        <div className="flex flex-col mt-4">
                            <label htmlFor="logo" className="text-gray-700 mb-2">Store Logo (optional):</label>
                            <div
                                className="border border-gray-300 rounded-md p-6 text-center transition-colors hover:bg-gray-50"
                                onDragOver={handleDragOver}
                                onDrop={(e) => handleDrop(e, 'logo')}
                            >
                                {formData.logo ? (
                                    <p className="text-gray-700">{formData.logo.name}</p>
                                ) : (
                                    <p className="text-gray-500">Drag & drop your logo file here, or click to upload</p>
                                )}
                                <input
                                    type="file"
                                    id="logo"
                                    name="logo"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                                <button
                                    type="button"
                                    className="mt-2 inline-block bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition"
                                    onClick={() => document.getElementById('logo')?.click()}
                                >
                                    Choose File
                                </button>
                            </div>
                        </div>
                    </>
                )}
                
                {/* Navigation buttons for pagination */}
                <div className="flex justify-between mt-8">
                    {currentStep > 0 && (
                        <button type="button" onClick={handlePreviousStep} className="inline-block bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400 transition">
                            Previous
                        </button>
                    )}
                    {currentStep < 2 ? (
                        <button type="button" onClick={handleNextStep} className="inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
                            Next
                        </button>
                    ) : (
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`inline-block bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition ${isSubmitting ? 'opacity-50' : ''}`}
                        >
                            {isSubmitting ? 'Registering...' : 'Register as Vendor'}
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default VendorRegister;
