import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import CustomerNavbar from '../Components/Navbar';

Modal.setAppElement('#root');

const CustomerPage = ({ cid }) => {
  console.log(cid);
  const [orderId, setOrderId] = useState('');
  const [amt, setAmt] = useState(0);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [carts, setCarts] = useState([]);
  const [selectedCart, setSelectedCart] = useState('new'); // default to 'new' for New Cart
  const [quantity, setQuantity] = useState(1); // default quantity to 1

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.post('http://localhost:3001/product/list');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const fetchCarts = async () => {
      try {
        const response = await axios.post(`http://localhost:3001/order/cartidlist/${cid}`);
        
        setCarts(Array.isArray(response.data) ? response.data : []); // Ensure carts is an array
      } catch (error) {
        console.error('Error fetching carts:', error);
      }
    };

    fetchProducts();
    fetchCarts();
  }, [cid]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setSuggestions(products.filter(product => product.name.toLowerCase().includes(query)));
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const handleSearchBlur = () => {
    setTimeout(() => setIsSearchFocused(false), 200); // Delay to allow suggestion click
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.name);
    setIsSearchFocused(false);
    setSuggestions([]);
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setAmt(product.price_per_unit * 100);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setModalIsOpen(false);
  };

  const handleOrderNow = async () => {
    try {
      const response = await axios.post(`http://localhost:3001/order/create-order/${cid.cid}`, {
        amount: selectedProduct.price_per_unit,
        currency: 'INR',
        items: [{
          product_id: selectedProduct.product_id,
          quantity: 2
        }]
      });

      const Id = response.data;
      const endpoint = `http://localhost:3001/order/update-order/${Id}`;
      setOrderId(response.data);
      await new Promise((resolve) => setTimeout(resolve, 0));

      const razorpay = new window.Razorpay({
        key: 'rzp_test_CFpUbryUIn6bk4',
        amount: amt,
        currency: 'INR',
        order_id: orderId,
        name: 'Your Store Name',
        description: 'Order Description',
        handler: async function (response) {
          console.log('Payment successful:', endpoint, response);
          await axios.post(endpoint, {
            status: "paid"
          });
        },
        prefill: {
          name: 'John Doe',
          email: 'dhinagar775@gmail.com',
          contact: '6381242908',
        },
      });
      razorpay.open();
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  const handleCartChange = (e) => {
    setSelectedCart(e.target.value);
  };

  const handleAddToCart = async () => {
    try {
      const cartId = selectedCart === 'new' ? null : selectedCart;
      await axios.post(`http://localhost:3001/order/updatecart/${cid}`, {
        cartId: cartId,
        productId: selectedProduct.product_id,
        quantity: 2
      });
      console.log(`Product ${selectedProduct.name} added to cart ${cartId || 'new'}`);
      closeModal();
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const filteredProducts = searchQuery
    ? products.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : products;

  const renderProduct = (product) => (
    <div
      key={product.id}
      className="product-card p-4 border rounded-lg shadow-md flex flex-col items-center w-48 m-4 cursor-pointer pt-7 bg-[#F8F5F8]"
      onClick={() => openModal(product)}
    >
      {product.image_path && (
        <img
          className="w-32 h-32 object-cover mb-2"
          src={`http://localhost:3001/${product.image_path}`}
          alt={product.name}
        />
      )}
      <div className="product-info w-full">
        <h3 className="font-bold text-lg justify-center flex">{product.name}</h3>
        <p className="text-gray-700">₹{product.price_per_unit}/{product.unit}</p>
        <p className="text-gray-700 truncate">{product.description}</p>
      </div>
    </div>
  );

  return (
    <div className="customer-page pt-[70px] bg-[#ECFFDC] w-screen h-screen">
      <div className="fixed w-full">
        <CustomerNavbar
          searchQuery={searchQuery}
          handleSearch={handleSearch}
          handleSearchFocus={handleSearchFocus}
          handleSearchBlur={handleSearchBlur}
          suggestions={suggestions}
          handleSuggestionClick={handleSuggestionClick}
          isSearchFocused={isSearchFocused}
        />
      </div>
      <div className="pt-[10px] px-[110px] flex left">
        <select value={selectedCart} onChange={handleCartChange} className="border rounded px-4 py-2 bg-white shadow-md">
          <option value="new">New Cart</option>
          {carts.map((cart) => (
            <option key={cart.order_id} value={cart.order_id}>Cart {cart.order_id}</option>
          ))}
        </select>
      </div>
      <div className="product-list flex flex-wrap justify-center">
        {filteredProducts.map(renderProduct)}
      </div>
      {selectedProduct && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Product Details"
          className="fixed inset-0 flex items-center justify-center z-50"
          overlayClassName="fixed inset-0 bg-black bg-opacity-75 z-40"
        >
          <div className="p-6 bg-white rounded-lg max-w-lg w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
              <button onClick={closeModal} className="text-gray-600 hover:text-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {selectedProduct.image_path && (
              <img
                className="w-32 h-32 object-cover mb-4"
                src={`http://localhost:3001/${selectedProduct.image_path}`}
                alt={selectedProduct.name}
              />
            )}
            <p className="text-gray-700 mb-1">Price: ₹{selectedProduct.price_per_unit}</p>
            <p className="text-gray-700 mb-1">Description: {selectedProduct.description}</p>
            <p className="text-gray-700 mb-2">Unit: {selectedProduct.unit}</p>
            <div className="flex justify-between items-center">
              <input 
                type="number" 
                min="1" 
                value={quantity} 
                onChange={(e) => setQuantity(Number(e.target.value))} 
                className="border rounded px-2 py-1 w-20"
              />
              <button onClick={handleAddToCart} className="bg-blue-500 text-white px-4 py-2 rounded-lg flex">Add to Cart</button>
              <button onClick={handleOrderNow} className="bg-blue-500 text-white px-4 py-2 rounded-lg flex">Order Now</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CustomerPage;
