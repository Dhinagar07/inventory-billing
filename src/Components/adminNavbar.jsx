import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CubeIcon, ClipboardDocumentListIcon, Cog6ToothIcon } from '@heroicons/react/24/solid';

const AdminNavbar = ({
  searchQuery,
  handleSearch,
  handleSearchFocus,
  handleSearchBlur,
  suggestions,
  handleSuggestionClick,
  isSearchFocused
}) => {
  const [tooltip, setTooltip] = useState('');
  const location = useLocation();
  
  const getLinkClassName = (path) => {
    return location.pathname === path ? 'text-yellow-400' : 'text-white';
  };

  return (
    <nav className="bg-blue-500 flex justify-between items-center fixed top-0 left-0 right-0 z-10 h-16"> {/* Adjusted navbar height */}
      <div className="relative w-full max-w-lg mx-auto mt-1"> {/* Added top margin */}
        <input
          type="text"
          placeholder="Search by product name..."
          value={searchQuery}
          onChange={handleSearch}
          onFocus={handleSearchFocus}
          onBlur={handleSearchBlur}
          className="border border-gray-300 rounded-md px-3 py-1.5 w-full h-10" // Reduced search box height
        />
        {isSearchFocused && suggestions.length > 0 && (
          <ul className="absolute z-10 top-full left-0 right-0 bg-white border border-gray-300 rounded-md shadow-md mt-0 overflow-y-auto max-h-[12rem]">
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
      <div className="flex space-x-4 ml-0 items-center"> {/* Centered items vertically */}
        <Link
          to="/admin"
          className={`font-bold flex items-center relative ${getLinkClassName('/products')}`}
          onMouseEnter={() => setTooltip('Products')}
          onMouseLeave={() => setTooltip('')}
        >
          <CubeIcon className="h-5 w-5 mr-1" />
          Products
          {tooltip === 'Products' && (
            <span className="absolute bottom-full mb-1 w-max bg-black text-white text-xs rounded py-1 px-2">
              Products
            </span>
          )}
        </Link>
        <Link
          to="/orders"
          className={`font-bold flex items-center relative ${getLinkClassName('/orders')}`}
          onMouseEnter={() => setTooltip('Orders')}
          onMouseLeave={() => setTooltip('')}
        >
          <ClipboardDocumentListIcon className="h-5 w-5 mr-1" />
          Orders
          {tooltip === 'Orders' && (
            <span className="absolute bottom-full mb-1 w-max bg-black text-white text-xs rounded py-1 px-2">
              Orders
            </span>
          )}
        </Link>
        <Link
          to="/settings"
          className={`font-bold flex items-center relative ${getLinkClassName('/settings')}`}
          onMouseEnter={() => setTooltip('Settings')}
          onMouseLeave={() => setTooltip('')}
        >
          <Cog6ToothIcon className="h-5 w-5 mr-1" />
          Settings
          {tooltip === 'Settings' && (
            <span className="absolute bottom-full mb-1 w-max bg-black text-white text-xs rounded py-1 px-2">
              Settings
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default AdminNavbar;
