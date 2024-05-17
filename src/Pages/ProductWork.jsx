import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductData from './ProductData';
import DeleteDia from './DeleteDia';
import AddDia from './AddDia';

function ProductWork() {
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [deletingProductId, setDeletingProductId] = useState(null);
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.post('http://localhost:3001/product/list');
        const flattenedProducts = response.data.flat();
        setProducts(flattenedProducts);
        setFilteredProducts(flattenedProducts);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    if (!showAddProductForm || deletingProductId === null || editingProductId === null) {
      fetchProducts();
    }
  }, [showAddProductForm, deletingProductId, editingProductId]);

  useEffect(() => {
    // Filter products based on search query
    const filtered = products.filter(product => product &&
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);

    // Generate suggestions based on the search query
    const suggestions = products
      .filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .map(product => product.name);
    setSuggestions(suggestions);
  }, [searchQuery, products]);

  const handleEdit = (productId) => {
    console.log(productId);
    setEditingProductId(productId);
  };

  const handleEditSubmit = async (editedProductData) => {
    try {
      await updateProductInBackend(editingProductId, editedProductData);
      setEditingProductId(null); 
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const updateProductInBackend = async (productId, updatedData) => {
    try {
      console.log(updatedData);
      const response = await axios.put(`http://localhost:3001/product/${productId}`, updatedData);
      console.log('Product updated successfully in the backend');
    } catch (error) {
      console.error('Error updating product in the backend:', error);
    }
  };

  const handleDelete = (productId) => {
    setDeletingProductId(productId);
  };

  const handleDeleteConfirm = async () => {
    try {
      const updatedProducts = products.filter(product => product.product_id !== deletingProductId);
      setProducts(updatedProducts);
      await deleteProductFromBackend(deletingProductId);
      setDeletingProductId(null); 
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const deleteProductFromBackend = async (productId) => {
    try {
      await axios.delete(`http://localhost:3001/product/${productId}`);
    } catch (error) {
      console.error('Error deleting product from the backend:', error);
    }
  };

  const handleDeleteCancel = () => {
    setDeletingProductId(null);
  };

  const handleAddProduct = () => {
    setShowAddProductForm(true);
  };

  const handleSubmitAddProduct = async () => {
    setShowAddProductForm(false);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setIsSearchFocused(false);
  };

  return (
    <div className="bg-white text-black h-screen w-screen flex p-5">
      <div className="container py-2">
        <h1 className="text-3xl font-semibold mb-4 items-center justify-center flex">Product List</h1>
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search by product name..."
            value={searchQuery}
            onChange={handleSearch}
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
          {isSearchFocused && suggestions.length > 0 && (
            <ul className="absolute z-10 top-full left-0 right-0 bg-white border border-gray-300 rounded-md shadow-md mt-0 overflow-y-auto max-h-[20rem]">
            {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                  onMouseDown={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
          onClick={handleAddProduct}
        >
          Add Product
        </button>
        <table className="table-auto w-full border-collapse border border-gray-400">
          <thead>
            <tr className="bg-gradient-to-r from-cyan-500 to-blue-500">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-8 py-2">Description</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Unit</th>
              <th className="px-4 py-2">Qnty</th>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.product_id} className="text-center">
                <td className="border px-4 py-2">{product.product_id}</td>
                <td className="border px-4 py-2">{product.name}</td>
                <td className="border px-4 py-2">{product.description}</td>
                <td className="border px-4 py-2">{product.price_per_unit}</td>
                <td className="border px-4 py-2">{product.unit}</td>
                <td className="border px-4 py-2">{product.stock_quantity}</td>
                <td className="border px-4 py-2">
                  <img src={`http://localhost:3001/${product.image_path}`} alt={product.name} className="h-10 w-10" />
                </td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={() => handleEdit(product.product_id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleDelete(product.product_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showAddProductForm && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded shadow">
            <AddDia onSubmit={handleSubmitAddProduct} />
          </div>
        </div>
      )}
      {deletingProductId && (
        <DeleteDia
          productName={products.find(product => product.product_id === deletingProductId)?.name}
          onCancel={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
        />
      )}
      {editingProductId && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded shadow">
            <ProductData
              product={products.find(product => product.product_id === editingProductId)}
              onSubmit={handleEditSubmit}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductWork;
