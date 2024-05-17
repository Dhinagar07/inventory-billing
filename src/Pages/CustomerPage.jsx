import React from 'react';

const products = [
  {
    id: 1,
    image: 'https://via.placeholder.com/150', // Placeholder image
    title: 'Wireless Headphones',
    price: 49.99,
    rating: 4.5,
  },
  {
    id: 1,
    image: 'https://via.placeholder.com/150', // Placeholder image
    title: 'Wireless Headphones',
    price: 49.99,
    rating: 4.5,
  },
  {
    id: 1,
    image: 'https://via.placeholder.com/150', // Placeholder image
    title: 'Wireless Headphones',
    price: 49.99,
    rating: 4.5,
  }
  // ... add more products
];



const InventoryPage = () => {
  const renderProduct = (product) => (
    <div key={product.id} className="product-card p-10 ">
      <img className='flex flex-row'  src={product.image} alt={product.title} />
      <div className="product-info">
        <h3>{product.title}</h3>
        <p>Price: ${product.price}</p>
        <p>Rating: {product.rating} stars</p>
      </div>
      <button>Add to Cart</button>
    </div>
  );

  return (
    <div className="inventory-page  ">
      <h1>Inventory</h1>
      <div className="product-list flex flex-row p-4 ">
        {products.map(renderProduct)}
      </div>
    </div>
  );
};

export default InventoryPage;
