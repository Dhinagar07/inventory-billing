import React from "react";
import { Link } from "react-router-dom";

function Navbar(){
  return (
 <div className='w-screen max-w-7xl  mx-auto fixed top-0 left-0 z-10' >
    <nav className="  w-screen bg-gray-800  p-4 flex justify-between items-center">
      <div className="text-white text-lg font-bold w-screen">
        <Link to="/">OIMS</Link>
      </div>
      <ul className="flex space-x-4">
        <li>
          <Link to="/orderpage" className="text-white hover:underline">Orders</Link>
        </li>
        <li>
          <Link to="/cartpage" className="text-white hover:underline">Cart</Link>
        </li>
        <li>
          <Link to="/settings" className="text-white hover:underline">Settings</Link>
        </li>
      </ul>
    </nav>
  </div>
  );
};

export default Navbar;