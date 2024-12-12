import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalStateContext } from '../utils/GlobalState';
import { handleChange, handleSubmit } from '../user/userRegister';
import './Register.css';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const { handleLogin } = useContext(GlobalStateContext);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  return (
    <div className="register-container">
      <h2 className="register-title">Register</h2>
      {message && <p className="error-message">{message}</p>}
      <form
        className="register-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(formData, handleLogin, navigate, setMessage);
        }}
      >
        <input
          className="register-input"
          type="text"
          name="username"
          value={formData.username}
          onChange={(e) => handleChange(e, formData, setFormData)}
          placeholder="Username"
          required
        />
        <input
          className="register-input"
          type="email"
          name="email"
          value={formData.email}
          onChange={(e) => handleChange(e, formData, setFormData)}
          placeholder="Email"
          required
        />
        <input
          className="register-input"
          type="password"
          name="password"
          value={formData.password}
          onChange={(e) => handleChange(e, formData, setFormData)}
          placeholder="Password"
          required
        />
        <button className="register-button" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}