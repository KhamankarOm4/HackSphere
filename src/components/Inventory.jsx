import React, { useState } from 'react';

const formatPrice = (price) => {
  return `${window.getComputedStyle(document.documentElement).getPropertyValue('--currency-symbol')}${price}`;
};

function Inventory() {
  const [medicines] = useState([
    {
      id: 1,
      name: 'Paracetamol',
      quantity: 500,
      expiryDate: '2024-12-31',
      manufacturer: 'PharmaCo',
      category: 'Pain Relief',
    },
    // Add more sample data as needed
  ]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Medicine Inventory</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Expiry Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Manufacturer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {medicines.map((medicine) => (
              <tr key={medicine.id}>
                <td className="px-6 py-4 whitespace-nowrap">{medicine.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{medicine.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap">{medicine.expiryDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">{medicine.manufacturer}</td>
                <td className="px-6 py-4 whitespace-nowrap">{medicine.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:text-blue-900 mr-2">Edit</button>
                  <button className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Inventory; 