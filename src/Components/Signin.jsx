import React, { useState } from 'react';
import axios from 'axios';
import Signup from './Signup'; // Import the Signup component

const Signin = ({ onClose, onSignInSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showSignup, setShowSignup] = useState(false); // State to manage signup modal visibility

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    try {
      // Make an API request to the login endpoint
      const response = await axios.post('https://project-x-9sn1.onrender.com/api/v1/user/signin', {
        email,
        password,
      });

      if (response.status === 200) {
        console.log('Login successful');
        onSignInSuccess(response.data.token); // Pass the token to the parent component
        onClose(); // Close the modal
      } else {
        setError('Invalid login credentials.');
      }
    } catch (err) {
      setError('An error occurred during sign in.');
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

        {/* Sign In form */}
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
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
          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border border-gray-300 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white w-full p-2 rounded hover:bg-blue-600 transition-all"
          >
            Sign In
          </button>
        </form>

        {/* Sign Up button */}
        <div className="mt-4 text-center">
          <button
            className="text-blue-500 hover:underline"
            onClick={() => setShowSignup(true)} // Open the signup modal
          >
            Create an account
          </button>
        </div>

        {/* Signup Modal */}
        {showSignup && (
          <Signup
            onClose={() => setShowSignup(false)} // Close the signup modal
            onSignInSuccess={onSignInSuccess}
          />
        )}
      </div>
    </div>
  );
};

export default Signin;
