import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, ShoppingCartIcon, UserIcon } from '@heroicons/react/24/solid';
import { FaClipboardList } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";

const CustomerNavbar = ({
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
    <nav className="bg-[#5F8575] flex justify-between items-center fixed top-0 left-0 right-0 h-16">
      <div className='p-2'>
        <Link
          to="/"
          className={`font-bold flex items-center relative justify-start ${getLinkClassName('/')}`}
          onMouseEnter={() => setTooltip('Home')}
          onMouseLeave={() => setTooltip('')}
        >
          <HomeIcon className="h-5 w-5 mr-1" />
          Home
          {tooltip === 'Home' && (
            <span className="absolute bottom-full mb-1 w-max bg-black text-white text-xs rounded py-1 px-2">
              Home
            </span>
          )}
        </Link>
      </div>
      <div className="relative w-full max-w-lg mx-auto mt-1 pt-2">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={handleSearch}
          onFocus={handleSearchFocus}
          onBlur={handleSearchBlur}
          className="border border-gray-300 rounded-md px-3 py-1.5 w-full h-10"
        />
        {isSearchFocused && suggestions.length > 0 && (
          <ul className="absolute z-10 top-full left-0 right-0 bg-white border border-gray-300 rounded-md shadow-md mt-0 overflow-y-auto max-h-[12rem]">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                onMouseDown={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex space-x-4 ml-0 items-center p-2">
        <Link
          to="/cart"
          className={`font-bold flex items-center relative ${getLinkClassName('/cart')}`}
          onMouseEnter={() => setTooltip('Cart')}
          onMouseLeave={() => setTooltip('')}
        >
          <ShoppingCartIcon className="h-5 w-5 mr-1" />
          Cart
          {tooltip === 'Cart' && (
            <span className="absolute bottom-full mb-1 w-max bg-black text-white text-xs rounded py-1 px-2">
              Cart
            </span>
          )}
        </Link>

        <Link
          to="/orderpage"
          className={`font-bold flex items-center relative ${getLinkClassName('/orderpage')}`}
          onMouseEnter={() => setTooltip('Orders')}
          onMouseLeave={() => setTooltip('')}
        >
          <FaClipboardList className="h-5 w-5 mr-1" />
          Orders
          {tooltip === 'Orders' && (
            <span className="absolute bottom-full mb-1 w-max bg-black text-white text-xs rounded py-1 px-2">
              Orders
            </span>
          )}
        </Link>

        <Link
          to="/account"
          className={`font-bold flex items-center relative ${getLinkClassName('/account')}`}
          onMouseEnter={() => setTooltip('Account')}
          onMouseLeave={() => setTooltip('')}
        >
          <UserIcon className="h-5 w-5 mr-1" />
          Account
          {tooltip === 'Account' && (
            <span className="absolute bottom-full mb-1 w-max bg-black text-white text-xs rounded py-1 px-2">
              Account
            </span>
          )}
        </Link>

        <Link
          to="/settings"
          className={`font-bold flex items-center relative ${getLinkClassName('/settings')}`}
          onMouseEnter={() => setTooltip('Settings')}
          onMouseLeave={() => setTooltip('')}
        >
          <IoSettings className="h-5 w-5 mr-1" />
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

export default CustomerNavbar;
