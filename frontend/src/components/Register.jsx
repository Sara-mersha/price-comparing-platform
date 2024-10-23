import React, { useState } from 'react';
import { registerUser } from '../api'; // Assuming you have a function that handles API calls
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { FiArrowLeft, FiEye, FiEyeOff } from 'react-icons/fi'; // Importing arrow-left and eye icons from react-icons

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [picture, setPicture] = useState(null);
  const [error, setError] = useState(null); // To handle errors if needed
  const [currentPage, setCurrentPage] = useState(0); // To track the current page
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Toggle confirm password visibility
  const navigate = useNavigate(); // useNavigate hook for redirect

  const fields = [
    [
      { label: 'First Name', value: firstName, onChange: setFirstName },
      { label: 'Middle Name', value: middleName, onChange: setMiddleName },
      { label: 'Last Name', value: lastName, onChange: setLastName },
      { label: 'Email', value: email, onChange: setEmail },
    ],
    [
      { label: 'Password', value: password, onChange: setPassword, type: showPassword ? 'text' : 'password' },
      { label: 'Confirm Password', value: passwordConfirmation, onChange: setPasswordConfirmation, type: showConfirmPassword ? 'text' : 'password' },
      { label: 'Profile Picture', value: picture, onChange: setPicture, type: 'file' },
    ],
  ];

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null); // Reset error before each attempt

    const formData = new FormData();
    formData.append('first_name', firstName);
    formData.append('middle_name', middleName);
    formData.append('last_name', lastName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('password_confirmation', passwordConfirmation);
    if (picture) {
      formData.append('picture', picture);
    }

    try {
      await registerUser(formData); // Make registration request
      alert('Registration successful!'); // Notify the user
      navigate('/dashboard'); // Redirect to the next page
    } catch (error) {
      console.error('Registration error:', error);
      if (error.response && error.response.data.errors) {
        setError(error.response.data.errors);
      } else {
        setError('Registration failed. Please try again.');
      }
    }
  };

  const isLastPage = currentPage === fields.length - 1;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300">
      <div className="relative bg-white shadow-lg rounded-lg p-10 max-w-md w-full">
        {/* Back to Homepage Icon */}
        <div className="absolute top-4 left-4">
          <button onClick={() => navigate('/')} className="text-gray-500 hover:text-purple-600">
            <FiArrowLeft size={24} />
          </button>
        </div>

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Account</h2>

        {/* Error Box */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline"> {Object.values(error).flat().map((msg, index) => <span key={index}>{msg}</span>)}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg
                className="fill-current h-6 w-6 text-red-500"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                onClick={() => setError(null)} // Dismiss error on click
              >
                <title>Close</title>
                <path d="M14.348 5.652a1 1 0 00-1.414 0L10 8.586 7.066 5.652a1 1 0 10-1.414 1.414L8.586 10l-2.934 2.934a1 1 0 101.414 1.414L10 11.414l2.934 2.934a1 1 0 001.414-1.414L11.414 10l2.934-2.934a1 1 0 000-1.414z" />
              </svg>
            </span>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-6">
          {fields[currentPage].map((field, index) => (
            <div key={index} className="relative">
              <label className="block mb-2 text-sm font-medium text-gray-700">{field.label}</label>
              {field.type === 'file' ? (
                <div className="flex items-center justify-center bg-gray-100 border-dashed border-2 border-gray-300 rounded-lg p-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => field.onChange(e.target.files[0])}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Choose File
                  </label>
                </div>
              ) : (
                <>
                  <input
                    type={field.type || 'text'}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    required
                  />
                  {field.label === 'Password' || field.label === 'Confirm Password' ? (
                    <div
                      className="absolute inset-y-0 right-0 flex items-center px-2 cursor-pointer"
                      onClick={() => {
                        field.label === 'Password' ? setShowPassword(!showPassword) : setShowConfirmPassword(!showConfirmPassword);
                      }}
                    >
                      {field.label === 'Password' && (showPassword ? <FiEyeOff /> : <FiEye />)}
                      {field.label === 'Confirm Password' && (showConfirmPassword ? <FiEyeOff /> : <FiEye />)}
                    </div>
                  ) : null}
                </>
              )}
            </div>
          ))}

          <div className="flex justify-between mt-4">
            {currentPage > 0 && (
              <button
                type="button"
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                Previous
              </button>
            )}
            <button
              type={isLastPage ? "submit" : "button"}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => {
                if (!isLastPage) {
                  setCurrentPage((prev) => prev + 1);
                }
              }}
            >
              {isLastPage ? "Register" : "Next"}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
