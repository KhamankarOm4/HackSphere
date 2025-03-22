import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold">
            Medicine Inventory
          </Link>
          <div className="flex space-x-4">
            <Link to="/" className="hover:bg-blue-700 px-3 py-2 rounded">
              Dashboard
            </Link>
            <Link to="/inventory" className="hover:bg-blue-700 px-3 py-2 rounded">
              Inventory
            </Link>
            <Link to="/add-medicine" className="hover:bg-blue-700 px-3 py-2 rounded">
              Add Medicine
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 