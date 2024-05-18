import React from 'react';

const AdminCard = ({ product }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow">
        <img src={`http://localhost:3001/${product.image_path}`} alt={product.name} className="h-64 w-full object-cover mb-4 rounded-lg" />
        <div className="text-lg font-bold mb-2">{product.name}</div>
        <div className="text-gray-700">{product.description}</div>
      </div>
    </div>
  );
};

export default AdminCard;