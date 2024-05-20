import axios from 'axios';
import React, { useState } from 'react';

import ProductWork from './ProductWork';
import CustomerPage from './CustomerPage';
import './Login.css';

const Login = ({ role }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    const [products, setProducts] = useState([]);

  const addProduct = product => {
    setProducts([...products, product]);
  };


    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let endpoint = '';
            if (role === 'customer') {
                endpoint = 'http://localhost:3001/auth/customer-login';
            } else if (role === 'admin') {
                endpoint = 'http://localhost:3001/auth/admin-login';
            }
            const response = await axios.post(endpoint, { username, password });
            setLoggedIn(true);
        } catch (error) {
            if (error.response) {
                if (error.response.status === 500) {
                    setError('Internal server error. Please try again later.');
                } else {
                    setError('Invalid credentials');
                }
            } else if (error.request) {
                setError('No response received from the server. Please check your connection.');
            } else {
                setError('Error sending data: ' + error.message);
            }
        }
    };

    if (loggedIn) {
        if (role === 'customer') {
          return <CustomerPage cid={username} />;
        } else if (role === 'admin') {
            return <ProductWork products={products} />;
        }
    }

    const handleForgotPassword = () => {
        console.log('Forgot Password clicked');
    };

    return (
        <div className="login-container">
            <h2>{role === 'customer' ? 'Customer Login' : 'Admin Login'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={handleUsernameChange}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                />
                <button type="submit">Login</button>
            </form>
            {error && <p>{error}</p>}
            <div className="forgot-password" onClick={handleForgotPassword}>
                Forgot Password?
            </div>
        </div>
    );
};

export default Login;
