import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './RegistrationStyle.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/auth/register-customer', formData);
      if (response.status === 200) {
        setSuccessMessage('Registration successful! Please login to continue.');
        setErrorMessage('');
        setFormData({
          email: '',
          name: '',
          password: '',
        });
      } else {
        setErrorMessage('Registration failed. Please try again later.');
        setSuccessMessage('');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 403) {
          setErrorMessage('cnt register, you already have an accront.');
        } else if (error.response.status === 500) {
          setErrorMessage('servererror');
        } else {
          setErrorMessage('Error: ' + error.response.data.message);
        }
      } else {
        setErrorMessage('Error sending data: ' + error.message);
      }
      setSuccessMessage('');
    }
  };

  const handlePopupClose = () => {
    setErrorMessage('');
    setSuccessMessage('');
  };

  return (
    <div className="container">
      <h2>Customer Registration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/customer-login">Login</Link>
      </p>
      {errorMessage && (
        <div className="popup">
        <div className="popup-content">
          <p>{errorMessage}</p>
          <button onClick={handlePopupClose}>Close</button>
          </div>
        </div>

      )}
      {successMessage && (
        <div className="popup">
          <div className="popup-content">
            <p>{successMessage}</p>
            <button onClick={handlePopupClose}><Link to="/customer-login">Login</Link></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;

