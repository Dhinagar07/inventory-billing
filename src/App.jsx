// App.js
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import Registration from './Pages/Registration';
import Login from './Pages/Login';
import Pay from './Pages/Pay';

//import SearchBar from './Components/SearchBar';
import Navbar from './Components/Navbar'


const App = () => {
  

  return (
    
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Registration />} />
            <Route path='/admin' element={<Login role='admin' />} />
            <Route path='/customer-login' element={<Login role='customer' />} />
            <Route path='/pay' element={<Pay />} />
          </Routes>
    </BrowserRouter>
  );
}

export default App;
