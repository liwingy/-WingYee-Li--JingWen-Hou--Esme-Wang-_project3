import { useNavigate } from 'react-router-dom';

const API_URL = 'https://wjeproject3.onrender.com/api/users/register';

// handle user input data
export const handleChange = (e, formData, setFormData) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
};

// handle new user registration
export const handleSubmit = async (formData, handleLogin, navigate, setMessage) => {
  try {
    // Send backend register request
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
      credentials: 'include',
    });

    const result = await response.json();
    if (response.ok) {
      handleLogin(result.user); // Update parent state with user data
      navigate('/home'); // Redirect to user's homepage
    } else {
      setMessage(result.error || 'Registration failed.');
    }
  } catch (error) {
    console.error('Error during registration:', error);
    setMessage('An unexpected error occurred. Please try again later.');
  }
};

// redirect url for app.jsx
export const useRedirectRegister = () => {
  const navigate = useNavigate();
  return () => navigate('/register');
};
