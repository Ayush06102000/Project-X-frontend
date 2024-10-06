import React, { useState } from 'react';
import axios from 'axios';

const Signup = ({ onClose, onSignInSuccess }) => {
  const [email, setEmail] = useState('');
  const [firstName, setfirstName] = useState('');
  const [lastName,setlastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      // Make an API request to the signup endpoint
      const response = await axios.post('https://project-x-9sn1.onrender.com/api/v1/user/signup', {
        email,
        password,
        firstName,
        lastName
      });

      if (response.status === 200) {
        console.log('Signup successful');
        onSignInSuccess(response.data.token); // Automatically sign in after signup
        onClose(); // Close the modal
      } else {
        setError('Signup failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during sign up.');
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
        {/* Close button */}
        <button
          className="absolute top-2 right-2 text-gray-700 text-xl"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Sign Up form */}
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border border-gray-300 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border border-gray-300 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="First Name"
              className="w-full p-2 border border-gray-300 rounded"
              value={firstName}
              onChange={(e) => setfirstName(e.target.value)}
              required
            />
            <input
              type="lastName"
              placeholder="Last Name"
              className="w-full p-2 border border-gray-300 rounded"
              value={lastName}
              onChange={(e) => setlastName(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full p-2 border border-gray-300 rounded"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white w-full p-2 rounded hover:bg-blue-600 transition-all"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
