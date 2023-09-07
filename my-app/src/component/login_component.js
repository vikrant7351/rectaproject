import React, { useState } from 'react';
import {Link } from "react-router-dom";
import Axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import '../App.css';
// import ForgotPassword from './forgetpassword';

function Login() {  // { onLogin }
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [loginError, setLoginError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios.post('http://localhost:4000/api/login', loginData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        // console.log('User login successfully');
        toast.success('user login sucessfully');
        // onLogin(response.data); // Pass the user data to the parent component
        
      } else {
        setLoginError('Invalid email or password');
      }
    } catch (error) {
      console.error(error);
      setLoginError('Server error');
    }
  };

  return (
   
    <div>
         <ToastContainer/>
      <h2>Login Form</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          <b>Email</b>
        </label>
        <input
          type="text"
          name="email"
          value={loginData.email}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="psw">
          <b>Password</b>
        </label>
        <input
          type="password"
          name="password"
          value={loginData.password}
          onChange={handleInputChange}
          required
        />

        <p className="error">{loginError}</p>

        <button type="submit">Login</button>
        <button><Link to = '/forgotpassword'>forgetpassword</Link></button>

        
       
        
      </form>
    </div>
  );
}

export default Login;
