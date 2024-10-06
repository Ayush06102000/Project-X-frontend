import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Signin from './Signin';
import SellProduct from './SellProduct';

const Preview = () => {
  const [products, setProducts] = useState([]);
  const [showSignin, setShowSignin] = useState(false);
  const [showSellModal, setShowSellModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for token in localStorage when component mounts
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true); // Automatically authenticate if token exists
    }

    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://project-x-9sn1.onrender.com/api/v1/product/preview');
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching the products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleSignInSuccess = (token) => {
    localStorage.setItem('token', token);  // Save token to localStorage
    setIsAuthenticated(true);  // User is authenticated
    setShowSignin(false);      // Close the sign-in modal
  };

  return (
    <div>
      {/* Navbar */}
      <div className="flex justify-between items-center py-6 bg-gradient-to-r from-gray-500 via-gray-300 to-gray-500 shadow-lg px-6">
        <div className="text-3xl font-extrabold text-white uppercase tracking-widest">
          Project-X
        </div>
        <div>
          {!isAuthenticated ? (
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md font-bold transition-all duration-300 transform hover:scale-105"
              onClick={() => setShowSignin(true)}
            >
              Sign In
            </button>
          ) : (
            <>
              <span className="text-white">Welcome!</span>
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 ml-4 rounded-md font-bold transition-all duration-300 transform hover:scale-105"
                onClick={() => setShowSellModal(true)} // Open the Sell modal
              >
                Sell
              </button>
            </>
          )}
        </div>
      </div>

      {/* Products Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="bg-white shadow-lg rounded-lg p-4">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="h-40 w-full object-contain rounded-md mb-4"
              />
              <h2 className="text-xl font-bold mb-2">{product.title}</h2>
              <p className="text-gray-700 mb-2">{product.description}</p>
              <p className="text-green-600 font-bold">₹{product.price}</p>
            </div>
          ))
        ) : (
          <p>Loading products...</p>
        )}
      </div>

      {/* Signin Modal */}
      {showSignin && (
        <Signin
          onClose={() => setShowSignin(false)}
          onSignInSuccess={handleSignInSuccess}
        />
      )}

      {/* Sell Modal */}
      {showSellModal && (
        <SellProduct onClose={() => setShowSellModal(false)} />
      )}
    </div>
  );
};

export default Preview;
