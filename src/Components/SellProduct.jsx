import React, { useState } from 'react';
import axios from 'axios';

const SellProduct = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Prepare the product data
      const productData = {
        title,
        description,
        price: Number(price),  // Ensure price is a number
        imageUrl,
      };

      // Send a POST request to the API
      const tokens = localStorage.getItem('token')
      const response = await axios.post('https://project-x-9sn1.onrender.com/api/v1/product/products', productData, {
        headers: {
          token: tokens,  // Set the Authorization header with the Bearer token
        }
        });

      if (response.status === 200) {
        console.log('Product added successfully');
        onClose();  // Close the modal after success
      } else {
        setError('Failed to add product.');
      }
    } catch (err) {
      setError('An error occurred while adding the product.');
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

        <h2 className="text-2xl font-bold mb-6 text-center">Sell a Product</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Title"
              className="w-full p-2 border border-gray-300 rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <textarea
              placeholder="Description"
              className="w-full p-2 border border-gray-300 rounded"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              placeholder="Price"
              className="w-full p-2 border border-gray-300 rounded"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Image URL"
              className="w-full p-2 border border-gray-300 rounded"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white w-full p-2 rounded hover:bg-green-600 transition-all"
          >
            Sell Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default SellProduct;
