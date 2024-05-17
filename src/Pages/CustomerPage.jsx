import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

// Sample product data
const products = [
  {
    id: 1,
    image: 'https://via.placeholder.com/150',
    title: 'Wireless Headphones',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit Eos animi distinctio consectetur cum recusandae laboriosam ducimus assumenda enim. Maiores, quisquam Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates, eligendi laboriosam magnam aliquam itaque nesciunt accusantium provident voluptas odit laborum nulla debitis iste, sed pariatur id adipisci sapiente rerum, nam ab quis iure delectus placeat. Dignissimos vitae necessitatibus quidem blanditiis doloribus, sapiente consequuntur maiores sequi at exercitationem culpa saepe molestias',
    price: 49.99,
    unit: 'kg',
  },
  // Add more products as needed
];

// Set the root element for the modal
Modal.setAppElement('#root');

const InventoryPage = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setModalIsOpen(false);
  };

  const renderProduct = (product) => (
    <div
      key={product.id}
      className="product-card p-4 border rounded-lg shadow-md flex flex-col items-center w-64 m-4 cursor-pointer"
      onClick={() => openModal(product)}
    >
      <img className="w-32 h-32 object-cover mb-4" src={product.image} alt={product.title} />
      <div className="product-info w-full">
        <h3 className="font-bold text-lg mb-2 justify-center flex">{product.title}</h3>
        <p className="text-gray-700 mb-2">Price: ${product.price}</p>
        <p className="text-gray-700 mb-2 truncate">Description: {product.description}</p>
        <p className="text-gray-700 mb-4">Unit: {product.unit}</p>
      </div>
      <div className='flex justify-between flex-row'>
        
      </div>
    </div>
  );

  return (
    <div className="inventory-page p-6">
      <h1 className="text-2xl font-bold mb-6">Inventory</h1>
      <div className="product-list flex flex-wrap justify-center">
        {products.map(renderProduct)}
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
              <h2 className="text-2xl font-bold">{selectedProduct.title}</h2>
              <button onClick={closeModal} className="text-gray-600 hover:text-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <img className="w-32 h-32 object-cover mb-4" src={selectedProduct.image} alt={selectedProduct.title} />
            <p className="text-gray-700 mb-2">Price: ${selectedProduct.price}</p>
            <p className="text-gray-700 mb-2">Description: {selectedProduct.description}</p>
            <p className="text-gray-700 mb-4">Unit: {selectedProduct.unit}</p>
            <div className='flex justify-between'>
              <Link to="/cartpage" className="flex">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex">Add to Cart</button>
              </Link>
              <Link to="/pay" className="flex">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex">Order Now</button>
              </Link>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default InventoryPage;

