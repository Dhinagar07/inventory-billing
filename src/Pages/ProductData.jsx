import React, { useState } from 'react';

function ProductData({ product, onSubmit }) {
  const [formData, setFormData] = useState({
    name: product.name,
    description: product.description,
    price_per_unit: product.price_per_unit,
    unit: product.unit,
    image: null,
    stock_quantity: product.stock_quantity,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div>
      <h2 className='p-2 justify-center items-center flex'>Edit Product</h2>
      <form className='text-black flex flex-col w-[300px] justify-start' onSubmit={handleSubmit}>
        <div className='p-3'>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            className='bg-white p-1'
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className='p-3'>
          <label className='justify-evenly items-center flex' htmlFor="description">Description:</label>
          <textarea
            rows={2}
            type="text"
            className='bg-white p-1 w-full'
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div className='p-3'>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            className='bg-white p-1'
            id="price"
            name="price"
            value={formData.price_per_unit}
            onChange={handleChange}
          />
        </div>
        <div className='p-3'>
          <label htmlFor="unit">Unit:</label>
          <input
            type="text"
            className='bg-white p-1'
            id="unit"
            name="unit"
            value={formData.unit}
            onChange={handleChange}
          />
        </div>
        <div className='p-3'>
          <label htmlFor="stock_quantity">Stock Quantity:</label>
          <input
            type="number"
            className='bg-white p-1'
            id="stock_quantity"
            name="stock_quantity"
            value={formData.stock_quantity}
            onChange={handleChange}
          />
        </div>
        <div className='p-3'>
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            className='bg-white p-1'
            id="image"
            name="image"
            onChange={handleChange}
          />
        </div>
        <button className='p-3 flex bg-blue-400 justify-center items-center' type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ProductData;
