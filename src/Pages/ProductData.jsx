import React, { useState } from 'react';

function ProductData({ product, onSubmit }) {
  const [formData, setFormData] = useState({
    name: product.name,
    description: product.description,
    price: product.price,
    unit: product.unit,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div >
      <h2 className=' p-2  justify-center items-center flex' >Edit Product</h2>
      <form  className='text-black flex flex-col w-[300px]  justify-start  ' onSubmit={handleSubmit}>
        <div className='p-3' >
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
        <div  className='p-3'>
          <label className=' justify-evenly items-center flex'  htmlFor="description">Description:</label>
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
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <div className='p-3 pb-6'>
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
        <button className='p-3 flex bg-blue-400 justify-center items-center'type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ProductData;
